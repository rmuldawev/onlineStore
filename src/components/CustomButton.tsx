import {Button, Text} from 'native-base';
import React, {FC} from 'react';
import {ViewStyle} from 'react-native';

interface CustomButtonProps {
  name: string;
  onPress?: () => void;
  isDisabled?: boolean;
  style?: ViewStyle;
}

const CustomButton: FC<CustomButtonProps> = ({
  name,
  onPress,
  isDisabled,
  style,
}) => {
  return (
    <Button
      style={style}
      disabled={isDisabled}
      height={'55px'}
      borderRadius={'4px'}
      bg={'#F83758'}
      onPress={onPress}>
      <Text fontSize={'20px'} fontWeight={'600'} color={'#ffffff'}>
        {name}
      </Text>
    </Button>
  );
};

export default CustomButton;
