import {Box, Text, VStack} from 'native-base';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {useEffect, useState} from 'react';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigator/MainNavigator';
import {FormProvider, useForm} from 'react-hook-form';
import {useKeyboardAvoidingBottomPadding} from '../hooks/KeyboardAvoidingHook';
//redux
import {useAppDispatch, useAppSelector} from '../store';
import {getUsers, selectUsers} from '../store/slices/UserSlice';
//utils
import {useAtomValue, useSetAtom} from 'jotai';
import {currentUserAtom} from '../utils/atoms/currentUserAtom';
//components
import TextInput from '../components/TextInput/TextInput';
import CustomButton from '../components/CustomButton';
//theme
import {colors} from '../theme/styledComponentsTheme';

const validationSchema = yup.object({
  login: yup.string().required('Это поле не должно быть пустым'),
  password: yup.string().min(8, 'Должно быть минимум 8 символов').required(),
});

const LogIn = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const [error, setError] = useState<string>('');
  const currentUser = useAtomValue(currentUserAtom);
  const setCurrentUSerAtom = useSetAtom(currentUserAtom);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const pb = useKeyboardAvoidingBottomPadding();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    formState: {isValid, errors},
    getValues,
  } = methods;

  const handleLogin = () => {
    const res = getValues();
    const user = users.find(
      u => u.username === res.login && u.password === res.password,
    );

    if (user) {
      setCurrentUSerAtom(user);
      navigation.navigate('TabNavigator');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <FormProvider {...methods}>
          <VStack
            pb={pb}
            flex={1}
            safeAreaTop
            bg={colors.base.white}
            pl={'16px'}
            pr={'16px'}
            justifyContent={'space-between'}>
            <Box>
              <Box>
                <Text fontWeight={700} fontSize={40} lineHeight={43} mt={20}>
                  Welcome
                </Text>
                <Text
                  fontWeight={700}
                  fontSize={40}
                  lineHeight={43}
                  mb={'30px'}>
                  Back!
                </Text>
              </Box>
              <Text h={5} color={colors.red} fontSize={10}>
                {error.length > 0 ? error : null}
              </Text>
              <TextInput
                error={errors.login}
                name="login"
                placeholder="Введите свой логин"
                type="text"
              />
              <TextInput
                error={errors.password}
                name="password"
                placeholder="Введите свой пароль"
                type="password"
              />
            </Box>

            <CustomButton
              name="Продолжить"
              isDisabled={!isValid}
              onPress={handleLogin}
            />
          </VStack>
        </FormProvider>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LogIn;
