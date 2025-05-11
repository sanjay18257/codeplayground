import '../styles/OutputPane.css'

function OutputPane({ output, stats, isRunning }) {
  return (
    <div className="output-pane">
      <div className="output-header">
        <h2>Output</h2>
        {stats.executionTime !== null && (
          <div className="stats">
            <div className="stat">
              <span className="stat-label">Time:</span>
              <span className="stat-value">{stats.executionTime} ms</span>
            </div>
            <div className="stat">
              <span className="stat-label">Memory:</span>
              <span className="stat-value">{stats.memoryUsage} KB</span>
            </div>
          </div>
        )}
      </div>
      
      <div className={`output-content ${isRunning ? 'running' : ''}`}>
        {output ? (
          <pre>{output}</pre>
        ) : (
          <div className="placeholder-text">
            Run your code to see the output here
          </div>
        )}
        
        {isRunning && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputPane