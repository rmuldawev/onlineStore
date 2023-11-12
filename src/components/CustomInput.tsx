import {Box, Input, Text} from 'native-base';
import {FC} from 'react';

interface CustomInputProps {
  title: string;
  value: string;
}

const CustomInput: FC<CustomInputProps> = ({title, value}) => {
  return (
    <Box mt={'5px'}>
      <Text fontSize={'12px'}>{title}</Text>
      <Input
        borderRadius={'8px'}
        h={'48px'}
        value={value}
        isDisabled={true}
        _disabled={{opacity: 1}}
      />
    </Box>
  );
};

export default CustomInput;
