import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useAutomations from '../hooks/useAutomations'
import { useWorkflow } from '../state/workflowContext.jsx'

const baseSchema = yup.object().shape({
  title: yup.string().required('Title is required')
})

export default function NodeEditor(){
  const actions = useAutomations()
  const { nodes, setNodes } = useWorkflow()
  const { register, reset, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(baseSchema),
    defaultValues:{}
  })
  const [selected, setSelected] = useState(null)

  useEffect(()=>{
    const handler = (e)=>{
      setSelected(e.detail)
      reset(e.detail?.data?.config || {})
    }
    window.addEventListener('select-node', handler)
    return ()=> window.removeEventListener('select-node', handler)
  },[reset])

  if(!selected) return <div>Select a node to edit its configuration.</div>

  const onSubmit = (data)=>{
    if(data.params && typeof data.params === 'string'){
      try { data.params = JSON.parse(data.params) } catch(e){}
    }
    // update node in workflow context
    setNodes((nds)=> nds.map(n=> n.id === selected.id ? {...n, data:{...n.data, config:data}} : n))
    alert('Saved')
  }

  return (
    <div>
      <div style={{fontWeight:700, marginBottom:8}}>Editing: {selected.id} ({selected.type})</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginBottom:8}}>
          <label>Title</label><br/>
          <input {...register('title')} style={{width:'100%',padding:8}} defaultValue={selected.data?.config?.title || selected.data?.label || ''} />
          {errors.title && <div style={{color:'red'}}>{errors.title.message}</div>}
        </div>

        {selected.type === 'task' && <>
          <div style={{marginBottom:8}}>
            <label>Description</label><br/>
            <textarea {...register('description')} style={{width:'100%',padding:8}} defaultValue={selected.data?.config?.description||''} />
          </div>
          <div style={{marginBottom:8}}>
            <label>Assignee</label><br/>
            <input {...register('assignee')} style={{width:'100%',padding:8}} defaultValue={selected.data?.config?.assignee||''} />
          </div>
        </>}

        {selected.type === 'automated' && <>
          <div style={{marginBottom:8}}>
            <label>Action</label><br/>
            <select {...register('action')} defaultValue={selected.data?.config?.action||''} style={{width:'100%',padding:8}}>
              <option value=''>-- choose --</option>
              {actions.map(a=> <option key={a.id} value={a.id}>{a.label}</option>)}
            </select>
          </div>
          <div style={{marginBottom:8}}>
            <label>Params (json)</label><br/>
            <textarea {...register('params')} defaultValue={JSON.stringify(selected.data?.config?.params||{})} style={{width:'100%',padding:8}} />
          </div>
        </>}

        {selected.type === 'approval' && <>
          <div style={{marginBottom:8}}>
            <label>Approver Role</label><br/>
            <input {...register('approverRole')} style={{width:'100%',padding:8}} defaultValue={selected.data?.config?.approverRole||'Manager'} />
          </div>
        </>}

        {selected.type === 'start' && <>
          <div style={{marginBottom:8}}>
            <label>Start title</label><br/>
            <input {...register('startTitle')} style={{width:'100%',padding:8}} defaultValue={selected.data?.config?.startTitle||''} />
          </div>
        </>}

        {selected.type === 'end' && <>
          <div style={{marginBottom:8}}>
            <label>End message</label><br/>
            <input {...register('endMessage')} style={{width:'100%',padding:8}} defaultValue={selected.data?.config?.endMessage||''} />
          </div>
        </>}

        <div style={{display:'flex',gap:8}}>
          <button className="runBtn" type="submit">Save</button>
          <button type="button" onClick={()=> reset(selected.data?.config||{})}>Reset</button>
        </div>
      </form>
    </div>
  )
}
