import React from 'react'
import { Handle, Position } from 'reactflow'
export default function TaskNode({data}){
  return (<div className="nodeCard">
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className="nodeTitle">{data?.config?.title || 'Task'}</div>
      <div style={{display:'flex',gap:6}}>
        <div style={{fontSize:12,color:'#6b7280'}}>⏱</div>
        <div className="smallBadge">{data?.config?.assignee || 'unassigned'}</div>
      </div>
    </div>
    <div className="nodeMeta">{data?.config?.description || 'Human task'}</div>
    <Handle type="target" position={Position.Left} id="task-in" style={{background:'#888'}} />
    <Handle type="source" position={Position.Right} id="task-out" style={{background:'#0b5fff'}} />
  </div>)
}
