import { StyleSheet } from 'react-native'
//spaces

const styles = StyleSheet.create({
  containerWindow: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 22,

  },
  TabBarTextStyle: {
    fontSize: 13,
    marginTop: 1,
    letterSpacing: 0.16,
    lineHeight: 15,
  },
  tab: {
    width:'auto',
    alignItems: 'center',
    // height: 50,
    // backgroundColor:'red',
  },
})

export default styles