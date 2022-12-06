import { Dayjs } from 'dayjs'
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
  CloseIcon,
  useContrastText,
} from 'native-base'
import React from 'react'
import { CycleOptions } from '../models/CycleOptions'
import { getDaysUntilDue, getDueDate } from './dateUtils'

export interface TaskButtonInfo {
  color: string
  dueText: string
  icon: JSX.Element
}

export const getTaskButtonInfo = (
  lastDone: Dayjs,
  cycleQuantity: number,
  cycleOption: CycleOptions
): TaskButtonInfo => {
  let daysUntilDue = getDaysUntilDue(
    getDueDate(lastDone, cycleQuantity, cycleOption)
  )
  return {
    color: getColor(daysUntilDue),
    dueText: getDueText(daysUntilDue),
    icon: getIcon(daysUntilDue),
  }
}

export const getColor = (daysUntilDue: number) => {
  if (daysUntilDue === 0) {
    return 'red.100'
  } else if (daysUntilDue < 0) {
    return 'red.300'
  } else {
    return 'green.200'
  }
}

export const getDueText = (daysUntilDue: number) => {
  if (daysUntilDue < -18000) {
    return 'no history'
  } else if (daysUntilDue === 0) {
    return 'due today'
  } else if (Math.abs(daysUntilDue) === 1) {
    return '1 day'
  } else {
    return Math.abs(daysUntilDue) + ' days'
  }
}

export const getIcon = (daysUntilDue: number) => {
  let c = useContrastText(getColor(daysUntilDue))
  if (daysUntilDue < -18000) {
    return <CloseIcon size='3' color={c} />
  } else if (daysUntilDue === 0) {
    return <ChevronDownIcon size='3' color={c} />
  } else if (daysUntilDue < 0) {
    return <ArrowBackIcon size='3' color={c} />
  } else {
    return <ArrowForwardIcon size='3' color={c} />
  }
}
