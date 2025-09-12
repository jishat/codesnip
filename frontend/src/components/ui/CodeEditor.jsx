import React from 'react'
import { EditorView } from '@codemirror/view'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'


const CodeEditor = ({ value, onChange, className="", readOnly=false, placeholder="Paste your HTML code here.." }) => {
  return (
    <div className={`border shadow-sm ${className}`}>
      <CodeMirror
        readOnly={readOnly}
        value={value}
        height="400px"
        extensions={[html()]}
        onChange={(val) => onChange(val)}
        theme="light"
        placeholder={placeholder}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          foldGutter: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
