import { HStack, Text } from 'native-base'
import React from 'react'
import { getBgColorPrimary } from '../../Theme'
import ColorModeSwitch from '../ColorModeSwitch'

function Header() {
  return (
    <HStack
      alignItems={'center'}
      justifyContent={'center'}
      w={'100%'}
      paddingY={'20px'}
      bg={getBgColorPrimary()}
    >
      <Text textAlign={'center'} fontSize={'xl'} fontWeight={'bold'}>
        Chore App
      </Text>
      <ColorModeSwitch />
    </HStack>
  )
}

export default Header
