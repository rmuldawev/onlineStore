import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigator/MainNavigator';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
