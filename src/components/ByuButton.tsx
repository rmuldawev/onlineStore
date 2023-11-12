import {Pressable, Text} from 'native-base';
import {FC} from 'react';

interface BuyButtonProps {
  text: string;
  OnPress: () => void;
}

const BuyButton: FC<BuyButtonProps> = ({text, OnPress}) => {
  return (
    <Pressable
      onPress={OnPress}
      bg={'green.500'}
      pt="1"
      pb="1"
      pr="3"
      pl="3"
      borderRadius={'6px'}>
      <Text>{text}</Text>
    </Pressable>
  );
};

export default BuyButton;
