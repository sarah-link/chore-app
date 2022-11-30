import { Box, Switch, useColorMode, useColorModeValue } from 'native-base'
import React, { useState } from 'react'

function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode()
  const text = useColorModeValue('Light', 'Dark')
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
    toggleColorMode()
  }

  return (
    <Box paddingRight={'5'}>
      <Switch onValueChange={toggleSwitch} value={isEnabled}></Switch>
    </Box>
  )
}

export default ColorModeSwitch
