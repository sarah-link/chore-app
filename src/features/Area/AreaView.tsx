import { VStack } from 'native-base'
import React from 'react'
import { Area } from '../../models/areaModels'
import TaskView from '../Task/TaskView'
import AreaHeading from './components/AreaHeading'

function AreaView(props: { area: Area }) {
  return (
    <VStack>
      <AreaHeading area={props.area} />
      <TaskView area={props.area} />
    </VStack>
  )
}

export default AreaView
