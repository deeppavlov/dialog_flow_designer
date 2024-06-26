/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
import { Node } from "reactflow"
import { NodeDataType } from "../types/NodeTypes"
import { flowContext } from "./flowContext"

type WorkspaceContextType = {
  workspaceMode: boolean
  setWorkspaceMode: React.Dispatch<React.SetStateAction<boolean>>
  toggleWorkspaceMode: () => void
  nodesLayoutMode: boolean
  setNodesLayoutMode: React.Dispatch<React.SetStateAction<boolean>>
  toggleNodesLayoutMode: () => void
  settingsPage: boolean
  setSettingsPage: React.Dispatch<React.SetStateAction<boolean>>
  selectedNode: string
  setSelectedNode: React.Dispatch<React.SetStateAction<string>>
  handleNodeFlags: (e: React.MouseEvent<HTMLButtonElement>, setNodes: React.Dispatch<React.SetStateAction<Node<NodeDataType>[]>>) => void
  mouseOnPane: boolean
  setMouseOnPane: React.Dispatch<React.SetStateAction<boolean>>
  onModalClose: (onClose: () => void) => void
  onModalOpen: (onOpen: () => void) => void
  managerMode: boolean
  setManagerMode: React.Dispatch<React.SetStateAction<boolean>>
  toggleManagerMode: () => void
}

export const workspaceContext = createContext<WorkspaceContextType>({
  setWorkspaceMode: () => {},
  toggleWorkspaceMode: () => {},
  workspaceMode: false,
  setNodesLayoutMode: () => {},
  toggleNodesLayoutMode: () => {},
  nodesLayoutMode: false,
  setSettingsPage: () => {},
  settingsPage: false,
  selectedNode: "",
  setSelectedNode: () => {},
  handleNodeFlags: () => {},
  mouseOnPane: false,
  setMouseOnPane: () => {},
  onModalClose: () => {},
  onModalOpen: () => {},
  managerMode: false,
  setManagerMode: () => {},
  toggleManagerMode: () => {},
} as WorkspaceContextType)

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [workspaceMode, setWorkspaceMode] = useState(false)
  const [nodesLayoutMode, setNodesLayoutMode] = useState(false)
  const [managerMode, setManagerMode] = useState(false)
  const [settingsPage, setSettingsPage] = useState(false)
  const [selectedNode, setSelectedNode] = useState("")
  const { updateFlow, flows, tab, quietSaveFlows } = useContext(flowContext)
  const [mouseOnPane, setMouseOnPane] = useState(true)
  
  useEffect(() => console.log(mouseOnPane), [mouseOnPane])

  const flow = flows.find((flow) => flow.name === tab)

  const toggleWorkspaceMode = () => {
    setWorkspaceMode(() => !workspaceMode)
  }

  const toggleNodesLayoutMode = () => {
    setNodesLayoutMode(() => !nodesLayoutMode)
  }

  const toggleManagerMode = () => {
    setManagerMode(() => !managerMode)
  }

  const handleNodeFlags = (e: React.MouseEvent<HTMLButtonElement>, setNodes: React.Dispatch<React.SetStateAction<Node<NodeDataType>[]>>) => {
    setNodes((nds) => {
      const new_nds = nds.map((nd: Node<NodeDataType>) => {
        if (nd.data.flags?.includes(e.currentTarget.name)) {
          nd.data.flags = nd.data.flags.filter((flag) => flag !== e.currentTarget.name)
        }
        if (nd.id === selectedNode) {
          if (nd.data.flags?.includes(e.currentTarget.name)) {
            nd.data.flags = nd.data.flags.filter((flag) => flag !== e.currentTarget.name)
          } else {
            if (!nd.data.flags) nd.data.flags = [e.currentTarget.name]
            else nd.data.flags = [...nd.data.flags, e.currentTarget.name]
          }
        }
        return nd
      })
      return new_nds
    })
    if (flow) {
      updateFlow(flow)
    }
    quietSaveFlows()
  }

  const onModalOpen = (onOpen: () => void) => {
    setMouseOnPane(false)
    onOpen()
  }

  const onModalClose = (onClose: () => void) => {
    setMouseOnPane(true)
    onClose()
  }

  return (
    <workspaceContext.Provider
      value={{
        workspaceMode,
        setWorkspaceMode,
        toggleWorkspaceMode,
        nodesLayoutMode,
        setNodesLayoutMode,
        toggleNodesLayoutMode,
        settingsPage,
        setSettingsPage,
        selectedNode,
        setSelectedNode,
        handleNodeFlags,
        mouseOnPane,
        setMouseOnPane,
        onModalClose,
        onModalOpen,
        managerMode,
        setManagerMode,
        toggleManagerMode
      }}>
      {children}
    </workspaceContext.Provider>
  )
}
