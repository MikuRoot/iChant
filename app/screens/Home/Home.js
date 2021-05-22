import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {Colors} from "../../configs/colors";
import FastImage from "react-native-fast-image";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {commonPrayer, dailyPrayer, rosary} from "../../configs/SampleData";
import {CardItem} from "../../components/Common/CardItem";

const { width, height } = Dimensions.get('window');

export default class Home extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      initialCommonPrayer: commonPrayer[0].data,
      isLoading: false
    }
  }

  async componentDidMount(): void {
    await this.onRefresh();
  }

  onRefresh = async () => {
    this.setState({
      ...this.state,
      isLoading: true
    });
  };

  onLoadMore = () => {
    const { page } = this.state;
    this.setState({
      ...this.state,
      page: page + 1,
      isLoading: true,
    }, () => {
      if (this.state.page > 1) this.getData();
    });
  };

  getData = () => {
    const { page, initialCommonPrayer } = this.state;
    var index = page - 1;
    var newData = page === 1 ? initialCommonPrayer : initialCommonPrayer.concat(commonPrayer[index].data);
    this.setState({
      ...this.state,
      initialCommonPrayer: newData,
      isLoading: false
    })
  };

  renderFooter = () => {
    const { isLoading } = this.state;
    return (
      <View style={{
        marginTop: 10,
        width: width,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {isLoading ?
          <ActivityIndicator size={'small'} color={Colors.lightcyan}/> :
          <TouchableOpacity
            onPress={this.onLoadMore}
            style={[styles.cardShadow, {
              flexDirection: 'row',
              backgroundColor: Colors.white,
              borderRadius: 20,
              width: 0.28 * width,
              height: 30,
              alignItems: 'center',
              justifyContent: 'space-around'
            }]}>
            <Text style={{
              color: Colors.lightcyan,
              fontSize: 15,
            }}>
              Load thêm
            </Text>
            <MaterialIcon size={15} color={Colors.dark} name={'arrow-downward'}/>
          </TouchableOpacity>
        }
      </View>
    )
  };

  render() {
    const { initialCommonPrayer } = this.state;
    return (
      <View style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/*header*/}
        <View style={styles.header}>
          {/*<View style={{*/}
          {/*  width: 50,*/}
          {/*  height: 50,*/}
          {/*  justifyContent: 'center',*/}
          {/*  alignItems: 'center',*/}
          {/*  position: 'absolute',*/}
          {/*  left: 0*/}
          {/*}}>*/}
          {/*  <MaterialIcon name={'arrow-back-ios'} size={20} color={Colors.white}/>*/}
          {/*</View>*/}
          <Text style={{
            color: Colors.white,
            fontSize: 18,
            fontWeight: '900',
            textAlign: 'center'
          }}>
            iChant
          </Text>
        </View>

        {/*content*/}
        <View style={{
          overflow: 'hidden',
          marginTop: 100,
          padding: 10
        }}>

          <ScrollView bounces={false}
                      nestedScrollEnabled={true}>

            <View style={{
              marginVertical: 10
            }}>
              <Text style={{
                color: Colors.black,
                fontSize: 22,
                fontWeight: '500',
              }}>
                Chuỗi mân côi
              </Text>
              <FlatList
                data={rosary}
                getItemLayout={(rosary, index) => (
                  {length: 3/10 * height, offset: (3/10 * height) * index, index}
                )}
                style={{
                  marginVertical: 10
                }}
                horizontal={true}
                initialNumToRender={4}
                keyExractor={(item) => item.name}
                renderItem={({item, index}) => (
                  <View key={`${item.name}_no${index}`}
                        style={{
                          marginHorizontal: index === 0 ? 0 : 5,
                          width: 2/3 * width
                        }}
                  >
                    <CardItem image={item.image} name={item.name} date={item.date} width={600} height={3/10 * height} key={item.name}/>
                  </View>
                )}
              />
            </View>

            <View style={{
              marginVertical: 10
            }}>
              <Text style={{
                color: Colors.black,
                fontSize: 22,
                fontWeight: '500',
              }}>
                Chuỗi kinh phổ biến
              </Text>
              <FlatList
                data={dailyPrayer}
                getItemLayout={(rosary, index) => (
                  {length: 3/10 * height, offset: (3/10 * height) * index, index}
                )}
                style={{
                  marginVertical: 10
                }}
                horizontal={true}
                initialNumToRender={4}
                keyExractor={(item) => item.name}
                renderItem={({item, index}) => (
                  <View key={`${item.name}_no${index}`}
                        style={{
                          marginHorizontal: index === 0 ? 0 : 5,
                          width: 2/3 * width
                        }}
                  >
                    <CardItem image={item.image} name={item.name} width={600} height={3/10 * height} key={item.name}/>
                  </View>
                )}
              />
            </View>

            <View style={{
              marginVertical: 10
            }}>
              <Text style={{
                color: Colors.black,
                fontSize: 22,
                fontWeight: '500',
              }}>
                Kinh nguyện hằng ngày
              </Text>
              <FlatList
                data={initialCommonPrayer}
                getItemLayout={(rosary, index) => (
                  {length: 1/10 * height, offset: (1/10 * height) * index, index}
                )}
                style={{
                  marginVertical: 10
                }}
                initialNumToRender={10}
                keyExractor={(item) => item.name.toString()}
                extraData={this.state}
                ListFooterComponent={this.renderFooter}
                renderItem={({item, index}) => (
                  <View key={`${item.name}_no${index}`}
                        style={[styles.cardShadow, {
                          marginVertical: index === 0 ? 0 : 5,
                          width: 0.9 * width,
                          height: 60,
                          flexDirection: 'row',
                          backgroundColor: Colors.white,
                        }]}
                  >

                    <View style={{
                      height: '100%',
                      width: 60,
                      overflow: 'hidden',
                      borderRadius: 20,
                      position: 'absolute',
                      left: 0
                    }}>
                      <FastImage source={item.image}
                                 style={{
                                   width: '100%',
                                   height: '100%',
                                   position: 'absolute',
                                   top: 0
                                 }}
                                 resizeMode={FastImage.resizeMode.stretch}
                      />
                    </View>
                    <View style={{
                      width: (0.9 * width) - 60,
                      height: 60,
                      position: 'absolute',
                      left: 80,
                      justifyContent: 'center',
                      alignItems: 'flex-start'
                    }}>

                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          width: '90%',
                          color: Colors.dark
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    backgroundColor: Colors.darkcyan
  },
  body: {
    padding: 10,
    position: 'absolute',
    top: 100
  },
  cardShadow: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5
  }
});
