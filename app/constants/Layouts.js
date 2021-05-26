import {Dimensions, StatusBar, PixelRatio} from 'react-native';

import OS from './Platform';

const {width, height} = Dimensions.get('window');

const headerHeight = 50;
const modalHeaderHeight = 30;
const menuNaviHeight = 40;
const inputHeight = 40;
const brandsMenuNaviHeight = 46;
const bottomMenuHeight = 48;
const modalContentWidth = 280;
const statusBarHeight = OS === 'ios' ? 20 : StatusBar.currentHeight;
const drawerWidth = width;
const WIDTH_RATIO = width / 1080;
const getSizeWithRatio = (size) => PixelRatio.roundToNearestPixel(size * WIDTH_RATIO);
const getFontSizeWithRatio = (size) => PixelRatio.roundToNearestPixel(size * WIDTH_RATIO);
const getSizeForSlideMenu = (size) => PixelRatio.roundToNearestPixel(size * WIDTH_RATIO * 0.9);

export default {
	width,
	height,
	headerHeight,
	menuNaviHeight,
	inputHeight,
	statusBarHeight,
	brandsMenuNaviHeight,
	bottomMenuHeight,
	modalContentWidth,
	modalHeaderHeight,
	drawerWidth,
	WIDTH_RATIO,
	getSizeWithRatio,
	getFontSizeWithRatio,
	getSizeForSlideMenu,
};
