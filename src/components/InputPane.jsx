import React from 'react';
import '../styles/InputPane.css';

function InputPane({ input, onInputChange, language, suggestion }) {
  const getInputExample = () => {
    switch(language) {
      case 'java':
        return "42";
      case 'python':
        return "42";
      case 'javascript':
        return "42\nHello World";
      case 'cpp':
        return "42\n3.14";
      default:
        return "Sample input values\nOne per line";
    }
  };

  const setExampleInput = () => {
    onInputChange(getInputExample());
  };

  const clearInput = () => {
    onInputChange('');
  };

  return (
    <div className="input-pane">
      <div className="input-header">
        <h2>Input</h2>
        <div className="input-actions">
          <button 
            className="example-btn" 
            onClick={setExampleInput}
            title="Load example input"
          >
            Example
          </button>
          <button 
            className="clear-btn" 
            onClick={clearInput}
            title="Clear input"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="input-instructions">
        <small className='instruction'>
          Provide all input values upfront, one per line. Your program cannot wait for interactive input.
        </small>
        {suggestion && (
          <div className="input-suggestion">
            <i className="suggestion-icon">💡</i> {suggestion}
          </div>
        )}
      </div>
      
      <textarea
        className="input-textarea"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Enter all input values here, one per line"
      />
    </div>
  );
}

export default InputPane;
