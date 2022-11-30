import { Ionicons } from '@expo/vector-icons'
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Input,
  Modal,
  useContrastText,
} from 'native-base'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  addTaskToArea,
  cycleOptions,
  getLengthInDays,
} from '../../../store/areasSlice'
import { getBgColorSecondary } from '../../../Theme'
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

  const [showModal, setShowModal] = React.useState(false)
  const [newTaskName, setNewTaskName] = React.useState('')
  const [isChecked, setCheck] = useState(true)

  const [taskInputs, setTaskInputs] = useState({
    cycleOption: cycleOptions.Days,
    cycleTime: '1',
    taskName: newTaskName,
  })

  const getLastCompleted = () => {
    if (isChecked) {
      return today.unix()
    } else {
      return 0
    }
  }

  return (
    <>
      <IconButton
        bg={getBgColorSecondary()}
        variant={'subtle'}
        margin={'5px'}
        _icon={{
          as: Ionicons,
          name: 'add-circle-outline',
          color: useContrastText(getBgColorSecondary()),
        }}
        onPress={() => setShowModal(true)}
      />
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        safeAreaTop={true}
      >
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
              onChange={(value) => {
                setCheck(value)
              }}
            >
              Mark Completed Today
            </Checkbox>
          </Modal.Body>
          <Modal.Footer justifyContent={'center'}>
            <Button
              paddingX={'20'}
              onPress={() => {
                setShowModal(false)
                addNewTask(
                  newTaskName,
                  getLengthInDays(taskInputs.cycleOption, taskInputs.cycleTime),
                  getLastCompleted()
                )
                setNewTaskName('')
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
