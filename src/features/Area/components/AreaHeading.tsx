import { HStack, Text } from 'native-base'
import { Area } from '../../../models/areaModels'
import AreaSettingsModal from './AreaSettingsModal'

function AreaHeading(props: { area: Area }) {
  return (
    <HStack
      bg={'gray.100'}
      p={'3'}
      justifyContent={'center'}
      borderStyle={'solid'}
      borderTopWidth={'1px'}
    >
      <Text fontSize={'lg'}>{props.area.name}</Text>
      <AreaSettingsModal area={props.area} />
    </HStack>
  )
}

export default AreaHeading
