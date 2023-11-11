import {Box, ScrollView, Text} from 'native-base';
import ScreenHeader from '../components/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigator/MainNavigator';
import Carousel from 'react-native-reanimated-carousel';

const AboutProductScreen = ({route}: any) => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const data = route.params;

  console.log(data);

  return (
    <Box safeAreaTop pl={'16px'} pr={'16px'}>
      <ScreenHeader onPress={() => navigation.navigate('Cart')} />
    </Box>
  );
};

export default AboutProductScreen;
