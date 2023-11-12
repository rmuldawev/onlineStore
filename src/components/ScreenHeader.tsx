import {Center, HStack, Image, Pressable, Text} from 'native-base';
import {colors} from '../theme/styledComponentsTheme';
import {FC} from 'react';
import Cart from '../assets/icons/Cart';
import ArrowLeft from '../assets/icons/ArrowLeft';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigator/MainNavigator';
import {useAppSelector} from '../store';
import {selectCart} from '../store/slices/CartSlice';

interface ScreenHeaderProps {
  onPress?: () => void;
  title?: string;
}

const ScreenHeader: FC<ScreenHeaderProps> = ({onPress, title}) => {
  const cart = useAppSelector(selectCart);
  const navigation = useNavigation<AppStackScreenProps['navigation']>();

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'}>
      {title ? (
        <Text>{title}</Text>
      ) : (
        <Pressable onPress={() => navigation.goBack()} w={10}>
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
        <Text bottom={3} position={'absolute'}>
          {cart.cart.length > 0 && cart.cart.length}
        </Text>
      </Pressable>
    </HStack>
  );
};

export default ScreenHeader;
