import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigator/MainNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
