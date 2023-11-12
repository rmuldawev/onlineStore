import {Box, Image, Text, VStack} from 'native-base';
import {FC} from 'react';
import {ImageBackground} from 'react-native';
import {colors} from '../theme/styledComponentsTheme';

interface GoodItemProps {
  image: string;
  title: string;
  price: string;
  rating: string;
}

const GoodItem: FC<GoodItemProps> = ({image, title, price, rating}) => {
  return (
    <VStack m={2} w={'164px'} bg={colors.base.white} borderRadius={'8px'}>
      <Image
        borderRadius={'8px'}
        resizeMode="stretch"
        w={'100%'}
        h={'180px'}
        source={{uri: `${image}`}}
        alt={title}
      />
      <Text>{title}</Text>
      <Text>Цена: {price}$</Text>
      <Text>Рейтинг: {rating}</Text>
    </VStack>
  );
};

export default GoodItem;
