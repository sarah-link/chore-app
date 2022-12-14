import { Box, Button, HStack, Text, useContrastText } from 'native-base'
import React, { useState } from 'react'
import { getTaskButtonInfo } from '../../../utils/taskUIUtils'
import TaskInfoModal from './TaskInfoModal'

import { Task } from '../../../models/taskModels'

export interface TaskButtonProps {
  task: Task
  areaId: string
}

function TaskButton(props: TaskButtonProps) {
  const [editModalOpen, setEditModalOpen] = useState(false)

  const closeModal = () => {
    setEditModalOpen(false)
  }

  const { color, dueText, icon } = getTaskButtonInfo(
    props.task.lastDone,
    props.task.cycleQuantity,
    props.task.cycleOption
  )

  return (
    <>
      <Button
        variant={'subtle'}
        bg={color}
        margin={'5px'}
        onPress={() => setEditModalOpen(true)}
      >
        <Box w={'100%'} alignItems={'center'}>
          <Text fontSize={'md'} color={useContrastText(color)}>
            {props.task.name}
          </Text>
        </Box>
        <HStack alignItems={'center'}>
          <Box paddingRight={1}>{icon}</Box>
          <Text color={useContrastText(color)}>{dueText}</Text>
        </HStack>
      </Button>
      <TaskInfoModal
        open={editModalOpen}
        closeModal={closeModal}
        task={props.task}
        areaId={props.areaId}
      ></TaskInfoModal>
    </>
  )
}

export default TaskButton
