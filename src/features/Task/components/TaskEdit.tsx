import { Entypo } from '@expo/vector-icons'
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  useContrastText,
  WarningOutlineIcon,
} from 'native-base'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import DeleteConfirmation from '../../../components/DeleteConfirmation'
import { Task } from '../../../models/taskModels'
import { getBgColorPrimary } from '../../../Theme'
import CycleTimeEditor from './CycleTimeEditor'
import { TaskInputs } from './TaskInfoModal'

export interface TaskEditProps {
  task: Task
  taskInputs: TaskInputs
  setTaskInputs: any
  delete: () => void
  nameIsInvalid: boolean
}

function TaskEdit(props: TaskEditProps) {
  const [detailEditOpen, setDetailEditOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const changeTaskName = (name: string) => {
    props.setTaskInputs((prevState: TaskInputs) => ({
      ...prevState,
      taskName: name,
    }))
  }

  let buttonType = detailEditOpen ? 'chevron-up' : 'chevron-down'

  return (
    <>
      <DeleteConfirmation
        isOpen={deleteConfirmOpen}
        setIsOpen={setDeleteConfirmOpen}
        name={props.task.name}
        onConfirm={props.delete}
      />
      <Pressable onPress={() => setDetailEditOpen(!detailEditOpen)}>
        <HStack justifyContent={'space-between'}>
          <Heading size={'sm'}>Edit Details</Heading>
          <Icon
            as={Entypo}
            name={buttonType}
            size='md'
            color={useContrastText(getBgColorPrimary())}
          />
        </HStack>
      </Pressable>
      {detailEditOpen && (
        <FormControl isInvalid={props.nameIsInvalid}>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            value={props.taskInputs.taskName}
            onChangeText={(newName) => changeTaskName(newName)}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
            Task name cannot be blank.
          </FormControl.ErrorMessage>
          <CycleTimeEditor
            taskInputs={props.taskInputs}
            setTaskInputs={props.setTaskInputs}
          />
          <Box pt={6}>
            <Button
              _dark={{
                bg: 'danger.700',
              }}
              _light={{
                bg: 'danger.500',
              }}
              color={'white'}
              onPress={() => setDeleteConfirmOpen(true)}
            >
              Delete Task
            </Button>
          </Box>
        </FormControl>
      )}
    </>
  )
}

export default TaskEdit
