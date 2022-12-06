import { Box, Button, HStack, Text, useContrastText } from 'native-base'
import React, { useState } from 'react'
import { getColor, getDueText, getIcon } from '../../../utils/taskUIUtils'
import TaskInfoModal from './TaskInfoModal'

import dayjs from 'dayjs'
import { Task } from '../../../models/taskModels'
import {
  getDueDate,
  isOverdue,
  stripTime,
  today,
} from '../../../utils/dateUtils'

export interface TaskButtonProps {
  task: Task
  areaId: string
}

function TaskButton(props: TaskButtonProps) {
  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)
  const dueDate = getDueDate(
    stripTime(dayjs.unix(props.task.lastDone)),
    props.task.cycleLengthDays
  )
  const [editModalOpen, setEditModalOpen] = useState(false)

  const closeModal = () => {
    setEditModalOpen(false)
  }

  let overdue = isOverdue(dueDate)
  let dueDateTodayDiff = Math.abs(today.diff(dueDate, 'day'))
  let bgColor = getColor(
    props.task.lastDone,
    props.task.cycleLengthDays,
    overdue,
    dueDateTodayDiff
  )
  let icon = getIcon(dueDate, overdue, bgColor)
  let dueText = (
    <Text fontSize={'xs'} color={useContrastText(bgColor)}>
      {getDueText(dueDate, overdue, dueDateTodayDiff)}
    </Text>
  )

  return (
    <>
      <Button
        variant={'subtle'}
        bg={bgColor}
        margin={'5px'}
        onPress={() => setEditModalOpen(true)}
      >
        <Box w={'100%'} alignItems={'center'}>
          <Text fontSize={'md'} color={useContrastText(bgColor)}>
            {props.task.name}
          </Text>
        </Box>
        <HStack alignItems={'center'}>
          <Box paddingRight={1}>{icon}</Box>
          {dueText}
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
