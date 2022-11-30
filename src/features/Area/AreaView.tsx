import { Box } from 'native-base'
import React from 'react'
import { Area } from '../../models/areaModels'
import { getBgColorSecondary, getOutlineColor } from '../../Theme'
import TaskView from '../Task/TaskView'
import AreaHeading from './components/AreaHeading'

function AreaView(props: { area: Area }) {
  return (
    <Box
      borderRadius='10px'
      borderColor={getOutlineColor()}
      bg={getBgColorSecondary()}
      w={'95%'}
      borderWidth={1}
      m={'2'}
    >
      <AreaHeading area={props.area} />
      <TaskView area={props.area} />
    </Box>
  )
}

export default AreaView
