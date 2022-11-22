export interface Task {
  id: string
  name: string
  lastDone: number
  cycleLengthDays: number
}

export interface NewTaskDetails {
  areaId: string
  taskName: string
  lastDone: number
  cycleLengthDays: number
}

export interface CompleteTaskDetails {
  areaId: string
  taskId: string
  lastDone: number
}

export interface EditTaskDetails {
  areaId: string
  taskId: string
  newName: string
  cycleLengthDays: number
}

export interface DeleteTaskDetails {
  areaId: string
  taskId: string
}
