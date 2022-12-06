import { Dayjs } from 'dayjs'
import { CycleOptions } from './CycleOptions'

export interface Task {
  id: string
  name: string
  lastDone: Dayjs
  cycleQuantity: number
  cycleOption: CycleOptions
}

export interface NewTaskDetails {
  areaId: string
  taskName: string
  lastDone: Dayjs
  cycleQuantity: number
  cycleOption: CycleOptions
}

export interface CompleteTaskDetails {
  areaId: string
  taskId: string
  lastDone: Dayjs
}

export interface EditTaskDetails {
  areaId: string
  taskId: string
  newName: string
  cycleQuantity: number
  cycleOption: CycleOptions
}

export interface DeleteTaskDetails {
  areaId: string
  taskId: string
}
