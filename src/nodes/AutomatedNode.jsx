import React from 'react'
import { Handle, Position } from 'reactflow'
export default function AutomatedNode({data}){
  return (<div className="nodeCard" style={{borderLeft:'4px dashed #10b981'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className="nodeTitle">{data?.config?.title || 'Automated Step'}</div>
      <div className="smallBadge">{data?.config?.action || 'action'}</div>
    </div>
    <div className="nodeMeta">Params: {data?.config?.params ? JSON.stringify(data.config.params) : '-'}</div>
    <Handle type="target" position={Position.Left} id="auto-in" />
    <Handle type="source" position={Position.Right} id="auto-out" />
  </div>)
}
