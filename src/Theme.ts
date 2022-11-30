import { extendTheme, useColorModeValue } from 'native-base'

const theme = extendTheme({
  components: {
    // Heading: {
    //   baseStyle: (props: any) => {
    //     return {
    //       _light: { color: 'red.500' },
    //       _dark: { color: 'blue.300' },
    //       backgroundColor: 'red.500',
    //     }
    //   },
    // },
  },
})

export const getBgColorPrimary = () => {
  return useColorModeValue('warmGray.50', 'blueGray.900')
}

export const getBgColorSecondary = () => {
  return useColorModeValue('warmGray.100', 'blueGray.800')
}

export const getOutlineColor = () => {
  return useColorModeValue('warmGray.200', 'blueGray.700')
}

export default theme
