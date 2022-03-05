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
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

export default class Detail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    const { name } = this.props.navigation.state.params;
    console.log('name', name)
  }

  render() {
    return (
      <View style={styles.parent}>
        {/*header*/}
        <View style={styles.header}>
          <View style={styles.headerBackIcon}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcon name={'arrow-left'} size={20} color={Colors.white}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>
            E-Pray
          </Text>
        </View>

        {/*content*/}
        <View style={styles.body}>
          <ScrollView bounces={false}
                      nestedScrollEnabled={true}>

            
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
  headerBackIcon: {
    width: 20,
    position: 'absolute',
    left: 0
  },
  header: {
    height: 50,
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    backgroundColor: Colors.darkcyan
  },
  headerText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center'
  },
  body: {
    overflow: 'hidden',
    marginTop: 100,
    padding: 10
  }
});

