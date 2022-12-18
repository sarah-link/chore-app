import { Box, ScrollView, VStack } from 'native-base'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AreaView from '../../features/Area/AreaView'
import AddAreaModal from '../../features/Area/components/AddAreaModal'
import { getAreas } from '../../store/areas'
import { addArea } from '../../store/areasSlice'
import { getBgColorPrimary } from '../../Theme'

function MainView() {
  const dispatch = useDispatch()
  const areas = useSelector(getAreas)

  const addNewArea = (name: string) => {
    dispatch(addArea(name))
  }

  return (
    <ScrollView bg={getBgColorPrimary()}>
      <VStack alignItems={'center'}>
        {areas?.map((value) => (
          <AreaView key={value.id} area={value} />
        ))}
        <AddAreaModal saveNewArea={addNewArea} />
        <Box h={'5'} />
      </VStack>
    </ScrollView>
  )
}

export default MainView
