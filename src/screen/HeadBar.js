import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { View, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { Header } from 'react-native-elements';
import { Icon, RadioButton } from 'react-native-paper';
import { context } from '../navigation/Appnav';


const HeadBar = () => {
  const props = useContext(context);
  const index = props.active;
  const setActive = props.setActive;
  const preState = props.pre;

  const navigation = useNavigation();
  const [showModel, setShowModel] = useState(false);

  const back = () => {
    setActive(preState.id);
    navigation.navigate(preState.name);
  }

  const menuName = () => {
    if (index === 6)
      return 'My Profile'
    else if (index === 7)
      return 'Privacy Policy'
    else if (index === 8)
      return 'Contact Us'
    else if (index === 9)
      return 'Feedback'
  }
  return (
    <View>
      <Header placement={index <= 5 ? 'center' : 'left'} backgroundColor='#035676' statusBarProps={{ barStyle: 'light-content', backgroundColor: '#034a66' }}
        leftComponent={
          <View>
            {
              index > 5 &&
              <TouchableOpacity
                style={styles.backMenu}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={back}
              >
                <Icon
                  source="arrow-left"
                  size={25}
                  color="#fff"
                />
              </TouchableOpacity>
            }
          </View>
        }
        centerComponent={
          index <= 5 ? <View style={styles.logoView}>
            <Image source={require('../assets/zelo_logo.png')} style={styles.logo} />
          </View>
            :
            <Text style={styles.menuTitle}>{menuName()}</Text>
        }
        rightComponent={
          <View style={styles.header_container}>
            {
              index === 1 &&
              <>
                <TouchableOpacity>
                  <Image source={require('../assets/passcode.png')} style={styles.passcode} />
                </TouchableOpacity>
                <TouchableOpacity >
                  <Icon
                    source="qrcode"
                    size={30}
                    color="#fff"
                  />
                </TouchableOpacity>
              </>
            }
            {
              index === 3 &&
              <TouchableOpacity onPress={() => props?.setHeaderProps({ showFilter: true })}>
                <Icon
                  source="filter"
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            }
            {
              index === 6 &&
              <TouchableOpacity onPress={() => setShowModel(true)} >
                <Image
                  source={require('../assets/portugal.png')} style={{ width: 50, height: 30 }} />
              </TouchableOpacity>
            }
          </View>
        }
      />
      <Modal animationType="fade" transparent={true} visible={showModel} onDismiss={() => setShowModel(false)}
        onRequestClose={() => setShowModel(false)} >
        <TouchableWithoutFeedback onPress={() => setShowModel(false)}>
          <View style={styles.modal} >
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 20 }}>Language</Text>
                <View style={styles.modelItem}>
                  <RadioButton checkedIcon="dot-circle-o" uncheckedIcon="circle-o" />
                  <Image source={require('../assets/US.png')} style={styles.modelImg} />
                  <Text>English</Text>
                </View>
                <View style={styles.modelItem}>
                  <RadioButton checkedIcon="dot-circle-o" uncheckedIcon="circle-o" />
                  <Image source={require('../assets/portugal.png')} style={styles.modelImg} />
                  <Text>Portuguese</Text>
                </View>
                <View style={styles.modelItem}>
                  <RadioButton checkedIcon="dot-circle-o" uncheckedIcon="circle-o" />
                  <Image source={require('../assets/spain.png')} style={styles.modelImg} />
                  <Text>Spanish</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal >
    </View>
  );
};

const styles = StyleSheet.create({
  // header
  header_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    backgroundColor: '#fff',
    padding: 3
  },
  logo: {
    width: 130,
    height: 30,
  },
  backMenu: {
    marginTop: 7,
    flexDirection: 'row',
    columnGap: 5
  },
  menuTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 7,
    alignSelf: 'flex-start',
    width: 130,
    height: 30,
  },
  passcode: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#00000060',
  },
  modalContainer: {
    // height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: 30
  },
  modelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    padding: 10,
    marginBottom: 10,
  },
  modelImg: {
    width: 70,
    height: 40
  }
});

export default HeadBar;
