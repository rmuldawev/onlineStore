import {Box, Text, VStack} from 'native-base';
import {colors} from '../theme/styledComponentsTheme';
import TextInput from '../components/TextInput/TextInput';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigator/MainNavigator';
import {FormProvider, useForm} from 'react-hook-form';
import CustomButton from '../components/CustomButton';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {useKeyboardAvoidingBottomPadding} from '../hooks/KeyboardAvoidingHook';

const validationSchema = yup.object({
  login: yup
    .string()
    .email('Пожалуйста введите правильный email')
    .required('Это поле не должно быть пустым'),
  password: yup.string().min(8, 'Введите пароль').required(),
});

const LogIn = () => {
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

  const onPress = () => {
    navigation.navigate('TabNavigator');
    console.log('isValid', isValid);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              onPress={onPress}
            />
          </VStack>
        </FormProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LogIn;
