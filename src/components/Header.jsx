import { useState } from 'react'
import '../styles/Header.css'

function Header({ selectedLanguage, onLanguageChange, onRun, isRunning, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLanguageSelect = (languageId) => {
    onLanguageChange(languageId)
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text">CodePlayground</span>
      </div>
      
      <div className="editor-controls">
        <div className="language-selector">
          <div 
            className="selected-language" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {selectedLanguage.name} <span className="dropdown-arrow">▼</span>
          </div>
          
          {menuOpen && (
            <div className="language-dropdown">
              {[
                { id: 'java', name: 'Java' },
                { id: 'javascript', name: 'JavaScript' },
                { id: 'python', name: 'Python' },
                { id: 'cpp', name: 'C++' }
              ].map(language => (
                <div 
                  key={language.id}
                  className={`language-option ${selectedLanguage.id === language.id ? 'active' : ''}`}
                  onClick={() => handleLanguageSelect(language.id)}
                >
                  {language.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button 
          className={`run-button ${isRunning ? 'running' : ''}`}
          onClick={onRun}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
        
        <button 
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header