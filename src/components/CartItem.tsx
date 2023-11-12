import {HStack, Image, VStack, Text, Pressable} from 'native-base';
import {FC} from 'react';
//theme
import {colors} from '../theme/styledComponentsTheme';
//store
import {removeFromCart} from '../store/slices/CartSlice';
import {useAppDispatch} from '../store';

interface CartItemProps {
  index: string;
  thumbnail: string;
  title: string;
  price: string;
  id: number;
  rating: string;
}

const CartItem: FC<CartItemProps> = ({
  index,
  title,
  thumbnail,
  price,
  id,
  rating,
}) => {
  const dispatch = useAppDispatch();
  return (
    <HStack
      key={index}
      borderRadius={'8px'}
      borderWidth={0.5}
      p={1}
      borderColor={colors.gray}
      mb={5}>
      <Image
        resizeMode="stretch"
        h={'100px'}
        w={'150px'}
        source={{uri: `${thumbnail}`}}
        alt={title}
      />
      <VStack p={2}>
        <Text>{title}</Text>
        <Text>Рейтинг: {rating}</Text>
        <Text>Цена: $ {price}</Text>
        <Pressable
          mt={1}
          ml={10}
          alignItems={'center'}
          w={140}
          onPress={() => dispatch(removeFromCart(id))}
          bg={'red.500'}
          borderRadius={'4px'}
          p={'2px'}>
          <Text fontSize={12}>Удалить из корзины</Text>
        </Pressable>
      </VStack>
    </HStack>
  );
};

export default CartItem;
