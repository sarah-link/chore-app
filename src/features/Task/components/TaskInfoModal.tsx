import { AntDesign } from '@expo/vector-icons'
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import dayjs from 'dayjs'
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
  Modal,
  Text,
  useColorModeValue,
  useContrastText,
} from 'native-base'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CycleOptions } from '../../../models/CycleOptions'
import { Task } from '../../../models/taskModels'
import { completeTask, deleteTask, editTask } from '../../../store/areasSlice'
import { getBgColorPrimary, getBgColorSecondary } from '../../../Theme'
import TaskEdit from './TaskEdit'

export interface TaskInfoModalProps {
  areaId: string
  open: boolean
  closeModal: () => void
  task: Task
}

export interface TaskInputs {
  cycleOption: CycleOptions
  cycleQuantity: number
  taskName: string
}

function TaskInfoModal(props: TaskInfoModalProps) {
  const dispatch = useDispatch()
  dayjs().format()

  // TODO: combine states or use form management library
  const [pickerOpen, setPickerOpen] = useState(false)
  const [completeDate, setCompleteDate] = useState(new Date().getTime())
  const [nameIsInvalid, setNameIsInvalid] = useState(false)
  const [taskInputs, setTaskInputs] = useState({
    cycleOption: props.task.cycleOption,
    cycleQuantity: props.task.cycleQuantity,
    taskName: props.task.name,
  })

  const closeModal = () => {
    setCompleteDate(new Date().getTime())
    setNameIsInvalid(false)
    setTaskInputs((prevState: TaskInputs) => ({
      ...prevState,
      taskName: props.task.name,
    }))
    props.closeModal()
  }

  const saveTaskComplete = () => {
    let details = {
      areaId: props.areaId,
      taskId: props.task.id,
      lastDone: dayjs(completeDate),
    }
    dispatch(completeTask(details))
    closeModal()
  }
  const saveTaskDetails = () => {
    if (validateName()) {
      let details = {
        areaId: props.areaId,
        taskId: props.task.id,
        newName: taskInputs.taskName,
        cycleQuantity: taskInputs.cycleQuantity,
        cycleOption: taskInputs.cycleOption,
      }
      dispatch(editTask(details))
      closeModal()
    }
  }

  const validateName = () => {
    const trimmedTaskName = taskInputs.taskName.trim()
    setTaskInputs((prevState: TaskInputs) => ({
      ...prevState,
      taskName: trimmedTaskName,
    }))
    const nameIsValid = trimmedTaskName !== ''
    setNameIsInvalid(!nameIsValid)

    return nameIsValid
  }

  const saveDeleteTask = () => {
    let details = {
      areaId: props.areaId,
      taskId: props.task.id,
    }
    dispatch(deleteTask(details))
  }

  const setDate = (event: DateTimePickerEvent, date: Date) => {
    setPickerOpen(false)
    if (event.type === 'set') {
      setCompleteDate(date.getTime())
    }
  }

  let bg = getBgColorSecondary()

  return (
    <Modal isOpen={props.open} onClose={() => closeModal()} safeAreaTop={true}>
      <Modal.Content
        maxWidth='350'
        marginBottom={'auto'}
        marginTop={10}
        bg={bg}
      >
        <Modal.CloseButton />
        <Modal.Header bg={bg}>{props.task.name}</Modal.Header>
        <Modal.Body>
          <Box marginBottom={4}>
            <Heading size={'sm'}>Date Completed:</Heading>
            <HStack marginBottom={4} alignItems={'center'}>
              <Text fontSize={'md'}>
                {dayjs(new Date(completeDate)).format('MMM D YYYY')}
              </Text>
              <IconButton
                marginLeft={'auto'}
                _icon={{
                  as: AntDesign,
                  name: 'calendar',
                  color: useContrastText(getBgColorPrimary()),
                }}
                onPress={() => {
                  setPickerOpen(true)
                }}
              />
              {pickerOpen && (
                <RNDateTimePicker
                  value={new Date()}
                  onChange={(event, value) => {
                    if (value) {
                      setDate(event, value)
                    }
                  }}
                />
              )}
            </HStack>
            <Button
              bg={'green.500'}
              onPress={() => {
                saveTaskComplete()
              }}
            >
              {'Mark Complete'}
            </Button>
          </Box>
          <Divider my={4} />
          <TaskEdit
            task={props.task}
            taskInputs={taskInputs}
            setTaskInputs={setTaskInputs}
            delete={saveDeleteTask}
            nameIsInvalid={nameIsInvalid}
          />
        </Modal.Body>
        <Modal.Footer justifyContent={'center'} bg={bg}>
          <Button
            width={24}
            _text={{
              color: useColorModeValue('black', 'white'),
            }}
            _dark={{
              bg: 'gray.500',
            }}
            _light={{
              bg: 'gray.300',
            }}
            variant={'subtle'}
            onPress={() => {
              closeModal()
            }}
          >
            Cancel
          </Button>
          <Button
            width={24}
            marginLeft={'auto'}
            onPress={() => {
              saveTaskDetails()
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default TaskInfoModal
