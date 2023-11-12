// import {Center, HStack, Image, Pressable, Text} from 'native-base';
// import {colors} from '../theme/styledComponentsTheme';
// import {FC, useEffect, useState} from 'react';
// import Cart from '../assets/icons/Cart';
// import ArrowLeft from '../assets/icons/ArrowLeft';
// import {useNavigation} from '@react-navigation/native';
// import {AppStackScreenProps} from '../navigator/MainNavigator';
// import {useAppDispatch, useAppSelector} from '../store';
// import {selectCart} from '../store/slices/CartSlice';
// import TextInput from './TextInput/TextInput';
// import {FormProvider, useForm} from 'react-hook-form';
// import SearchInput from './SearchInput';
// import {searchProducts} from '../store/slices/SearchSlice';
// import debounce from 'lodash.debounce';

// interface ScreenHeaderProps {
//   onPress?: () => void;
//   title?: string;
// }

// const ScreenHeader: FC<ScreenHeaderProps> = ({onPress, title}) => {
//   const cart = useAppSelector(selectCart);
//   const navigation = useNavigation<AppStackScreenProps['navigation']>();
//   const [searchData, setSearchData] = useState<string>('');
//   const dispatch = useAppDispatch();
//   const methods = useForm({
//     mode: 'onChange',
//   });

//   const {
//     handleSubmit,
//     formState: {isValid, errors},
//     getValues,
//   } = methods;

//   const debouncedSearch = debounce(() => {
//     const data = getValues();
//     setSearchData(data.search);

//     console.log('data', typeof data.search);
//     dispatch(searchProducts(data.search));
//   }, 1000);

//   useEffect(() => {
//     debouncedSearch();
//   }, [searchData]);

//   return (
//     <FormProvider {...methods}>
//       <HStack justifyContent={'space-between'} alignItems={'center'}>
//         {title ? (
//           <Text>{title}</Text>
//         ) : (
//           <Pressable onPress={() => navigation.goBack()} w={10}>
//             <ArrowLeft />
//           </Pressable>
//         )}
//         <SearchInput name="search" />
//         <Pressable
//           alignItems={'center'}
//           justifyContent={'center'}
//           onPress={onPress}
//           h={'40px'}
//           w={'40px'}>
//           <Cart />
//           <Text bottom={3} position={'absolute'}>
//             {cart.cart.length > 0 && cart.cart.length}
//           </Text>
//         </Pressable>
//       </HStack>
//     </FormProvider>
//   );
// };

// export default ScreenHeader;

// ScreenHeader.tsx

import {Box, FlatList, HStack, Pressable, Text} from 'native-base';
import {FC, useEffect, useState} from 'react';
import Cart from '../assets/icons/Cart';
import ArrowLeft from '../assets/icons/ArrowLeft';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigator/MainNavigator';
import {useAppDispatch, useAppSelector} from '../store';
import {selectCart} from '../store/slices/CartSlice';
import {FormProvider, useForm} from 'react-hook-form';
import SearchInput from './SearchInput';
import {
  Product,
  searchProducts,
  selectProducts,
} from '../store/slices/SearchSlice';
import debounce from 'lodash.debounce';
import Modal from 'react-native-modal';

interface ScreenHeaderProps {
  onPress?: () => void;
  title?: string;
}

const ScreenHeader: FC<ScreenHeaderProps> = ({onPress, title}) => {
  const cart = useAppSelector(selectCart);
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const [searchData, setSearchData] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const selectData: any = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const methods = useForm({
    mode: 'onChange',
  });

  const debouncedSearch = debounce((text: string) => {
    setSearchData(text);
    setIsVisible(true);
    dispatch(searchProducts(text));
  }, 1500);

  const handleSearchInputChange = (text: string) => {
    if (text.length > 0) {
      debouncedSearch(text);
    } else {
      debouncedSearch('');
      setSearchData('');
    }
  };

  useEffect(() => {}, [searchData]);

  return (
    <Box position={'absolute'} zIndex={10} safeAreaTop left={'25px'}>
      <FormProvider {...methods}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          {title ? (
            <Text>{title}</Text>
          ) : (
            <Pressable onPress={() => navigation.goBack()} w={10}>
              <ArrowLeft />
            </Pressable>
          )}
          <SearchInput name="search" onChangeText={handleSearchInputChange} />
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
        <Box bg={'white'} w={350} right={1} borderRadius={'8px'}>
          {searchData.length !== 0
            ? selectData.products.map((e: any, i: number) => {
                return (
                  <Pressable
                    key={i}
                    p={2}
                    onPress={() => navigation.navigate('AboutProduct', e)}>
                    <Text>{e.title}</Text>
                  </Pressable>
                );
              })
            : null}
        </Box>
      </FormProvider>
    </Box>
  );
};

export default ScreenHeader;
