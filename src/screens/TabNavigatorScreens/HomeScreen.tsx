import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store';
import {getGoods, selectGoods} from '../../store/slices/GoodsSlice';
import {useEffect, useState} from 'react';
import {Box, FlatList, Image, Pressable, ScrollView, Text} from 'native-base';
import {colors} from '../../theme/styledComponentsTheme';
import ScreenHeader from '../../components/ScreenHeader';
import {currentUserAtom} from '../../utils/atoms/currentUserAtom';
import {useAtomValue, useSetAtom} from 'jotai';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../../navigator/MainNavigator';
import MasonryList from '@react-native-seoul/masonry-list';
import GoodItem from '../../components/GoodItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface GoodItemProps {
  title: string;
  image: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const {bottom, top} = useSafeAreaInsets();
  const paddingStyle = {paddingTop: top + 40, paddingBottom: bottom};
  const dispatch = useAppDispatch();
  const [data, setData] = useState<{products?: any[]}>({});

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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <ScreenHeader
          title="Товары"
          onPress={() => navigation.navigate('Cart')}
        />
        <Box flex={1} pr={'16px'} pl={'16px'} style={paddingStyle}>
          {data.products && data.products.length > 0 ? (
            <MasonryList
              data={data.products}
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
