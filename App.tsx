import { NativeBaseProvider, View } from 'native-base'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Home from './src/components/Home'
import { persistor, store } from './src/store/reduxStore'
import theme from './src/Theme'

function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <PersistGate persistor={persistor}>
          {/* TODO: find a better way to avoid the top bar */}
          <View bg={'gray'} paddingTop={'45px'}>
            <Home />
          </View>
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  )
}

export default App
