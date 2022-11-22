import { Button, Checkbox, FormControl, Input, Modal, Text } from 'native-base'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  addTaskToArea,
  cycleOptions,
  getLengthInDays,
} from '../../../store/areasSlice'
import { today } from '../../../utils/dateLogic'
import CycleTimeEditor from './CycleTimeEditor'

function AddTaskModal(props: { areaId: string }) {
  const dispatch = useDispatch()

  const addNewTask = (
    name: string,
    cycleLengthDays: number,
    lastCompleted: number = 0
  ) => {
    dispatch(
      addTaskToArea({
        areaId: props.areaId,
        taskName: name,
        lastDone: lastCompleted,
        cycleLengthDays: cycleLengthDays,
      })
    )
  }

  const [open, setOpen] = React.useState(false)
  const [newTaskName, setNewTaskName] = React.useState('')

  const [taskInputs, setTaskInputs] = useState({
    cycleOption: cycleOptions.Days,
    cycleTime: '1',
    taskName: newTaskName,
  })

  const [isChecked, setCheck] = useState(true)

  const toggleCheck = () => {
    setCheck(!isChecked)
  }

  const getLastCompleted = () => {
    if (isChecked) {
      return today.unix()
    } else {
      return 0
    }
  }

  return (
    <>
      <Button
        bg={'gray.100'}
        variant={'subtle'}
        margin={'5px'}
        onPress={() => setOpen(true)}
      >
        <Text>+</Text>
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth='350' marginBottom={'auto'} marginTop={10}>
          <Modal.CloseButton />
          <Modal.Header>Add Task</Modal.Header>
          <Modal.Body>
            <FormControl isRequired>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                value={newTaskName}
                onChangeText={(newName) => setNewTaskName(newName)}
              />
            </FormControl>
            <CycleTimeEditor
              taskInputs={taskInputs}
              setTaskInputs={setTaskInputs}
            ></CycleTimeEditor>
            <Checkbox
              defaultIsChecked
              value='true'
              mt={'4'}
              mx={'4'}
              size={'md'}
              onChange={toggleCheck}
            >
              Mark Completed Today
            </Checkbox>
          </Modal.Body>
          <Modal.Footer justifyContent={'center'}>
            <Button
              paddingX={'20'}
              onPress={() => {
                addNewTask(
                  newTaskName,
                  getLengthInDays(taskInputs.cycleOption, taskInputs.cycleTime),
                  getLastCompleted()
                )
                setNewTaskName('')
                setOpen(false)
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default AddTaskModal
