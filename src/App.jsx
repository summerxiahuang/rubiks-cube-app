import { useState, useCallback, useMemo } from 'react'
import './App.css'

// Constants
const FACE_ORDER = ['U', 'R', 'F', 'D', 'L', 'B'];
const FACE_COLORS = {
  U: '#FFFFFF', // White
  R: '#FF0000', // Red
  F: '#00FF00', // Green
  D: '#FFFF00', // Yellow
  L: '#0000FF', // Blue
  B: '#FF8000'  // Orange
};

const FACE_LABELS = {
  U: 'Up (White)',
  R: 'Right (Red)',
  F: 'Front (Green)',
  D: 'Down (Yellow)',
  L: 'Left (Blue)',
  B: 'Back (Orange)'
};

const POSITION_LABELS = {
  2: ['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right'],
  3: ['TL', 'TC', 'TR', 'ML', 'C', 'MR', 'BL', 'BC', 'BR']
};

const FACE_3D_CONFIG = {
  U: { rotateX: -90, rotateY: 0, translateZ: 60 },
  D: { rotateX: 90, rotateY: 0, translateZ: 60 },
  F: { rotateX: 0, rotateY: 0, translateZ: 60 },
  B: { rotateX: 0, rotateY: 180, translateZ: 60 },
  L: { rotateX: 0, rotateY: -90, translateZ: 60 },
  R: { rotateX: 0, rotateY: 90, translateZ: 60 }
};

// Utility functions
const createSolvedCube = (size = 2) => {
  const cube = {};
  FACE_ORDER.forEach(face => {
    cube[face] = Array(size * size).fill(face);
  });
  return cube;
};

const validateCubeState = (cubeState, size = 2) => {
  const expectedStickers = size * size;
  const stickerCounts = {};
  
  FACE_ORDER.forEach(face => {
    stickerCounts[face] = 0;
  });
  
  FACE_ORDER.forEach(face => {
    cubeState[face].forEach(sticker => {
      if (!FACE_ORDER.includes(sticker)) {
        return { valid: false, error: `Invalid sticker color: ${sticker}` };
      }
      stickerCounts[sticker]++;
    });
  });
  
  for (const [color, count] of Object.entries(stickerCounts)) {
    if (count !== expectedStickers) {
      return { 
        valid: false, 
        error: `Color ${color} appears ${count} times, but must appear exactly ${expectedStickers} times` 
      };
    }
  }
  
  return { valid: true };
};

const solveCube = (cubeState, size = 2) => {
  const isSolved = FACE_ORDER.every(face => 
    cubeState[face].every(sticker => sticker === face)
  );
  
  if (isSolved) {
    return { solved: true, solution: 'Cube is already solved!' };
  }
  
  const validation = validateCubeState(cubeState, size);
  if (!validation.valid) {
    return { solved: false, error: validation.error };
  }
  
  const sizeText = size === 2 ? '2x2' : '3x3';
  return {
    solved: false,
    solution: `Basic ${sizeText} solving steps:\n1. Solve the white face\n2. Solve the middle layer (3x3 only)\n3. Orient the remaining pieces\n4. Permute the pieces\n\nNote: This is a simplified solver. For optimal solutions, use dedicated ${sizeText} solving methods.`,
    moves: ['R', 'U', 'R\'', 'U\'']
  };
};

