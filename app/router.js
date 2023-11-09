import React from "react";
import {
  createBottomTabNavigator
} from 'react-navigation-tabs'
import {
  createStackNavigator
} from "react-navigation-stack";
import {
  createAppContainer
} from "react-navigation";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import SearchContainer from "./containers/Search/SearchContainer";
import HomeContainer from "./containers/Home/HomeContainer";
import FavoriteContainer from "./containers/Favorite/FavoriteContainer";
import SettingContainer from "./containers/Setting/SettingContainer";
import Detail from "./components/Common/Detail";
import { getSizeWithRatio }  from './constants/Layouts'
import {Colors} from "./configs/colors";

const GuestTabs = createBottomTabNavigator({
  Home: {
    screen: HomeContainer,
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <MaterialIcon size={focused ? 21 : 20} color={Colors.white} name={'home'}/>
      )
    }
  },
  Favorite: {
    screen: FavoriteContainer,
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <MaterialIcon size={focused ? 21 : 20} color={Colors.white} name={'heart'}/>
      )
    }
  },
  Search: {
    screen: SearchContainer,
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <MaterialIcon size={focused ? 21 : 20} color={Colors.white} name={'magnify'}/>
      )
    }
  },
  Setting: {
    screen: SettingContainer,
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <EvilIcon size={focused ? 21 : 20} color={Colors.white} name={'gear'}/>
      )
    }
  },
}, {
  initialRouteName: "Home",
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.red,
    style: {
      backgroundColor: Colors.dark,
      height: getSizeWithRatio(200),
      paddingBottom: 20
    }
  }
});

const stackNavigatorOptions = {
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white",
    shadowColor: "transparent"
  }
};

const tabs = createStackNavigator({
  GuestScreens: {
    screen: GuestTabs
  },
  DetailScreen: {
    screen: Detail
  },
}, stackNavigatorOptions);

const AppContainer = createAppContainer(tabs);
export default AppContainer;
