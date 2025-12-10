import React from 'react'
import Sidebar from './components/Sidebar.jsx'
import Canvas from './components/Canvas.jsx'
import NodeEditor from './components/NodeEditor.jsx'
import { WorkflowProvider } from './state/workflowContext.jsx'
export default function App(){
  return (
    <WorkflowProvider>
      <div className="app">
        <div className="sidebar"><Sidebar /></div>
        <div className="canvasWrap"><Canvas /></div>
        <div className="editor"><NodeEditor /></div>
      </div>
    </WorkflowProvider>
  )
}
