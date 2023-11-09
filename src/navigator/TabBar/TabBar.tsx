import {Box, HStack, Image, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TabBarIcons from '../../TabBarIcons';
//styles
const Tabbar = ({state, navigation, descriptors}: any) => {
  const {bottom} = useSafeAreaInsets();
  const bottomStyle = {paddingBottom: bottom};
  return (
    <HStack
      p={5}
      justifyContent={'space-between'}
      borderTopWidth={1}
      borderTopColor={'#FFFFFF'}
      bg={'white'}
      //   style={[bottomStyle]}
    >
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Box bg={'white'} alignItems={'center'}>
              <Image
                h={'34px'}
                w={'34px'}
                backgroundColor={'red.100'}
                alt="icon"
                source={
                  isFocused
                    ? TabBarIcons[route.name.toLowerCase()]?.default
                    : TabBarIcons[route.name.toLowerCase()]?.focused
                }
              />
            </Box>

            <Text
              style={[
                // styles.TabBarTextStyle,
                {color: isFocused ? '#CC0000' : 'black'},
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};
export default Tabbar;
