import { HStack } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { Area } from '../../models/areaModels'
import { getTasksForArea } from '../../store/tasks'
import AddTaskModal from './components/AddTaskModal'
import TaskButton from './components/TaskButton'

function TaskView(props: { area: Area }) {
  const tasks = useSelector(getTasksForArea(props.area.id))

  return (
    <HStack padding={2} flexWrap={'wrap'}>
      {tasks.map((value) => (
        <TaskButton key={value.id} task={value} areaId={props.area.id} />
      ))}
      <AddTaskModal areaId={props.area.id} />
    </HStack>
  )
}

export default TaskView
