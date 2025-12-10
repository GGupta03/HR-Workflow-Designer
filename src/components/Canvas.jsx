import React, {useCallback, useRef, useState, useEffect} from 'react'
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  MiniMap,
  Controls,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflow } from '../state/workflowContext.jsx'

import StartNode from '../nodes/StartNode.jsx'
import TaskNode from '../nodes/TaskNode.jsx'
import ApprovalNode from '../nodes/ApprovalNode.jsx'
import AutomatedNode from '../nodes/AutomatedNode.jsx'
import EndNode from '../nodes/EndNode.jsx'

const nodeTypes = { start: StartNode, task: TaskNode, approval: ApprovalNode, automated: AutomatedNode, end: EndNode }

let id = 1
const getId = (t)=> `${t}_${id++}`

export default function Canvas() {
  const reactFlowWrapper = useRef(null)
  const { nodes, setNodes, edges, setEdges } = useWorkflow()

  useEffect(()=>{
    // initialize defaults if empty
    if(nodes.length===0){
      setNodes([
        { id: getId('start'), type:'start', position:{x:200,y:60}, data:{label:'Start', config:{startTitle:'User Initializing'}} },
        { id: getId('end'), type:'end', position:{x:900,y:60}, data:{label:'End', config:{endMessage:'Completed'}} }
      ])
    }
  },[])

  // simulate
  useEffect(()=>{
    const onSim = async ()=>{
      const payload = { nodes, edges }
      try {
        const res = await fetch('/simulate', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify(payload)
        })
        const json = await res.json()
        window.dispatchEvent(new CustomEvent('simulation-result', {detail: json}))
      } catch(err){
        window.dispatchEvent(new CustomEvent('simulation-result',{detail:{error:String(err)}}))
      }
    }
    window.addEventListener('simulate-workflow', onSim)
    return ()=> window.removeEventListener('simulate-workflow', onSim)
  },[nodes,edges])

  useEffect(()=>{
    const handler = (e)=>{
      const result = e.detail
      const logArea = document.getElementById('logArea')
      if(logArea){
        logArea.innerHTML = ''
        ;(result.steps || [JSON.stringify(result)]).forEach(s=>{
          const div = document.createElement('div')
          div.textContent = typeof s === 'string' ? s : JSON.stringify(s)
          logArea.appendChild(div)
        })
      }
    }
    window.addEventListener('simulation-result', handler)
    return ()=> window.removeEventListener('simulation-result', handler)
  },[])

  useEffect(()=>{
    const updater = (e)=>{
      const { id, config } = e.detail || {}
      if(!id) return
      setNodes((nds)=> nds.map(n=> n.id === id ? {...n, data:{...n.data, config}} : n))
    }
    window.addEventListener('update-node-config', updater)
    return ()=> window.removeEventListener('update-node-config', updater)
  },[])

  useEffect(()=>{
    const onClear = () => { setNodes([]); setEdges([]) }
    window.addEventListener('clear-workflow', onClear)
    return ()=> window.removeEventListener('clear-workflow', onClear)
  },[])

  const onConnect = useCallback((params) => setEdges((eds)=>addEdge({...params, animated:true, markerEnd:{type:MarkerType.Arrow}}, eds)),[setEdges])
  const onNodesChange = useCallback((changes)=> setNodes((nds)=>applyNodeChanges(changes, nds)),[setNodes])
  const onEdgesChange = useCallback((changes)=> setEdges((eds)=>applyEdgeChanges(changes, eds)),[setEdges])

  const onDrop = useCallback((event) => {
    event.preventDefault()
    const type = event.dataTransfer.getData('application/reactflow')
    if (!type) return
    const bounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
    const newNode = { id: getId(type), type, position, data: { label: type, config: {} } }
    setNodes((nds)=>nds.concat(newNode))
  },[setNodes])

  const onDragOver = useCallback((event)=>{ event.preventDefault(); event.dataTransfer.dropEffect = 'move' },[])

  return (
    <div ref={reactFlowWrapper} style={{height:'100%'}} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(e,node)=> window.dispatchEvent(new CustomEvent('select-node',{detail:node}))}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background gap={16} size={1} style={{background:'#f7fafc'}} />
        <Controls />
        <MiniMap nodeStrokeColor={n => n.type === 'start' ? '#0b5fff' : '#888'} nodeColor={n => n.type === 'start' ? '#e8f0ff' : '#fff'} />
      </ReactFlow>
    </div>
  )
}
