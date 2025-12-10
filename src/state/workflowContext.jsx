import React, {createContext, useContext, useState, useCallback} from 'react'

const WorkflowContext = createContext(null)

export function WorkflowProvider({children}){
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  const updateNodes = useCallback((updater)=> setNodes(updater),[])
  const updateEdges = useCallback((updater)=> setEdges(updater),[])

  return (
    <WorkflowContext.Provider value={{nodes,setNodes,edges,setEdges,updateNodes,updateEdges}}>
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflow(){ return useContext(WorkflowContext) }
