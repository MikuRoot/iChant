import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import {Colors} from "../../configs/colors";
import Images from '../../assets/images';
import FastImage from "react-native-fast-image";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {chants} from "../../configs/SampleData";

const { width, height } = Dimensions.get('window');

export default class Detail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      dateCollection: [],
      selectedCase: ''
    }
  }

  componentDidMount() {
    this.initScreen();
  }

  initScreen = () => {
    const { name } = this.props.navigation.state.params;
    const dateCollection = ['Ngày thứ nhất', 'Ngày thứ hai', 'Ngày thứ ba', 'Ngày thứ tư', 'Ngày thứ năm', 'Ngày thứ sáu', 'Ngày thứ bảy', 'Ngày thứ tám', 'Ngày thứ chín'];
    this.setState({ name, dateCollection });
    this.getContent(name);
  }

  getContent = (name) => {
    const chantList = chants.filter(item => item.name === name);
    const content = chantList.length > 0 ? chantList[0].content : 'Hệ thống vẫn còn đang cập nhật nội dung...';
    this.setState({ content });
  }

  handleOpenBox = (item) => {
    const { selectedCase } = this.state;
    item === selectedCase ? this.setState({ selectedCase: '' }) : this.setState({selectedCase: item})
    return true;
  }

  // Lấy nội dung của ngày cụ thể trong 9 ngày kính lòng Chúa thương xót
   getSpecificContent_9DaysOfDivineMercyDevotion = (selectedCase) => {
    const { dateCollection, content } = this.state;
    const index = dateCollection.indexOf(selectedCase);
    return content[index].detail;
  }

  // Lấy nội dung của ngày cụ thể trong 9 ngày kính lòng Chúa thương xót
  getSpecificContent_DivineMercyChaplet = (selectedCase) => {
    const { content } = this.state;
    const caseCollection = ['Trường hợp đọc vào lúc 3 giờ chiều', 'Trường hợp đọc vào những ngày khác']
    const index = caseCollection.indexOf(selectedCase);
    return content[index].detail;
  }

  renderContent = (content) => {
    return (
        <ScrollView bounces={false}
                    nestedScrollEnabled={true}>
          <Text style={styles.textContent}>{content}</Text>
        </ScrollView>
    )
  }

  // renderBoxes = (item) => {
  //   const { selectedCase } = this.state;
  //   return (
  //       <TouchableOpacity
  //           onPress={this.handleOpenBox(item)}
  //           style={[styles.contentContainer, selectedCase !== item && {
  //             alignItems: 'center',
  //             justifyContent: 'center'
  //           }]}
  //       >
  //         {selectedCase === item ? this.renderContent(this.getSpecificContent(selectedCase)) : (
  //             <Text>{item}</Text>
  //         )}
  //       </TouchableOpacity>
  //   )
  // }

  render() {
    const { name, content, dateCollection, selectedCase } = this.state;
    const isLargeItem = name === 'Tuần Cửu Nhật kính lòng thương xót' || name === 'Lần hạt lòng thương xót Chúa'
    return (
      <SafeAreaView style={styles.parent}>
        <View style={styles.header}>
          <View style={styles.headerBackIcon}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcon name={'arrow-left'} size={30} color={Colors.white}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>
            {name}
          </Text>
        </View>

        {/*content*/}
        <View style={styles.body}>
          <FastImage
              // source={Images.holyCross}
              source={Images.holyCross}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.bodyContent}>
            {isLargeItem ? (
              <>
                {name === 'Tuần Cửu Nhật kính lòng thương xót' && (
                  <FlatList
                    data={dateCollection || []}
                    keyExtractor={(item, index) => `item_${index}`}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this.handleOpenBox(item)}
                          style={[styles.contentContainer, selectedCase !== item && {
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 5,
                            height: 50
                          }]}
                        >
                          {selectedCase === item ? this.renderContent(this.getSpecificContent_9DaysOfDivineMercyDevotion(selectedCase)) : (
                            <Text>{item}</Text>
                          )}
                        </TouchableOpacity>
                      )
                    }}
                  />
                )}
                {name === 'Lần hạt lòng thương xót Chúa' && (
                  <FlatList
                    data={['Trường hợp đọc vào lúc 3 giờ chiều', 'Trường hợp đọc vào những ngày khác']}
                    keyExtractor={(item, index) => `item_${index}`}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this.handleOpenBox(item)}
                          style={[styles.contentContainer, selectedCase !== item && {
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 5,
                            height: 50
                          }]}
                        >
                          {selectedCase === item ? this.renderContent(this.getSpecificContent_DivineMercyChaplet(selectedCase)) : (
                            <Text>{item}</Text>
                          )}
                        </TouchableOpacity>
                      )
                    }}
                  />
                )}
              </>
            ) : (
                <View style={[styles.contentContainer, {
                  marginVertical: 20,
                }]}>
                  {this.renderContent(content)}
                </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  headerBackIcon: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 50,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'absolute',
    // top: 50,
    backgroundColor: Colors.darkcyan
  },
  headerText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
    flex: 1
  },
  body: {
    width,
    height,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: Colors.dark
  },
  bodyContent: {
    flex: 1,
    height: height * 0.8,
    marginTop: 10,
    marginHorizontal: 10
  },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 10,
    left: 0,
    right: 0,
    height: 0.9 * height,
    width
  },
  contentContainer: {
    padding: 5,
    borderRadius: 10,
    opacity: 0.7,
    backgroundColor: Colors.white,
  },
  textContent: {
    color: Colors.black,
    fontSize: 20,
    zIndex: 199
  }
});

