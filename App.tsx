import { StyleSheet } from "react-native";
import Home from "./src/components/Home";
import { NativeBaseProvider, Box, View } from "native-base";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/reduxStore";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <PersistGate persistor={persistor}>
          {/* TODO: find a better way to avoid the top bar */}
          <View bg={"gray"} paddingTop={"45px"}>
            <Home />
          </View>
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
