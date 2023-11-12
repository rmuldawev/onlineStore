import {Box, HStack, Image, ScrollView, Text, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigator/MainNavigator';
import {Dimensions} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
//components
import ScreenHeader from '../components/ScreenHeader';
import CustomButton from '../components/CustomButton';
//theme
import {colors} from '../theme/styledComponentsTheme';
//redux
import {useAppDispatch} from '../store';
import {addToCart} from '../store/slices/CartSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AboutProductScreen = ({route}: any) => {
  const {bottom, top} = useSafeAreaInsets();
  const paddingStyle = {paddingTop: top + 40, paddingBottom: bottom};
  const dispatch = useAppDispatch();
  const {width} = Dimensions.get('screen');
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const data = route.params;

  const handleAddToCart = () => {
    dispatch(addToCart(data));
  };

  return (
    <>
      <ScreenHeader onPress={() => navigation.navigate('Cart')} />
      <ScrollView
        style={paddingStyle}
        pl={'5px'}
        pr={'5px'}
        showsVerticalScrollIndicator={false}>
        <SwiperFlatList
          horizontal
          autoplay
          autoplayLoop
          data={data.images && data.images}
          paginationActiveColor={colors.red}
          paginationDefaultColor={colors.gray}
          renderItem={image => {
            return (
              <Box>
                <Image
                  alignSelf={'center'}
                  overflow={'hidden'}
                  resizeMode="stretch"
                  h={300}
                  width={width}
                  bg={'black'}
                  source={{uri: `${image.item}`}}
                  alt={image.index.toString()}
                />
              </Box>
            );
          }}
        />
        <VStack w={width} pl={4} pr={4} mt={10}>
          <Text fontWeight={'bold'}>Бренд: {data.brand}</Text>
          <Text fontWeight={'bold'} mt={2}>
            Название товара: {data.title}
          </Text>
          <Text fontWeight={'bold'} mt={2}>
            Описание товара:
          </Text>
          <Text fontWeight={'medium'}>{data.description}</Text>
          <Text mt={2} fontWeight={'bold'}>
            Количество: {data.stock} шт
          </Text>
        </VStack>
        <HStack mt={2} mb={10} justifyContent={'space-between'} pl={4} pr={4}>
          <Text fontWeight={'bold'}>Цена: </Text>
          <Text fontWeight={'bold'} fontSize={20} color={colors.red}>
            {data.price} $
          </Text>
        </HStack>
        <CustomButton
          onPress={handleAddToCart}
          style={{backgroundColor: '#3F92FF'}}
          name="Добавить в корзину"
        />
      </ScrollView>
    </>
  );
};

export default AboutProductScreen;
