import { Box, Text } from 'native-base'

function Header() {
  return (
    <Box alignSelf={'center'} bg={'gray.200'} w={'100%'} paddingY={'20px'}>
      <Text textAlign={'center'} fontSize={'xl'} fontWeight={'bold'}>
        Chore App
      </Text>
    </Box>
  )
}

export default Header
