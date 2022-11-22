import { AreasState } from '../models/areaModels'
import { Task } from '../models/taskModels'

export const getTasksForArea = (areaId: string) => {
  return (state: AreasState) => {
    let tasks: Task[] = []
    state.areas.forEach((area) => {
      if (area.id === areaId) {
        tasks = area.tasks
      }
    })
    return tasks
  }
}

export const getTaskData = (id: string, areaName?: string) => {
  if (areaName) {
    return (state: AreasState) => {
      let area = state.areas.find((area) => area.name === areaName)
      return area?.tasks.find((task) => task.id === id)
    }
  } else {
    return (state: AreasState) => {
      state.areas.forEach((area) => {
        let task = area.tasks.find((task) => task.id === id)
        if (task) return task
      })
    }
  }
}
