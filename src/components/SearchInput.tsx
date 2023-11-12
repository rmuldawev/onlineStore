// SearchInput.tsx

import {HStack, Input} from 'native-base';
import {FC} from 'react';
import {Controller} from 'react-hook-form';
import {colors} from '../theme/styledComponentsTheme';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

interface SeatchInputProps {
  name: string;
  onChangeText: (text: string) => void;
}

const SearchInput: FC<SeatchInputProps> = ({name, onChangeText}) => {
  return (
    <Controller
      name={name}
      render={({field: {onChange, value}}) => {
        return (
          <HStack>
            <Input
              h={'30px'}
              placeholder="поиск..."
              borderWidth={1}
              borderColor={colors.gray}
              _focus={{borderWidth: 0, bg: '#ffffff'}}
              autoFocus={false}
              w={250}
              value={value}
              onChangeText={text => {
                onChange(text);
                onChangeText(text);
              }}
            />
          </HStack>
        );
      }}
    />
  );
};

export default SearchInput;
