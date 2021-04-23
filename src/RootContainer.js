import {Root} from 'native-base';
import React, {Component} from 'react';
import {View, Alert,ImageBackground,
  Text,
  Dimensions,
  StyleSheet,} from 'react-native';
import Routes from './config/routes';
import {Container, Content} from 'native-base';
var {height, width} = Dimensions.get('window');
// import Routes from '../src/config/routes';
export default class RootContainer extends Component {
  constructor() {
    super();
    this.state={
      splashActive: true
    }
  }
  componentDidMount() {
    setTimeout(() => this.setState({splashActive: false}), 1000);
  }
  renderSplash(){
    return (
      <Container>
        <ImageBackground
          source={require('../src/assets/images/splashbgimg.jpg')}
          style={styles.imageBackground}>
          <Content showsVerticalScrollIndicator={false}>
            <View style={styles.viewStyle}>
              <Text style={styles.mainText}>Restaurante</Text>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
  render() {
    return (
      this.state.splashActive ?
      <Container>
      <ImageBackground
        source={require('../src/assets/images/splashbgimg.jpg')}
        style={styles.imageBackground}>
        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.viewStyle}>
            <Text style={styles.mainText}>Restaurante</Text>
          </View>
        </Content>
      </ImageBackground>
         </Container>
:
      <View style={{flex: 1}}>
        <Root>
        <Routes/>
        </Root>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    resizeMode: 'contain',
    height: height,
    width: width,
    position: 'absolute',
  },
  viewStyle: {
    marginStart: width / 15,
    marginEnd: width / 15,
    flexDirection: 'column',
    marginBottom: width / 22,
    justifyContent: 'center',
    marginTop: height / 2.7,
  },
  mainText: {
    fontSize: width / 14,
    color: 'white',
    alignSelf: 'center',
  },
});
