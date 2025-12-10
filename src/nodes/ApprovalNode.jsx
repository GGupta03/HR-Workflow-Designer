import React from 'react'
import { Handle, Position } from 'reactflow'
export default function ApprovalNode({data}){
  return (<div className="nodeCard" style={{borderLeft:'4px solid #f59e0b'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className="nodeTitle">{data?.config?.title || 'Approval'}</div>
      <div className="smallBadge">{data?.config?.approverRole || 'Manager'}</div>
    </div>
    <div className="nodeMeta">Auto-threshold: {data?.config?.threshold ?? 0}</div>
    <Handle type="target" position={Position.Left} id="app-in" />
    <Handle type="source" position={Position.Right} id="app-out" />
  </div>)
}
