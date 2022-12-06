import dayjs, { Dayjs } from 'dayjs'

export const isOverdue = (dueDate: Dayjs) => {
  // for easy hardcoding
  return !today.isBefore(dueDate)
}

export const getDueDate = (lastDone: Dayjs, cycleLength: number) => {
  return lastDone.add(cycleLength, 'days')
}

export const isDueToday = (dueDate: Dayjs) => {
  return today.diff(dueDate, 'day') === 0
}

export const stripTime = (date: Dayjs) => {
  return dayjs(date.format('YYYY-MM-DD'))
}

export const today = stripTime(dayjs())
// export const today = dayjs('2022-11-07')
