import { Box, Switch, useColorMode } from 'native-base'
import React, { useState } from 'react'

function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
    toggleColorMode()
  }

  return (
    <Box paddingRight={'5'} position={'absolute'} right={'0'}>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </Box>
  )
}

export default ColorModeSwitch
