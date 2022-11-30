import dayjs, { Dayjs } from 'dayjs'
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
  CloseIcon,
} from 'native-base'
import React from 'react'
import { isDueToday } from './dateLogic'

export const getColor = (
  lastDone: number,
  cycleLengthDays: number,
  overdue: boolean,
  dueDateTodayDiff: number
) => {
  let lastDoneDay = dayjs.unix(lastDone)
  // TODO: also fix this, uncomment above for real data
  // let lastDone = dayjs('2022-11-00')
  let due
  let dueDate = lastDoneDay.add(cycleLengthDays, 'days')

  if (isDueToday(dueDate)) {
    return 'red.100'
  } else if (overdue) {
    return getColorOverdue(dueDateTodayDiff, cycleLengthDays)
  } else {
    return getColorNotDue(dueDateTodayDiff, cycleLengthDays)
  }
}

export const getDueText = (
  dueDate: Dayjs,
  overdue: boolean,
  dueDateTodayDiff: number
) => {
  let due = ''
  if (dueDate.unix() === 21600) {
    //due to stripping the exact time elsewhere
    due = 'No history'
  } else if (isDueToday(dueDate)) {
    due += 'today'
  } else if (dueDateTodayDiff === 1) {
    if (overdue) {
      due += 'Yesterday'
    } else {
      due += 'Tomorrow'
    }
  } else {
    if (overdue) {
      due += dueDateTodayDiff.toString() + ' days ago'
    } else {
      due += 'in ' + dueDateTodayDiff.toString() + ' days'
    }
  }
  return due
}

export const getIcon = (dueDate: Dayjs, isOverdue: boolean) => {
  if (dueDate.unix() === 21600) {
    //due to stripping the exact time elsewhere
    return <CloseIcon size='3' />
  } else if (isDueToday(dueDate)) {
    return <ChevronDownIcon size='3' />
  } else if (isOverdue) {
    return <ArrowBackIcon size='3' />
  } else {
    return <ArrowForwardIcon size='3' />
  }
}

const getColorOverdue = (daysOverdue: number, cycleLengthDays: number) => {
  // due today: light red
  // today-25% of cycle time: medium red
  // over 25%: dark red

  let factor = (daysOverdue * 1.0) / cycleLengthDays
  if (factor < 0.25) {
    return 'red.300'
  } else {
    return 'red.500'
  }
}

const getColorNotDue = (daysUntilDue: number, cycleLengthDays: number) => {
  // special case if due tomorrow
  if (daysUntilDue === 1) {
    return 'green.100'
  }

  let factor = (daysUntilDue * -1.0) / cycleLengthDays
  if (factor > 0.25) {
    return 'green.500'
  } else {
    return 'green.300'
  }
}
