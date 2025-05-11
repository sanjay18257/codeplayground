import { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import '../styles/CodeEditorPane.css'

function CodeEditorPane({ code, language, onChange, theme }) {
  const editorRef = useRef(null)

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
  }

  const handleEditorChange = (value) => {
    onChange(value)
  }

  // Map language ID to Monaco language ID
  const mapLanguageToMonaco = (languageId) => {
    const mapping = {
      'java': 'java',
      'javascript': 'javascript',
      'python': 'python',
      'cpp': 'cpp'
    }
    return mapping[languageId] || 'plaintext'
  }

  return (
    <div className="editor-container">
      <Editor
        height="100%"
        defaultLanguage={mapLanguageToMonaco(language.id)}
        language={mapLanguageToMonaco(language.id)}
        value={code}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 16, // Increased from 14
          fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
          tabSize: 2,
          lineNumbers: 'on',
          roundedSelection: false,
          renderIndentGuides: true,
          automaticLayout: true
        }}
      />
    </div>
  )
}

export default CodeEditorPane