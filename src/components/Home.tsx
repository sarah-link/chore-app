import { VStack } from 'native-base'
import Header from './layout/Header'
import MainView from './layout/MainView'

function Home() {
  return (
    <VStack>
      <Header />
      <MainView />
    </VStack>
  )
}

export default Home
