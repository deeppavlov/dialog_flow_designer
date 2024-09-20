import { Edge, ReactFlowJsonObject } from "@xyflow/react"
import { AppNode } from "./NodeTypes"

export type FlowType = {
  id: string
  name: string
  description?: string
  color?: string
  subflow?: string
  data: ReactFlowJsonObject<AppNode, Edge>
}

export type SlotType = {
  id: string
  group_name: string
  type: "RegexpSlot" | ""
  method: string
  value: string
  name?: string 
}

export type SlotsGroupType = {
  id: string
  name: string
  slots: SlotType[]
  subgroups?: string[]
  subgroup_to: string
  flow: "global" | string
}
