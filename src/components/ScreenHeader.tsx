import {Center, HStack, Image, Pressable, Text} from 'native-base';
import {colors} from '../theme/styledComponentsTheme';
import {FC} from 'react';
import Cart from '../assets/icons/Cart';
import ArrowLeft from '../assets/icons/ArrowLeft';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigator/MainNavigator';

interface ScreenHeaderProps {
  onPress?: () => void;
  title?: string;
}

const ScreenHeader: FC<ScreenHeaderProps> = ({onPress, title}) => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'}>
      {title ? (
        <Text>{title}</Text>
      ) : (
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft />
        </Pressable>
      )}
      <Pressable
        alignItems={'center'}
        justifyContent={'center'}
        onPress={onPress}
        h={'40px'}
        w={'40px'}>
        <Cart />
      </Pressable>
    </HStack>
  );
};

export default ScreenHeader;
