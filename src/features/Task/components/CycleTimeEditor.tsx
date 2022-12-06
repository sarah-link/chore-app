import { CheckIcon, FormControl, HStack, Input, Select } from 'native-base'
import React from 'react'
import { CycleOptions } from '../../../models/CycleOptions'
import { stringToCycleOption } from '../../../utils/dateUtils'
import { TaskInputs } from './TaskInfoModal'

export interface CycleTimeEditorProps {
  taskInputs: TaskInputs
  setTaskInputs: any
}

function CycleTimeEditor(props: CycleTimeEditorProps) {
  const changeCycleQuantity = (quantity: string) => {
    if (parseInt(quantity) !== NaN) {
      props.setTaskInputs((prevState: TaskInputs) => ({
        ...prevState,
        cycleQuantity: quantity,
      }))
    }
  }

  const changeCycleOption = (option: string) => {
    let t = stringToCycleOption(option)
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
          keyboardType={'numeric'}
          textAlign={'center'}
          placeholder={props.taskInputs.cycleQuantity.toString()}
          w='25%'
          value={String(props.taskInputs.cycleQuantity)}
          onChangeText={(newValue) => {
            changeCycleQuantity(newValue)
          }}
        />
        <Select
          h={'12'}
          marginLeft={'4'}
          selectedValue={CycleOptions[props.taskInputs.cycleOption]}
          minWidth='120'
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size='5' />,
          }}
          mt={1}
          onValueChange={(itemValue) => changeCycleOption(itemValue)}
        >
          <Select.Item label='Days' value={CycleOptions[CycleOptions.Days]} />
          <Select.Item label='Weeks' value={CycleOptions[CycleOptions.Weeks]} />
          <Select.Item
            label='Months'
            value={CycleOptions[CycleOptions.Months]}
          />
          <Select.Item label='Years' value={CycleOptions[CycleOptions.Years]} />
        </Select>
      </HStack>
    </>
  )
}

export default CycleTimeEditor