// 3D Cube Component
const Cube3D = ({ cubeState, onStickerClick, selectedSticker, size = 2 }) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  const handleMouseDown = useCallback((e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startRotationX = rotationX;
    const startRotationY = rotationY;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      setRotationX(startRotationX + deltaY * 0.5);
      setRotationY(startRotationY + deltaX * 0.5);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [rotationX, rotationY]);

  const resetRotation = useCallback(() => {
    setRotationX(0);
    setRotationY(0);
  }, []);

  const gridClass = useMemo(() => 
    size === 2 ? 'face-grid-2x2-3d' : 'face-grid-3x3-3d', 
    [size]
  );

  const positionLabels = useMemo(() => 
    POSITION_LABELS[size], 
    [size]
  );

  return (
    <div className="cube-3d-container">
      <div className="cube-3d-controls">
        <button onClick={resetRotation} className="btn btn-secondary">
          Reset View
        </button>
        <p>Drag to rotate the cube</p>
      </div>
      
      <div 
        className="cube-3d-scene"
        onMouseDown={handleMouseDown}
      >
        <div 
          className="cube-3d"
          style={{
            transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
          }}
        >
          {FACE_ORDER.map(face => {
            const config = FACE_3D_CONFIG[face];
            return (
              <div
                key={face}
                className="cube-3d-face"
                style={{
                  transform: `rotateX(${config.rotateX}deg) rotateY(${config.rotateY}deg) translateZ(${config.translateZ}px)`
                }}
              >
                <div className={gridClass}>
                  {cubeState[face].map((sticker, index) => (
                    <button
                      key={index}
                      onClick={() => onStickerClick(face, index)}
                      className={`sticker-3d ${selectedSticker?.face === face && selectedSticker?.index === index ? 'selected' : ''}`}
                      style={{
                        backgroundColor: FACE_COLORS[sticker],
                        border: '1px solid #333',
                        color: sticker === 'U' || sticker === 'D' ? '#333' : '#fff',
                        fontWeight: 'bold'
                      }}
                      aria-label={`${face} face, ${positionLabels[index]}, color ${sticker}`}
                    >
                      {sticker}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Color Picker Component
const ColorPicker = ({ onColorSelect, onClose }) => (
  <div className="color-picker-overlay" onClick={onClose}>
    <div className="color-picker" onClick={(e) => e.stopPropagation()}>
      <h3>Choose Color</h3>
      <div className="color-options">
        {FACE_ORDER.map(color => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className="color-option"
            style={{
              backgroundColor: FACE_COLORS[color],
              border: '2px solid #333',
              color: color === 'U' || color === 'D' ? '#333' : '#fff',
              fontWeight: 'bold'
            }}
          >
            {color}
          </button>
        ))}
      </div>
      <button className="btn btn-secondary" onClick={onClose}>
        Cancel
      </button>
    </div>
  </div>
);

// Cube Face Component
const CubeFace = ({ face, cubeState, onStickerClick, selectedSticker, showLabels, size }) => {
  const gridClass = useMemo(() => 
    size === 2 ? 'face-grid-2x2' : 'face-grid-3x3', 
    [size]
  );
  
  const positionLabels = useMemo(() => 
    POSITION_LABELS[size], 
    [size]
  );

  return (
    <div className="cube-face">
      <h3 style={{ textAlign: 'center', margin: '0 0 10px 0', color: '#333' }}>
        {FACE_LABELS[face]}
      </h3>
      <div className={gridClass}>
        {cubeState[face].map((sticker, index) => (
          <div key={index} className="sticker-container">
            <button
              onClick={() => onStickerClick(face, index)}
              className={`sticker ${selectedSticker?.face === face && selectedSticker?.index === index ? 'selected' : ''}`}
              style={{
                backgroundColor: FACE_COLORS[sticker],
                border: '1px solid #333',
                color: sticker === 'U' || sticker === 'D' ? '#333' : '#fff',
                fontWeight: 'bold'
              }}
              aria-label={`${face} face, ${positionLabels[index]}, color ${sticker}`}
            >
              {sticker}
            </button>
            {showLabels && (
              <div className="position-label">
                {positionLabels[index]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [cubeSize, setCubeSize] = useState(2);
  const [cubeState, setCubeState] = useState(() => createSolvedCube(2));
  const [solution, setSolution] = useState('');
  const [isSolving, setIsSolving] = useState(false);
  const [error, setError] = useState('');
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [showLabels, setShowLabels] = useState(true);

  // Memoized values
  const orientationInfo = useMemo(() => [
    { face: 'U', label: 'Top face' },
    { face: 'D', label: 'Bottom face' },
    { face: 'F', label: 'Front face (facing you)' },
    { face: 'B', label: 'Back face (opposite to front)' },
    { face: 'R', label: 'Right face' },
    { face: 'L', label: 'Left face' }
  ], []);

  // Event handlers
  const resetCube = useCallback(() => {
    setCubeState(createSolvedCube(cubeSize));
    setSolution('');
    setError('');
    setSelectedSticker(null);
  }, [cubeSize]);

  const handleCubeSizeChange = useCallback((newSize) => {
    setCubeSize(newSize);
    setCubeState(createSolvedCube(newSize));
    setSolution('');
    setError('');
    setSelectedSticker(null);
  }, []);

  const handleStickerClick = useCallback((face, index) => {
    setSelectedSticker({ face, index });
  }, []);

  const updateSticker = useCallback((newColor) => {
    if (!selectedSticker) return;
    
    const { face, index } = selectedSticker;
    setCubeState(prev => ({
      ...prev,
      [face]: prev[face].map((sticker, i) => 
        i === index ? newColor : sticker
      )
    }));
    setSolution('');
    setError('');
    setSelectedSticker(null);
  }, [selectedSticker]);

  const closeColorPicker = useCallback(() => {
    setSelectedSticker(null);
  }, []);

  const solveCubeHandler = useCallback(async () => {
    setIsSolving(true);
    setError('');
    setSolution('');
    
    try {
      const result = solveCube(cubeState, cubeSize);
      
      if (result.solved) {
        setSolution(result.solution);
      } else if (result.error) {
        setError(result.error);
      } else {
        setSolution(result.solution);
      }
    } catch (error) {
      setError(`Unable to solve cube: ${error.message}`);
    } finally {
      setIsSolving(false);
    }
  }, [cubeState, cubeSize]);

  const toggleLabels = useCallback(() => {
    setShowLabels(prev => !prev);
  }, []);

  // Memoized components
  const cubeFaces = useMemo(() => 
    FACE_ORDER.map(face => (
      <CubeFace
        key={face}
        face={face}
        cubeState={cubeState}
        onStickerClick={handleStickerClick}
        selectedSticker={selectedSticker}
        showLabels={showLabels}
        size={cubeSize}
      />
    )), 
    [cubeState, handleStickerClick, selectedSticker, showLabels, cubeSize]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Rubik's Cube Solver</h1>
        <p>Click on any sticker to choose a color, then solve the cube!</p>
        <div className="orientation-info">
          <p><strong>Cube Orientation:</strong></p>
          <ul>
            {orientationInfo.map(({ face, label }) => (
              <li key={face}>
                <strong>{face} ({FACE_COLORS[face] === '#FFFFFF' || FACE_COLORS[face] === '#FFFF00' ? 'White/Yellow' : 'Colored'}):</strong> {label}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <main className="app-main">
        <div className="controls-top">
          <div className="cube-size-toggle">
            <button 
              onClick={() => handleCubeSizeChange(2)}
              className={`btn ${cubeSize === 2 ? 'btn-primary' : 'btn-secondary'}`}
            >
              2x2 Cube
            </button>
            <button 
              onClick={() => handleCubeSizeChange(3)}
              className={`btn ${cubeSize === 3 ? 'btn-primary' : 'btn-secondary'}`}
            >
              3x3 Cube
            </button>
          </div>
          
          <button 
            onClick={toggleLabels}
            className="btn btn-secondary"
          >
            {showLabels ? 'Hide Labels' : 'Show Labels'}
          </button>
        </div>

        <div className="cube-views-container">
          <div className="cube-view-section">
            <h2 className="view-title">2D View</h2>
            <div className="cube-container">
              {cubeFaces}
            </div>
          </div>

          <div className="cube-view-section">
            <h2 className="view-title">3D View</h2>
            <Cube3D 
              cubeState={cubeState}
              onStickerClick={handleStickerClick}
              selectedSticker={selectedSticker}
              size={cubeSize}
            />
          </div>
        </div>

        <div className="controls">
          <button 
            onClick={resetCube}
            className="btn btn-secondary"
            disabled={isSolving}
          >
            Reset Cube
          </button>
          
          <button 
            onClick={solveCubeHandler}
            className="btn btn-primary"
            disabled={isSolving}
          >
            {isSolving ? 'Solving...' : 'Solve Cube'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {solution && (
          <div className="solution">
            <h3>Solution:</h3>
            <div className="solution-steps">
              {solution.split('\n').map((step, index) => (
                <div key={index} className="solution-step">
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedSticker && (
          <ColorPicker 
            onColorSelect={updateSticker}
            onClose={closeColorPicker}
          />
        )}
      </main>
    </div>
  );
}

export default App
