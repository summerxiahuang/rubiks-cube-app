# 🎯 Rubik's Cube Solver

A modern, interactive web application for solving 2x2 and 3x3 Rubik's Cubes with real-time 2D and 3D visualization.

![Rubik's Cube Solver](https://img.shields.io/badge/React-18.0+-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0+-purple?style=for-the-badge&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)

**🌐 Live Demo**: [https://summerxiahuang.github.io/rubiks-cube-app/](https://summerxiahuang.github.io/rubiks-cube-app/)

## ✨ Features

### 🎲 **Dual Cube Support**
- **2x2 Cube**: Perfect for beginners and speedcubing
- **3x3 Cube**: Classic Rubik's Cube with full solving capabilities
- **Seamless Switching**: Toggle between cube sizes instantly

### 🖥️ **Dual View Display**
- **2D View**: Flat layout showing all 6 faces simultaneously
- **3D View**: Interactive 3D cube with mouse-controlled rotation
- **Real-time Synchronization**: Changes in one view reflect in the other

### 🎨 **Interactive Interface**
- **Color Picker**: Click any sticker to change its color
- **Visual Feedback**: Selected stickers are highlighted
- **Position Labels**: Clear indication of sticker positions
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🔧 **Advanced Features**
- **Cube Validation**: Prevents impossible cube configurations
- **Basic Solver**: Provides step-by-step solving instructions
- **Reset Functionality**: Return to solved state anytime
- **Error Handling**: Clear feedback for invalid states

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rubiks-cube-app.git
   cd rubiks-cube-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5174` (or the port shown in your terminal)

## 🎮 How to Use

### **Basic Operation**

1. **Choose Cube Size**
   - Click "2x2 Cube" or "3x3 Cube" buttons at the top
   - The cube will reset to solved state

2. **Customize Your Cube**
   - Click any sticker to open the color picker
   - Select a new color from the available options
   - Changes appear instantly in both 2D and 3D views

3. **3D Cube Interaction**
   - **Rotate**: Click and drag to rotate the 3D cube
   - **Reset View**: Click "Reset View" to return to default orientation
   - **Select Stickers**: Click stickers in 3D view to change colors

4. **Solve the Cube**
   - Click "Solve Cube" to get solving instructions
   - The app validates your cube state first
   - Follow the step-by-step solution provided

### **Controls**

| Action | Description |
|--------|-------------|
| **Cube Size Toggle** | Switch between 2x2 and 3x3 cubes |
| **Show/Hide Labels** | Toggle position labels on 2D view |
| **Reset Cube** | Return to solved state |
| **Solve Cube** | Get solving instructions |
| **3D Rotation** | Click and drag to rotate |
| **Reset 3D View** | Return to default 3D orientation |

### **Cube Orientation**

The app uses standard cube notation:
- **U (White)**: Top face
- **D (Yellow)**: Bottom face  
- **F (Green)**: Front face (facing you)
- **B (Orange)**: Back face (opposite to front)
- **R (Red)**: Right face
- **L (Blue)**: Left face

## 🛠️ Technical Details

### **Built With**
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **CSS3**: Advanced styling with CSS Grid and 3D transforms
- **JavaScript ES6+**: Modern JavaScript features

### **Key Technologies**
- **CSS 3D Transforms**: Realistic 3D cube rendering
- **React Hooks**: useState, useCallback, useMemo for optimization
- **Component Architecture**: Modular, reusable components
- **Responsive Design**: Mobile-first approach

### **Performance Optimizations**
- **Memoization**: useMemo and useCallback for performance
- **Lazy Loading**: Efficient component rendering
- **Event Optimization**: Debounced mouse interactions
- **Memory Management**: Proper cleanup and state management

## 📁 Project Structure

```
rubiks-cube-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Styles and 3D cube CSS
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🎯 Features in Detail

### **2D View**
- Grid layout showing all 6 faces
- Position labels for each sticker
- Color-coded face identification
- Responsive grid system

### **3D View**
- Interactive 3D cube using CSS transforms
- Mouse-controlled rotation (X and Y axes)
- Realistic lighting and shadows
- Smooth animations and transitions

### **Cube Validation**
- Ensures each color appears the correct number of times
- Prevents impossible cube configurations
- Provides clear error messages
- Validates both 2x2 and 3x3 cubes

### **Solving Algorithm**
- Basic solving approach for both cube sizes
- Step-by-step instructions
- Educational content for beginners
- Foundation for advanced solving methods

## 🔧 Development

### **Available Scripts**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### **Code Quality**
- **ESLint**: Code linting and formatting
- **React Best Practices**: Functional components and hooks
- **Performance Optimized**: Memoization and efficient rendering
- **Accessible**: ARIA labels and keyboard navigation

## 🌟 Future Enhancements

- [ ] **Advanced Solver**: Implement actual solving algorithms
- [ ] **Move History**: Track and replay moves
- [ ] **Timer**: Speedcubing timer functionality
- [ ] **Scramble Generator**: Random cube scrambles
- [ ] **Save/Load**: Save cube states locally
- [ ] **Multiplayer**: Real-time solving competitions
- [ ] **Tutorial Mode**: Interactive learning guides
- [ ] **Custom Themes**: Different color schemes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Rubik's Cube Community**: For inspiration and solving methods
- **React Team**: For the amazing framework
- **Vite Team**: For the fast build tool
- **CSS Working Group**: For 3D transform capabilities

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Happy Solving! 🎯**

*Built with ❤️ using React and modern web technologies*
