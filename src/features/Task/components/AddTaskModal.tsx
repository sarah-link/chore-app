import { Ionicons } from '@expo/vector-icons'
import dayjs, { Dayjs } from 'dayjs'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Input,
  Modal,
  Text,
  useContrastText,
  WarningOutlineIcon,
} from 'native-base'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CycleOptions } from '../../../models/CycleOptions'
import { addTaskToArea } from '../../../store/areasSlice'
import { getBgColorSecondary, getBgColorTertiary } from '../../../Theme'
import { today } from '../../../utils/dateUtils'
import CycleTimeEditor from './CycleTimeEditor'

function AddTaskModal(props: { areaId: string }) {
  // TODO: combine some of these states or use a form management library
  const [showModal, setShowModal] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')
  const [completeNowChecked, setCompleteNowChecked] = useState(true)
  const [nameIsInvalid, setNameIsInvalid] = useState(false)
  const [taskInputs, setTaskInputs] = useState({
    cycleOption: CycleOptions.Days,
    cycleQuantity: 1,
    taskName: newTaskName,
  })

  const dispatch = useDispatch()

  const addNewTask = (
    name: string,
    cycleQuantity: number,
    cyclceOption: CycleOptions,
    lastCompleted: Dayjs
  ) => {
    if (validateName()) {
      dispatch(
        addTaskToArea({
          areaId: props.areaId,
          taskName: name,
          lastDone: lastCompleted,
          cycleQuantity: cycleQuantity,
          cycleOption: cyclceOption,
        })
      )
      closeModal()
    }
  }

  const getLastCompleted = () => {
    if (completeNowChecked) {
      return today
    } else {
      return dayjs(0)
    }
  }

  const closeModal = () => {
    setNameIsInvalid(false)
    setShowModal(false)
    setNewTaskName('')
  }

  const validateName = () => {
    setNewTaskName(newTaskName.trim())
    const nameIsValid = newTaskName.trim() !== ''
    setNameIsInvalid(!nameIsValid)
    return nameIsValid
  }

  return (
    <>
      <IconButton
        h={'12'}
        w={'12'}
        m={'5px'}
        bg={getBgColorTertiary()}
        borderColor={useContrastText(getBgColorTertiary())}
        borderWidth='1'
        borderStyle={'dashed'}
        alignSelf={'center'}
        variant={'subtle'}
        _icon={{
          as: Ionicons,
          name: 'add',
          color: useContrastText(getBgColorSecondary()),
        }}
        onPress={() => setShowModal(true)}
      />
      <Modal safeAreaTop isOpen={showModal} onClose={() => closeModal()}>
        <Modal.Content maxWidth='350' marginBottom={'auto'} marginTop={10}>
          <Modal.CloseButton />
          <Modal.Header>Add Task</Modal.Header>
          <Modal.Body>
            <FormControl isRequired isInvalid={nameIsInvalid}>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                value={newTaskName}
                onChangeText={(newName) => setNewTaskName(newName)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size='xs' />}
              >
                Task name cannot be blank.
              </FormControl.ErrorMessage>
            </FormControl>
            <CycleTimeEditor
              taskInputs={taskInputs}
              setTaskInputs={setTaskInputs}
            />
            <Box marginTop={'6'}>
              <Checkbox
                defaultIsChecked
                size={'md'}
                value='true'
                onChange={(value) => {
                  setCompleteNowChecked(value)
                }}
              >
                <Text>Mark Completed Today</Text>
              </Checkbox>
            </Box>
          </Modal.Body>
          <Modal.Footer justifyContent={'center'}>
            <Button
              paddingX={'20'}
              onPress={() => {
                addNewTask(
                  newTaskName,
                  taskInputs.cycleQuantity,
                  taskInputs.cycleOption,
                  getLastCompleted()
                )
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
