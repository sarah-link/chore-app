import { Task } from './taskModels'

export interface AreasState {
  areas: Area[]
}

export interface Area {
  id: string
  name: string
  tasks: Task[]
}

export interface RenameAreaDetails {
  id: string
  newName: string
}
