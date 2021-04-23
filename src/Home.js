import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import {Container, Content} from 'native-base';
var {height, width} = Dimensions.get('window');
import {restaurants} from './utils/restaurants.json';
import {useSelector, useDispatch} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {CONSTANTS} from './config/constants';
import {resturantReducer} from './reducers/restaurantReducer';

import axios from 'axios';
import {getRestaurant} from './redux/actions';

function ResturantList() {
  const {restaurant} = useSelector(state => state.resturantReducer);
  const dispatch = useDispatch();
  const fetchRestaurants = () => dispatch(getRestaurant());
  useEffect(() => {
    fetchRestaurants();
  }, []);
  //...
}

const MAP_KEY = CONSTANTS.MAP_KEY;
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: '',
      searchResults: [],
      isShowingResults: false,
      searchModalVisible: false,
      address: '',
    };
  }

  componentDidMount() {
    console.log(ResturantList);
    this.setState({
        searchResults:restaurants.latlng
    })
  }

  GetCountryListItem(address, lag) {
    this.setState({
      nationality: name,
      searchResults: false,
    });
  }

  searchData(address) {
    // const newData = restaurants.filter(item => {
    //   const itemData = item.address.toUpperCase();
    // });

  }

  searchModal = () => {
    return (
      <Modal
        visible={this.state.searchModalVisible}
        animationType="slide"
        transparent={true}
        backgroundColor="#fff"
        onRequestClose={() => {
          this.setState({
            searchModalVisible: false,
          });
        }}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          enabled>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              backgroundColor: 'rgba(100,100,100, 0.5)',
              //padding: 20,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                height: height / 1.7,
                width: '100%',
                borderRadius: 10,
                borderWidth: 1,
                bottom: 0,
                position: 'absolute',
                // marginBottom: -(width / 1.5),
                borderColor: '#fff',
                paddingBottom: height / 2.8,
              }}>
              <View style={{flexDirection: 'row', height: 50}}>
                <Text
                  style={{
                    width: width / 1,
                    // fontSize: width / 21,
                    fontSize: width / 20,
                    fontFamily: 'AvenirLTStd-Book',
                    color: '#5A5A5A',
                    position: 'absolute',
                    left: 5,
                    padding: 15,
                    justifyContent: 'center',
                  }}>
                  Choose Address
                </Text>

                <TouchableOpacity
                  style={{right: 0, position: 'absolute'}}
                  onPress={() => {
                 
                    this.setState({
                      searchModalVisible: false,
                    });
                  }}>
                  <Text style={{color: '#3EB511', fontSize: 24, padding: 15}}>
                    {' '}
                    X
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderBottomColor: '#F6F6F6',
                  borderBottomWidth: 1,
                  width: '100%',
                }}
              />
              <View
                style={{
                  backgroundColor: '#fff',
                  // flex: 1,
                  flexDirection: 'column',
                  marginTop: 8,
                  padding: '2%',
                }}>
                <View style={style.MainContainer}>
                  <View
                    style={{
                      flexDirection: 'row',

                      height: 46,
                      borderWidth: 1,
                      borderColor: '#3EB511',
                      borderRadius: 8,
                      backgroundColor: '#FFFF',
                    }}>
                    <TextInput
                      style={{width: '100%', paddingStart: 12}}
                      onChangeText={address => this.searchData(address)}
                      value={this.state.address}
                      underlineColorAndroid="transparent"
                      placeholder={'Search Here...  '}
                    />
                  </View>

                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={restaurants}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.itemSeparator}
                    renderItem={({item}) => (
                      <Text
                        style={style.row}
                        onPress={this.GetCountryListItem.bind(
                          this,
                          item.address,
                          item.latlng,
                        )}>
                        {item.address}
                      </Text>
                    )}
                    style={{marginTop: 10, height: 400}}
                  />
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  render() {
    return (
      <Container>
        <View style={style.headerView}>
          <Text style={style.headerText}>Restaurants</Text>
        </View>
        <Content showsVerticalScrollIndicator={false}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.lat} // custom description render
            onPress={(data, details = null) => {
              console.log('data', data);
              console.log('details', details);
            }}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyAGF8cAOPFPIKCZYqxuibF9xx5XD4JBb84',
              language: 'en', // language of the results
              types: '(cities)', // default: 'geocode'
            }}
            styles={{
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'food',
            }}
            //   filterReverseGeocodingByTypes={[
            //     'locality',
            //     'administrative_area_level_3',
            //   ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            predefinedPlaces={this.state.searchResults}
            debounce={200}
          />
          <View style={{marginStart: width / 15, flexDirection: 'row'}}>
            <Image
              source={require('./assets/icons/search.png')}
              style={{width: 30, height: 30}}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  searchModalVisible: true,
                });
              }}>
              <Text
                style={{
                  marginStart: 8,
                  fontSize: width / 26,
                  color: '#9A9A9A',
                }}>
                {' '}
                Search By Restaurants
              </Text>
            </TouchableOpacity>
          </View>
         
          <FlatList
            style={style.listStyle}
            data={restaurants}
            keyExtractor={this._keyExtractor}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.props.navigation.navigate('RestaurantDetails', {
                    restaurantData: item,
                  });
                }}
                style={style.touchableStyle1}>
                <View style={style.card1}>
                  <Image
                    source={require('../src/assets/icons/restaurant-icon.png')}
                    style={{
                      width: width / 5.8,
                      height: width / 5.8,
                      borderRadius: width / 5.8 / 2,
                    }}
                  />
                  <Text numberOfLines={3} style={style.nameText}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          {this.searchModal()}
        </Content>
      </Container>
    );
  }
}
const style = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    height: width / 7.5,
    alignItems: 'center',
    paddingStart: width / 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    width: width,
  },
  headerText: {
    marginStart: width / 80,
    fontSize: width / 18,
    color: '#3EB511',
  },
  searchView: {
    flexDirection: 'row',
    marginStart: width / 22,
    marginEnd: width / 22,
    marginTop: width / 20,
    marginBottom: width / 22,
    height: width / 8,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 9,
    backgroundColor: '#FFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchTxt: {
    width: '100%',
    fontSize: width / 25,
    marginStart: width / 22,
  },
  listStyle: {
    width: width / 1.1,
    marginStart: width / 18,
    marginEnd: width / 18,
    marginTop: width / 22,
    marginBottom: width / 28,
  },
  touchableStyle1: {
    height: width / 2.3,
    justifyContent: 'center',
    width: width / 2.15,
  },
  card1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    marginEnd: width / 20,
    height: width / 2.5,
    borderRadius: 8,
  },
  nameText: {
    color: '#000000',
    fontSize: width / 29,
    marginTop: width / 35,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  row: {
    fontSize: width / 24,
    padding: 12,
    fontFamily: 'AvenirLTStd-Book',
  },
  MainContainer: {
    justifyContent: 'center',
    // flex: 1,
    margin: 5,
  },
});
