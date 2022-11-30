import { Box, Text } from 'native-base'

function Header() {
  return (
    <Box alignSelf={'center'} w={'100%'} paddingY={'20px'}>
      <Text textAlign={'center'} fontSize={'xl'} fontWeight={'bold'}>
        Chore App
      </Text>
    </Box>
  )
}

export default Header
