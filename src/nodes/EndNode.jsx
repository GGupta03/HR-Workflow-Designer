import React from 'react'
import { Handle, Position } from 'reactflow'
export default function EndNode({data}){
  return (<div className="nodeCard" style={{borderLeft:'4px solid #111'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className="nodeTitle">End</div>
      <div className="smallBadge">Done</div>
    </div>
    <div className="nodeMeta">{data?.config?.endMessage || ''}</div>
    <Handle type="target" position={Position.Left} id="end-in" style={{background:'#444'}} />
  </div>)
}
