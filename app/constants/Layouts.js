import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get(`window`)

const WIDTH_RATIO = width / 1080
const getSizeWithRatio = (size) => PixelRatio.roundToNearestPixel(size * WIDTH_RATIO)

export {
    height,
    getSizeWithRatio
}