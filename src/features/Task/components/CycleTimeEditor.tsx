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
    props.setTaskInputs((prevState: TaskInputs) => ({
      ...prevState,
      cycleQuantity: quantity,
    }))
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
      <FormControl.Label>Do every:</FormControl.Label>
      <HStack alignItems={'flex-end'}>
        <Input
          h={'12'}
          w={'25%'}
          keyboardType={'numeric'}
          textAlign={'center'}
          placeholder={props.taskInputs.cycleQuantity.toString()}
          value={String(props.taskInputs.cycleQuantity)}
          onChangeText={(newValue) => {
            changeCycleQuantity(newValue)
          }}
        />
        <Select
          h={'12'}
          minWidth={'120'}
          mt={1}
          marginLeft={'4'}
          selectedValue={CycleOptions[props.taskInputs.cycleOption]}
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size='5' />,
          }}
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
