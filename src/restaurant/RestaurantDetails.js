import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import {Container, Content, Body, List, Left, ListItem} from 'native-base';
var {height, width} = Dimensions.get('window');
export default class RestaurantDetails extends Component {
  constructor() {
    super();
    this.state = {
      restaurantData: {},
      reviews: [],
      operatingHours: {},
    };
  }
  componentDidMount() {
    const {restaurantData} = this.props.route.params;
    this.setState(
      {
        restaurantData: restaurantData,
        reviews: restaurantData.reviews,
        operatingHours: restaurantData.operating_hours,
      },
      () => {
        console.log('res>>', this.state.restaurantData);
        console.log('reviews>>', this.state.operatingHours);
      },
    );
  }
  render() {
    return (
      <Container>
        <View style={style.headerView}>
          <Text style={style.headerText}>{this.state.restaurantData.name}</Text>
        </View>
        <Content showsVerticalScrollIndicator={false}>
          <View style={style.viewStyle}>
            <Image
              source={require('../../src/assets/icons/restaurant-icon.png')}
              style={{
                width: width / 4.8,
                height: width / 4.8,
                borderRadius: width / 4.8 / 2,
                alignSelf: 'center',
              }}
            />
            <Text style={style.nameText}>
              {this.state.restaurantData.cuisine_type}
            </Text>
            <Text style={style.ratingHead}>Opening Time</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={style.operatingtimeText}>Monday : </Text>
                <Text style={style.operatingtimeText}>Tuesday : </Text>
                <Text style={style.operatingtimeText}>Wednesday : </Text>
                <Text style={style.operatingtimeText}>Thursday : </Text>
                <Text style={style.operatingtimeText}>Friday : </Text>
                <Text style={style.operatingtimeText}>Saturday : </Text>
                <Text style={style.operatingtimeText}>Sunday : </Text>
              </View>

              <View>
                {Object.keys(this.state.operatingHours).map((item, key) => {
                  return (
                    console.log('scheduleData map', this.state.operatingHours),
                    console.log('item map', this.state.operatingHours[item]),
                    (
                      <Text style={style.operatingtimeText}>
                        {this.state.operatingHours[item]}
                      </Text>
                    )
                  );
                })}
              </View>
            </View>
            <Text style={style.ratingHead}>Rating & Reviews</Text>

            {this.state.reviews.map(item => (
              <View
                style={{
                  // marginLeft: width / 50,
                  marginTop: height / 30,
                  //marginRight: width / 30,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F6F6F6',
                  paddingBottom: height / 65,
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 2}}>
                    <Text
                      style={{
                        fontSize: width / 28,
                        color: '#000',
                      }}>
                      {item.name}
                    </Text>
                  </View>

                  {item.rating == 1 ? (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        flexDirection: 'row-reverse',
                      }}>
                      <Image source={require('../assets/icons/star.png')} />
                    </View>
                  ) : item.rating == 2 ? (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        flexDirection: 'row-reverse',
                      }}>
                      <Image source={require('../assets/icons/star.png')} />
                      <Image source={require('../assets/icons/star.png')} />
                    </View>
                  ) : item.rating == 3 ? (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        flexDirection: 'row-reverse',
                      }}>
                      <Image source={require('../assets/icons/star.png')} />
                      <Image source={require('../assets/icons/star.png')} />
                      <Image source={require('../assets/icons/star.png')} />
                    </View>
                  ) : item.rating == 4 ? (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        flexDirection: 'row-reverse',
                      }}>
                      <Image source={require('../assets/icons/star.png')} />
                      <Image source={require('../assets/icons/star.png')} />
                      <Image source={require('../assets/icons/star.png')} />
                      <Image source={require('../assets/icons/star.png')} />
                    </View>
                  ) : item.rating == 5 ? (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        flexDirection: 'row-reverse',
                      }}>
                      <Image source={require('../assets/icons/star.png')} />
                      <Image source={require('../assets/icons/star.png')} />
                      <Image source={require('../assets/icons/star.png')} />
                      <Image source={require('../assets/icons/star.png')} />
                      <Image source={require('../assets/icons/star.png')} />
                    </View>
                  ) : null}
                </View>
                <View style={{marginTop: height / 60}}>
                  <Text
                    style={{
                      fontSize: width / 36,
                      color: '#9A9A9A',
                      lineHeight: width / 33,
                    }}>
                    {item.comments}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: width / 36,
                    marginTop: height / 70,
                  }}>
                  {item.date}
                </Text>
                <View></View>
              </View>
            ))}
          </View>
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
    fontSize: width / 20,
    color: '#3EB511',
  },
  imageBackground: {
    resizeMode: 'contain',
    height: height,
    width: width,
    position: 'absolute',
  },
  viewStyle: {
    marginStart: width / 20,
    marginEnd: width / 20,
    flexDirection: 'column',
    marginBottom: width / 22,
    justifyContent: 'center',
    marginTop: height / 42,
  },
  nameText: {
    fontSize: width / 18,
    color: '#000000',
    alignSelf: 'center',
    marginTop: height / 22,
  },
  ratingHead: {fontSize: width / 28, color: '#9A9A9A', marginTop: height / 30},

  operatingtimeText: {
    fontSize: width / 29,
    color: '#000000',

    marginTop: height / 50,
    flexWrap: 'wrap',
  },
});
