import {Box, HStack, ScrollView, Text} from 'native-base';
import {useState} from 'react';
//components
import ScreenHeader from '../components/ScreenHeader';
import BuyButton from '../components/ByuButton';
import BuyConfirmModal from '../components/modals/BuyConfirmModal';

const ShopingBag = ({route}: any) => {
  const data = route.params;
  const pricesAsNumbers = data.map((e: any) => parseFloat(e.price));
  const totalPrice = pricesAsNumbers.reduce((a: number, b: number) => a + b);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const openBuyConfirmModal = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <>
      <Box safeAreaTop pl={'16px'} pr={'16px'}>
        <ScreenHeader />
      </Box>

      <ScrollView pl={'16px'} pr={'16px'}>
        <Text fontWeight={'bold'} fontSize={'md'}>
          Оформление заказа
        </Text>
        {data &&
          data.map((e: any, i: number) => {
            return (
              <HStack
                key={i}
                justifyContent={'space-between'}
                borderBottomWidth={1}>
                <Text>{e.title}</Text>
                <Text> $ {e.price}</Text>
              </HStack>
            );
          })}
        <HStack alignItems={'center'} justifyContent={'space-between'} mt={3}>
          <Text>Общая сумма: {totalPrice}</Text>
          <BuyButton text="Совершить покупку" OnPress={openBuyConfirmModal} />
        </HStack>
      </ScrollView>
      <BuyConfirmModal
        isVisible={isVisible}
        onBackDropPress={openBuyConfirmModal}
      />
    </>
  );
};

export default ShopingBag;
