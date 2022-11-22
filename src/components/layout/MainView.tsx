import { VStack } from 'native-base'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AreaView from '../../features/Area/AreaView'
import AddAreaModal from '../../features/Area/components/AddAreaModal'
import { getAreas } from '../../store/areas'
import { addArea } from '../../store/areasSlice'

function MainView() {
  const dispatch = useDispatch()
  const areas = useSelector(getAreas)

  const addNewArea = (name: string) => {
    dispatch(addArea(name))
  }

  return (
    <VStack>
      {areas?.map((value) => (
        <AreaView key={value.id} area={value}></AreaView>
      ))}
      <AddAreaModal saveNewArea={addNewArea} />
    </VStack>
  )
}

export default MainView
