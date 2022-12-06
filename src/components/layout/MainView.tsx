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
    // TODO: figure out why height can't be 100%
    // I think it has to do with the hack to avoid the cutout in App.tsx
    <ScrollView bg={getBgColorPrimary()}>
      <VStack alignItems={'center'}>
        {areas?.map((value) => (
          <AreaView key={value.id} area={value}></AreaView>
        ))}
        <AddAreaModal saveNewArea={addNewArea} />
        <Box h={'5'}></Box>
      </VStack>
    </ScrollView>
  )
}

export default MainView
