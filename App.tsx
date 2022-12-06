import { Box, NativeBaseProvider } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
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
          <Box
            // Not sure why the functional approach to color isn't working here
            _dark={{
              bg: 'blueGray.900',
            }}
            _light={{
              bg: 'warmGray.50',
            }}
          >
            {/* TODO: change text color */}
            <SafeAreaView>
              <Home />
            </SafeAreaView>
          </Box>
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  )
}

export default App
