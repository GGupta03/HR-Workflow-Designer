# HR Workflow Designer 

## Summary
This project demonstrates a mini HR Workflow Designer built with React and React Flow.
It focuses on modular architecture, dynamic node forms, mock API interactions, and a simulation sandbox.

## Assessment mapping
- **React Flow proficiency**: Custom node components (`src/nodes/*`), handles for input/output, MiniMap, Controls; edges support animated arrows.
- **React architecture**: `WorkflowProvider` (context) in `src/state/workflowContext.jsx` separates state; components in `src/components`; hooks in `src/hooks`.
- **Complex form handling**: `react-hook-form` with `yup` validation in `src/components/NodeEditor.jsx`. Automated actions are fetched via hook `useAutomations`.
- **Mock API interaction**: MSW in `src/mocks` exposes `GET /automations` and `POST /simulate`.
- **Scalability**: Clear folder structure, context + hooks, separation of concerns for easy extension.
- **Communication**: This README and inline comments explain design choices and assumptions.
- **Delivery speed**: Prototype is lightweight and can be extended quickly.

## Features

- Drag-and-drop workflow builder (React Flow)
- Custom node types: **Start**, **Task**, **Approval**, **Automated Step**, **End**
- Node configuration panel with validation (react-hook-form + Yup)
- Mock API with MSW  
  - `GET /automations` – fetch automation actions  
  - `POST /simulate` – run workflow and return execution steps
- Simulation panel with real-time logs
- Extensible architecture using context + hooks
  
## Run
1. `npm install`
2. `npm run dev`

## Next improvements (optional)
- Auto-layout (dagre) to arrange nodes like the reference
- Visual validation badges on nodes
- Export/import workflows
- Persist workflows to backend or localStorage
