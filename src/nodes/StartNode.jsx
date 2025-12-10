import React from 'react'
import { Handle, Position } from 'reactflow'
export default function StartNode({data}){
  return (<div className="nodeCard" style={{borderLeft:'4px solid #0b5fff'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className="nodeTitle">Start</div>
      <div className="smallBadge">Init</div>
    </div>
    <div className="nodeMeta">{data?.config?.startTitle || data?.label}</div>
    <Handle type="source" position={Position.Right} id="start-out" style={{background:'#0b5fff'}} />
  </div>)
}
