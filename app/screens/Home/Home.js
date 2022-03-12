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
import {getAllChant, getChant, seedingData} from "../../services/realm";
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
    await this.getData();
    await getAllChant();
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
    let index = page - 1;
    let newData = page === 1 ? initialCommonPrayer : initialCommonPrayer.concat(commonPrayer[index].data);
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

  navigateTo = (screen, params) => {
    this.props.navigation.navigate(`${screen}`, params);
    return true;
  }

  render() {
    const { initialCommonPrayer } = this.state;
    return (
      <View style={styles.parent}>
        <View style={styles.header}>
          <Text style={{
            fontSize: 18,
            fontWeight: '900',
            textAlign: 'center',
            color: Colors.white
          }}>
            E-Pray
          </Text>
        </View>

        <View style={styles.body}>
          <ScrollView bounces={false}
                      nestedScrollEnabled={true}>

            <View style={styles.sectionView}>
              <Text style={styles.sectionTitle}>
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
                    <TouchableOpacity
                        onPress={() => {
                          this.navigateTo('DetailScreen', { name: item.name })
                        }}
                    >
                      <View key={`${item.name}_no${index}`}
                            style={[styles.cardItem, {
                              marginHorizontal: index === 0 ? 0 : 5,
                            }]}>
                        <CardItem image={item.image} name={item.name} date={item.date} width={600} height={3/10 * height} key={item.name}/>
                      </View>
                    </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.sectionView}>
              <Text style={styles.sectionTitle}>
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
                keyExractor={(item, index) => item.name}
                renderItem={({item, index}) => (
                    <TouchableOpacity
                        onPress={() => {
                          this.navigateTo('DetailScreen', { name: item.name })
                        }}
                    >
                      <View key={`${item.name}_no${index}`}
                            style={[styles.cardItem, {
                              marginHorizontal: index === 0 ? 0 : 5,
                            }]}>
                        <CardItem image={item.image} name={item.name} width={600} height={3/10 * height} key={item.name}/>
                      </View>
                    </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.sectionView}>
              <Text style={styles.sectionTitle}>
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
                keyExractor={(item, index) => item.name.toString()}
                extraData={this.state}
                ListFooterComponent={this.renderFooter}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                      onPress={() => {
                        this.navigateTo('DetailScreen', { name: item.name })
                      }}
                  >
                    <View style={[styles.cardShadow, {
                      marginVertical: index === 0 ? 0 : 5,
                      width: 0.9 * width,
                      height: 60,
                      flexDirection: 'row',
                      backgroundColor: Colors.white,
                    }]}>

                      <View style={styles.smallCardItem}>
                        <FastImage source={item.image}
                                   style={styles.smallCardImage}
                                   resizeMode={FastImage.resizeMode.stretch}
                        />
                      </View>
                      <View style={styles.smallCardTextView}>
                        <Text
                            numberOfLines={2}
                            style={styles.smallCardText}
                        >
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
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
  parent: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  headertitle: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center'
  },
  body: {
    overflow: 'hidden',
    marginTop: 100,
    padding: 10
  },
  cardShadow: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5
  },
  sectionView: {
    marginVertical: 10
  },
  sectionTitle: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: '500',
  },
  cardItem: {
    width: 2/3 * width
  },
  smallCardItem: {
    height: '100%',
    width: 60,
    overflow: 'hidden',
    borderRadius: 20,
    position: 'absolute',
    left: 0
  },
  smallCardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0
  },
  smallCardTextView: {
    width: (0.9 * width) - 60,
    height: 60,
    position: 'absolute',
    left: 80,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  smallCardText: {
    fontSize: 18,
    fontWeight: '600',
    width: '90%',
    color: Colors.dark
  }
});
