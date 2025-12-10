import { useEffect, useState } from 'react'
export default function useAutomations(){
  const [actions,setActions]=useState([])
  useEffect(()=>{
    fetch('/automations').then(r=>r.json()).then(d=>setActions(d)).catch(()=>setActions([]))
  },[])
  return actions
}
