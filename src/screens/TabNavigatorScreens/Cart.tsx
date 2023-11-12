// Cart.tsx
import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Pressable,
  ScrollView,
} from 'native-base';
import ScreenHeader from '../../components/ScreenHeader';
import {useAppDispatch, useAppSelector} from '../../store';
import {
  clearCart,
  removeFromCart,
  selectCart,
} from '../../store/slices/CartSlice';
import CartItem from '../../components/CartItem';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../../navigator/MainNavigator';
import BuyButton from '../../components/ByuButton';
import ClearCartButton from '../../components/ClearCartButton';

const Cart = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCart);
  const navigation = useNavigation<AppStackScreenProps['navigation']>();

  return (
    <>
      <ScreenHeader />

      <Box safeAreaTop flex={1} pl={'16px'} pr={'16px'} mt={'40px'}>
        <HStack justifyContent={'space-between'} mb={2} mt={2}>
          <ClearCartButton
            onPress={() => [dispatch(clearCart()), navigation.goBack()]}
          />
          <BuyButton
            text="Купить"
            OnPress={() => navigation.navigate('ShopingBag', data.cart)}
          />
        </HStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          {data.cart &&
            data.cart.map((e: any, index: number) => {
              return (
                <CartItem
                  rating={e.rating}
                  key={index.toString()}
                  title={e.title}
                  price={e.price}
                  thumbnail={e.thumbnail}
                  id={e.id}
                  index={index.toString()}
                />
              );
            })}
        </ScrollView>
      </Box>
    </>
  );
};

export default Cart;
