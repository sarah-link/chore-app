import { Area, AreasState } from '../models/areaModels'

export const getAreas = (state: AreasState) => {
  let areas: Area[] = []
  state.areas.forEach((element) => {
    areas.push(element)
  })

  return areas
}
