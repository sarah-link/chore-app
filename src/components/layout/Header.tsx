import { Box, HStack, Text } from 'native-base'
import React from 'react'
import { getBgColorPrimary } from '../../Theme'
import ColorModeSwitch from '../ColorModeSwitch'

function Header() {
  return (
    <HStack
      alignItems={'center'}
      justifyContent={'space-between'}
      w={'100%'}
      paddingY={'20px'}
      bg={getBgColorPrimary()}
    >
      {/* TODO: look into fixing this 
      Ask Emma about 'fixed position'
      */}
      <Box w='50px'></Box>
      <Text textAlign={'center'} fontSize={'xl'} fontWeight={'bold'}>
        Chore App
      </Text>
      <ColorModeSwitch />
    </HStack>
  )
}

export default Header
