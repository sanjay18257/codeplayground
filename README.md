# CodePlayground

An online code editor and execution platform inspired by LeetCode's playground. This application allows users to write, run, and see the output of their code without requiring authentication.

## Features

- Code editor with syntax highlighting for multiple languages
- Language selection (Java, JavaScript, Python, C++)
- Run button to execute code
- Output display showing execution results
- Time and memory usage statistics
- Light and dark theme options

## Tech Stack

- **Frontend**: React.js with Vite, Monaco Editor
- **Backend**: Spring Boot (requires separate setup)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Backend Setup

The backend requires a Spring Boot application to handle code execution. The frontend is currently configured to work with a backend API running at `http://localhost:8080/api`.

For development purposes, the frontend includes a simulation mode that returns mock responses.

## Project Structure

- `src/components/`: React components
- `src/services/`: API services
- `src/styles/`: CSS styles
- `src/constants/`: Application constants

## Design 

The application features a clean, minimalist design inspired by modern code editors and Apple's design principles:

- Dark mode by default with light mode option
- Split-pane layout for code editor and output
- Professional typography with proper spacing and contrast
- Subtle animations for loading states