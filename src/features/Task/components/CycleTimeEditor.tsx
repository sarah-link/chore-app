import { CheckIcon, FormControl, HStack, Input, Select } from 'native-base'
import React from 'react'
import { cycleOptions } from '../../../store/areasSlice'
import { TaskInputs } from './TaskInfoModal'

export interface CycleTimeEditorProps {
  taskInputs: TaskInputs
  setTaskInputs: any
}

function CycleTimeEditor(props: CycleTimeEditorProps) {
  const mapTimes = (time: string) => {
    switch (time) {
      case 'Years':
        return cycleOptions.Years
      case 'Months':
        return cycleOptions.Months
      case 'Weeks':
        return cycleOptions.Weeks
      default:
        return cycleOptions.Days
    }
  }

  const changeCycleTime = (time: string) => {
    props.setTaskInputs((prevState: TaskInputs) => ({
      ...prevState,
      cycleTime: time,
    }))
  }

  const changeCycleOption = (option: string) => {
    let t = mapTimes(option)
    props.setTaskInputs((prevState: TaskInputs) => ({
      ...prevState,
      cycleOption: t,
    }))
  }

  return (
    <>
      <FormControl.Label>Due every:</FormControl.Label>
      <HStack alignItems={'flex-end'}>
        <Input
          h={'12'}
          textAlign={'center'}
          placeholder={props.taskInputs.cycleTime}
          w='25%'
          value={String(props.taskInputs.cycleTime)}
          onChangeText={(newValue) => {
            if (newValue == '') {
              changeCycleTime(newValue)
            } else {
              let num = parseInt(newValue)
              if (num !== NaN) {
                changeCycleTime(newValue)
              }
            }
          }}
        />
        <Select
          h={'12'}
          marginLeft={'6'}
          selectedValue={cycleOptions[props.taskInputs.cycleOption]}
          minWidth='120'
          accessibilityLabel='Choose Service'
          placeholder='Choose Service'
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size='5' />,
          }}
          mt={1}
          onValueChange={(itemValue) => changeCycleOption(itemValue)}
        >
          <Select.Item label='Days' value={cycleOptions[cycleOptions.Days]} />
          <Select.Item label='Weeks' value={cycleOptions[cycleOptions.Weeks]} />
          <Select.Item
            label='Months'
            value={cycleOptions[cycleOptions.Months]}
          />
          <Select.Item label='Years' value={cycleOptions[cycleOptions.Years]} />
        </Select>
      </HStack>
    </>
  )
}

export default CycleTimeEditor
