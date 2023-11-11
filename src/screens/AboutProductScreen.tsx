import {
  Box,
  HStack,
  Hidden,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import ScreenHeader from '../components/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigator/MainNavigator';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Dimensions} from 'react-native';
import {colors} from '../theme/styledComponentsTheme';
import CustomButton from '../components/CustomButton';

const AboutProductScreen = ({route}: any) => {
  const {width} = Dimensions.get('screen');
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const data = route.params;

  console.log(data);

  return (
    <Box safeAreaTop>
      <Box pl={'16px'} pr={'16px'}>
        <ScreenHeader onPress={() => navigation.navigate('Cart')} />
      </Box>
      <ScrollView pl={'5px'} pr={'5px'}>
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
          <Text fontWeight={'bold'}>{data.description}</Text>
        </VStack>
        <HStack mt={2} mb={10} justifyContent={'space-between'} pl={4} pr={4}>
          <Text fontWeight={'bold'}>Цена: </Text>
          <Text fontWeight={'bold'} fontSize={20} color={colors.red}>
            {data.price} $
          </Text>
        </HStack>
        <CustomButton
          style={{backgroundColor: '#3F92FF'}}
          name="Добавить в корзину"
        />
      </ScrollView>
    </Box>
  );
};

export default AboutProductScreen;
