import React from 'react'
import { useWorkflow } from '../state/workflowContext.jsx'

const items = [
  {type:'start', label:'Start Node'},
  {type:'task', label:'Task Node'},
  {type:'approval', label:'Approval Node'},
  {type:'automated', label:'Automated Step'},
  {type:'end', label:'End Node'},
]

export default function Sidebar(){
  const onDragStart = (ev, nodeType) => {
    ev.dataTransfer.setData('application/reactflow', nodeType)
    ev.dataTransfer.effectAllowed = 'move'
  }
  const { setNodes, setEdges } = useWorkflow()
  return (
    <div>
      {items.map(it=>(
        <div key={it.type} className="nodeItem" draggable onDragStart={(e)=>onDragStart(e,it.type)}>
          <div style={{fontWeight:700}}>{it.label}</div>
          <div style={{fontSize:12,color:'#666'}}>{it.type}</div>
        </div>
      ))}
      <div className="paletteHint">Select a node to edit its configuration in the right panel.</div>

      <div style={{marginTop:20}}>
        <div style={{fontWeight:700, marginBottom:8}}>Simulation</div>
        <div className="controls">
          <button className="runBtn" onClick={() => window.dispatchEvent(new CustomEvent('simulate-workflow'))}>Run</button>
          <button className="runBtn" style={{background:'#6b7280'}} onClick={() => { setNodes([]); setEdges([]) }}>Clear</button>
        </div>
        <div style={{marginTop:12, fontWeight:700}}>Logs</div>
        <div className="log" id="logArea"></div>
      </div>
    </div>
  )
}
