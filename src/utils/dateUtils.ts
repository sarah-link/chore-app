import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import { CycleOptions } from '../models/CycleOptions'

export const stringToCycleOption = (time: string) => {
  switch (time) {
    case 'Years':
      return CycleOptions.Years
    case 'Months':
      return CycleOptions.Months
    case 'Weeks':
      return CycleOptions.Weeks
    default:
      return CycleOptions.Days
  }
}

export const getDueDate = (
  lastDone: Dayjs,
  cycleQuantity: number,
  cycleOption: CycleOptions
) => {
  let dayjsTimeOption: ManipulateType
  switch (cycleOption) {
    case CycleOptions.Years:
      dayjsTimeOption = 'year'
      break
    case CycleOptions.Months:
      dayjsTimeOption = 'month'
      break
    case CycleOptions.Weeks:
      dayjsTimeOption = 'week'
      break
    default:
      dayjsTimeOption = 'day'
  }

  // TODO: figure out why dayjs doesn't like using lastDone directly
  return normalizeDate(dayjs(lastDone).add(cycleQuantity, dayjsTimeOption))
}

export const getDaysUntilDue = (dueDate: Dayjs) => {
  // overdue is negative, due in the future positive, due today is 0
  let hours = dueDate.diff(today, 'hour')
  return Math.floor(hours / 24)
}

// Makes everything happen at the same time of the day, to avoid to-the-second due dates
export const normalizeDate = (date: Dayjs) => {
  return dayjs(date.format('YYYY-MM-DD'))
}

export const today = normalizeDate(dayjs())
// export const today = dayjs('2022-11-07')
