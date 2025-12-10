import { rest } from 'msw'

const automations = [
  { id: 'send_email', label: 'Send Email', params: ['to','subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template','recipient'] }
]

export const handlers = [
  rest.get('/automations', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(automations))
  }),

  rest.post('/simulate', async (req, res, ctx) => {
    const { nodes = [], edges = [] } = await req.json();

    const start = nodes.find(n => n.type === 'start')
    if(!start){
      return res(ctx.status(400), ctx.json({ steps: ['❌ No start node found'] }))
    }

    const steps = []
    const visited = new Set()
    let current = start
    while(current && !visited.has(current.id)){
      visited.add(current.id)
      steps.push(`➡️ ${current.id} (${current.type}) executed with config: ${JSON.stringify(current.data?.config||{})}`)
      const out = edges.find(e=> e.source === current.id)
      if(!out) break
      current = nodes.find(n=> n.id === out.target)
    }
    steps.push('✅ Simulation Completed')
    return res(ctx.status(200), ctx.json({ steps }))
  })
]
