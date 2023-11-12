import {Text, Pressable} from 'native-base';
import {FC} from 'react';

interface ClearCartButtonProps {
  onPress: () => void;
}

const ClearCartButton: FC<ClearCartButtonProps> = ({onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      bg={'orange.400'}
      pt="1"
      pb="1"
      pr="3"
      pl="3"
      borderRadius={'5px'}>
      <Text>Очистить корзину</Text>
    </Pressable>
  );
};

export default ClearCartButton;
