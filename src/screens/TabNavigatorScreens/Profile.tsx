import {useAtomValue} from 'jotai';
import {currentUserAtom} from '../../utils/atoms/currentUserAtom';
import {Box, Image, Input, ScrollView, Text} from 'native-base';
import {Screen} from 'react-native-screens';
import ScreenHeader from '../../components/ScreenHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../../theme/styledComponentsTheme';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../../navigator/MainNavigator';

const PRofile = () => {
  const {bottom, top} = useSafeAreaInsets();
  const currentUser = useAtomValue(currentUserAtom);
  const navigation = useNavigation<AppStackScreenProps['navigation']>();
  const {email, firstName, lastName, gender, address, birthDate, bank} =
    currentUser;

  return (
    <>
      <ScreenHeader title=" " />
      <Box>
        <ScrollView
          showsVerticalScrollIndicator={false}
          pl={'16px'}
          pr={'16px'}
          contentContainerStyle={{
            paddingTop: top + 40,
            paddingBottom: bottom,
          }}>
          <Image
            mt={5}
            mb={5}
            bg={colors.gray}
            borderRadius={50}
            alignSelf={'center'}
            borderWidth={1}
            w={'96px'}
            h={'96px'}
            source={{uri: `${currentUser.image}`}}
            alt="avatar"
          />
          <Text fontWeight={'bold'} mb={2} mt={2}>
            Песональные данные:
          </Text>
          <CustomInput title="Электронная почта:" value={email} />
          <CustomInput title="Имя:" value={firstName} />
          <CustomInput title="Фамилия:" value={lastName} />
          <CustomInput title="Пол:" value={gender} />
          <CustomInput title="Город:" value={address.city} />
          <CustomInput title="Дата Рождения:" value={birthDate} />
          <CustomInput title="Номер карты:" value={bank.cardNumber} />
          <CustomInput title="Срок действия карты:" value={bank.cardExpire} />
          <Box mt={'20px'}>
            <CustomButton
              name="Выйти из аккаунта"
              onPress={() => navigation.navigate('LogIn')}
            />
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

export default PRofile;
