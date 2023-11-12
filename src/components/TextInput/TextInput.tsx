import {Box, HStack, Input, Pressable, Text} from 'native-base';
import {FC, useState} from 'react';
import {Controller, FieldError} from 'react-hook-form';
import {ViewStyle} from 'react-native';
import Eye from '../../assets/icons/Eye';
import Lock from '../../assets/icons/Lock';
import User from '../../assets/icons/User';
import {colors} from '../../theme/styledComponentsTheme';

interface TextInputProps {
  name: string;
  placeholder?: string;
  type: string;
  style?: ViewStyle;
  error?: FieldError;
}

const TextInput: FC<TextInputProps> = ({
  name,
  placeholder,
  type,
  style,
  error,
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      render={({field: {onChange, value}}) => {
        return (
          <Box h={'80px'}>
            <HStack
              style={style}
              bg={'##F3F3F3'}
              h={55}
              borderRadius={10}
              borderColor={error ? '#F83758' : '#A8A8A9'}
              borderWidth={1}
              alignItems={'center'}
              pl={11}
              pr={11}>
              <Input
                leftElement={type === 'text' ? <User /> : <Lock />}
                rightElement={
                  type === 'password' ? (
                    <Pressable onPress={() => setShow(prev => !prev)}>
                      <Eye />
                    </Pressable>
                  ) : undefined
                }
                type={show ? 'password' : 'text'}
                placeholderTextColor={'#676767'}
                borderWidth={0}
                _focus={{borderWidth: 0, bg: '#ffffff'}}
                value={value}
                onChangeText={onChange}
                autoCorrect={false}
                placeholder={placeholder}
              />
            </HStack>
            {error && (
              <Text fontSize={'10px'} color={colors.red}>
                {error.message}
              </Text>
            )}
          </Box>
        );
      }}
    />
  );
};

export default TextInput;
