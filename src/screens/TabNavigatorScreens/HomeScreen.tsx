import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useAppDispatch} from '../../store';
import {getGoods} from '../../store/slices/GoodsSlice';
import {useEffect, useState} from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import ScreenHeader from '../../components/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../../navigator/MainNavigator';
import MasonryList from '@react-native-seoul/masonry-list';
import GoodItem from '../../components/GoodItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

const HomeScreen = () => {
  const categories = [
    'all',
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
  ];

  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const {bottom, top} = useSafeAreaInsets();
  const paddingStyle = {paddingTop: top + 40, paddingBottom: bottom};
  const dispatch = useAppDispatch();
  const [data, setData] = useState<{products?: any[]}>({});
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [currCategory, setCurrCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getGoods());
        setData(res.payload);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredProducts = currCategory
    ? data.products?.filter((product: any) => product.category === currCategory)
    : data.products;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <ScreenHeader
          title="Товары"
          onPress={() => navigation.navigate('Cart')}
        />
        <Box flex={1} pr={'16px'} pl={'16px'} style={paddingStyle}>
          <HStack justifyContent={'space-between'}>
            <Text>Категории:</Text>
            <Pressable onPress={() => setIsVisibleModal(true)}>
              <Text>{currCategory}</Text>
            </Pressable>
            <Modal
              isVisible={isVisibleModal}
              onBackdropPress={() => setIsVisibleModal(false)}>
              {categories.map((e, i) => {
                return (
                  <Pressable
                    onPress={() => [
                      setCurrCategory(e),
                      setIsVisibleModal(false),
                    ]}
                    bg={'white'}>
                    <Text key={i}>{e}</Text>
                  </Pressable>
                );
              })}
            </Modal>
          </HStack>
          {data.products && data.products.length > 0 ? (
            <MasonryList
              data={currCategory === 'all' ? data.products : filteredProducts}
              keyExtractor={item => item.id}
              numColumns={2}
              renderItem={({item}: any) => {
                return (
                  <Pressable
                    onPress={() => navigation.navigate('AboutProduct', item)}>
                    <GoodItem
                      rating={item.rating}
                      price={item.price}
                      image={item.thumbnail}
                      title={item.title}
                    />
                  </Pressable>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text alignSelf={'center'} mt={'20px'}>
              Загружаем товары..
            </Text>
          )}
        </Box>
      </>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
