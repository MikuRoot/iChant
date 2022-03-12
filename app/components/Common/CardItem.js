import React from 'react';
import {
  View,
  Text
} from 'react-native';
import FastImage from "react-native-fast-image";
import {Colors} from "../../configs/colors";

export const CardItem = (props) => {
  return (
    <View style={{
      widh: props.width,
      height: props.height,
      backgroundColor: Colors.white,
      borderRadius: 20,
      overflow: 'hidden',
      shadowColor: Colors.dark,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 5
    }}>

      {/*image part*/}
      <View style={{
        width: '100%',
        height: 2/3 * props.height,
        backgroundColor: 'transparent',
      }}>

        <FastImage source={props.image}
                   style={{
                     width: '100%',
                     height: '100%',
                     position: 'absolute',
                     top: 0,
                   }}
                   resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      {/*description part*/}
      <View style={{
        width: '100%',
        paddingHorizontal: 10,
        height: 1/3 * props.height,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Text style={{
          fontSize: 16,
          fontWeight: '700',
          color: Colors.dark,
          textAlign: 'center'
        }}>{props.name}</Text>

        <Text style={{
          fontSize: 16,
          fontWeight: '500',
          color: Colors.dark,
          marginVertical: 10
        }}>{props.date}</Text>
      </View>
    </View>
  )
};
