import {HStack, Text} from 'native-base';
import {FC} from 'react';
import Modal from 'react-native-modal';
//theme
import {colors} from '../../theme/styledComponentsTheme';

interface BuyConfirmModalProps {
  isVisible: boolean;
  onBackDropPress: () => void;
}

const BuyConfirmModal: FC<BuyConfirmModalProps> = ({
  isVisible,
  onBackDropPress,
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackDropPress}>
      <HStack
        borderRadius={'8px'}
        p={2}
        alignSelf={'center'}
        bg={colors.gray}
        alignItems={'center'}
        justifyContent={'center'}
        w={150}>
        <Text>Вы купили товар(ы)</Text>
      </HStack>
    </Modal>
  );
};

export default BuyConfirmModal;
