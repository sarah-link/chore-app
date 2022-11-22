import { Box, Button, Divider, FormControl, Heading, Input } from 'native-base'
import React from 'react'
import { Task } from '../../../models/taskModels'
import CycleTimeEditor from './CycleTimeEditor'
import { TaskInputs } from './TaskInfoModal'

export interface TaskEditProps {
  task: Task
  taskInputs: TaskInputs
  setTaskInputs: any
  delete: () => void
}

function TaskEdit(props: TaskEditProps) {
  const changeTaskNameInput = (name: string) => {
    props.setTaskInputs((prevState: TaskInputs) => ({
      ...prevState,
      taskName: name,
    }))
  }

  return (
    <>
      <Heading size={'sm'}>Manage task</Heading>
      <FormControl>
        <FormControl.Label>Name</FormControl.Label>
        <Input
          value={props.taskInputs.taskName}
          onChangeText={(newName) => changeTaskNameInput(newName)}
        />
        <CycleTimeEditor
          taskInputs={props.taskInputs}
          setTaskInputs={props.setTaskInputs}
        ></CycleTimeEditor>
        <Divider my={4}></Divider>
        <Box alignItems={'center'}>
          <Button bg={'red.500'} onPress={() => props.delete()}>
            Delete Task
          </Button>
        </Box>
      </FormControl>
    </>
  )
}

export default TaskEdit
