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
  useContrastText,
} from 'native-base'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Task } from '../../../models/taskModels'
import {
  completeTask,
  cycleOptions,
  deleteTask,
  editTask,
  getLengthInDays,
} from '../../../store/areasSlice'
import { getBgColorPrimary, getBgColorSecondary } from '../../../Theme'
import TaskEdit from './TaskEdit'

export interface TaskInfoModalProps {
  areaId: string
  open: boolean
  closeModal: () => void
  task: Task
}

export interface TaskInputs {
  cycleOption: cycleOptions
  cycleTime: string
  taskName: string
}

function TaskInfoModal(props: TaskInfoModalProps) {
  const dispatch = useDispatch()
  dayjs().format()

  const [pickerOpen, setPickerOpen] = useState(false)
  const [completeDate, setCompleteDate] = useState(new Date().getTime())
  const [taskInputs, setTaskInputs] = useState({
    cycleOption: cycleOptions.Days,
    cycleTime: String(props.task.cycleLengthDays),
    taskName: props.task.name,
  })

  const closeModal = () => {
    setCompleteDate(new Date().getTime())
    props.closeModal()
  }

  const saveTaskComplete = () => {
    let details = {
      areaId: props.areaId,
      taskId: props.task.id,
      // due to some discrpancy between dayjs (unix time in seconds) and normal-js (unix time in milliseconds)
      lastDone: Math.floor(completeDate / 1000),
    }
    dispatch(completeTask(details))
    closeModal()
  }

  const saveTaskDetails = () => {
    let details = {
      areaId: props.areaId,
      taskId: props.task.id,
      newName: taskInputs.taskName,
      cycleLengthDays: getLengthInDays(
        taskInputs.cycleOption,
        taskInputs.cycleTime
      ),
    }
    dispatch(editTask(details))
    closeModal()
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
              ></IconButton>
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
          <Divider my={4}></Divider>
          <TaskEdit
            task={props.task}
            taskInputs={taskInputs}
            setTaskInputs={setTaskInputs}
            delete={saveDeleteTask}
          ></TaskEdit>
        </Modal.Body>
        <Modal.Footer justifyContent={'center'} bg={bg}>
          <Button
            paddingX={'20'}
            colorScheme={'gray'}
            variant={'subtle'}
            onPress={() => {
              closeModal()
            }}
          >
            Cancel
          </Button>
          <Button
            paddingX={'20'}
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
