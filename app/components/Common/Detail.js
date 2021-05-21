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

export default class Detail extends React.PureComponent{
  constructor(props) {
    super(props);

  }

  render() {
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
            E-Pray
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

            
          </ScrollView>
        </View>
      </View>
    )
  }
}
