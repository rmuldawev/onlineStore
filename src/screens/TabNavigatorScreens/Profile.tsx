import {useAtomValue} from 'jotai';
import {Text} from 'react-native';
import {currentUserAtom} from '../../utils/atoms/currentUserAtom';
import {Box, Image, Input, ScrollView} from 'native-base';
import {Screen} from 'react-native-screens';
import ScreenHeader from '../../components/ScreenHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../../theme/styledComponentsTheme';
import CustomInput from '../../components/CustomInput';

const PRofile = () => {
  const {bottom, top} = useSafeAreaInsets();
  const paddingStyle = {paddingTop: top + 40, paddingBottom: bottom};
  const currentUser = useAtomValue(currentUserAtom);
  console.log('currentUser', currentUser);

  const {email, firstName, lastName, gender, age, city} = currentUser;

  return (
    <>
      <ScreenHeader title=" " />
      <ScrollView style={paddingStyle} pl={'16px'} pr={'16px'}>
        <Image
          bg={colors.gray}
          borderRadius={50}
          alignSelf={'center'}
          borderWidth={1}
          w={'96px'}
          h={'96px'}
          source={{uri: `${currentUser.image}`}}
          alt="avatar"
        />
        <Text>Песональные данные:</Text>
        <CustomInput title="Электронная почта:" value={email} />
        <CustomInput title="Имя:" value={firstName} />
        <CustomInput title="Фамилия:" value={lastName} />
        <CustomInput title="Пол:" value={gender} />
        <CustomInput title="Пол:" value={currentUser.age} />
      </ScrollView>
    </>
  );
};

export default PRofile;
