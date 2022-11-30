import { VStack } from 'native-base'
import { LogBox } from 'react-native'
import Header from './layout/Header'
import MainView from './layout/MainView'

// TODO: see if this gets fixed
// also probably find a better place for it
LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
])

function Home() {
  return (
    <VStack>
      <Header />
      <MainView />
    </VStack>
  )
}

export default Home
