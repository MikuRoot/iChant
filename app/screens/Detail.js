import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity
} from 'react-native';
import {Colors} from "../configs/colors";
import Layouts from "../constants/Layouts";
import WebView from "react-native-webview";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {getChant} from "../services/realm";
import OS from "../constants/Platform";

export default class Detail extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			name: ''
		}
	}
	
	async componentDidMount(): void {
		const {chantName} = this.props.navigation.state.params;
		const chant = await getChant(chantName);
		if (chant.length > 0) {
			this.setState(() => ({
				content: chant[0].content,
				name: chant[0].name
			}))
		}
	}
	
	render() {
		const {navigation} = this.props;
		const {content, name} = this.state;
		const CustomView = OS === 'ios' ? SafeAreaView : View;
		return (
			<CustomView style={styles.parent}>
				{/*header*/}
				<View style={styles.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<MaterialIcon name={'arrow-back-ios'} color={Colors.white} size={Layouts.getSizeWithRatio(80)}/>
					</TouchableOpacity>
					<Text style={styles.headerTitle}>
						iChant
					</Text>
					<View/>
				</View>
				
				{/*content*/}
				<View style={styles.content}>
					<WebView
						source={{
							html: `<html lang="en">
								      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
								      <body>
								          <h3 xmlns="http://www.w3.org/1999/xhtml" id="sites-page-title-header" style="" align="left">
								              <span id="sites-page-title" dir="ltr" tabindex="-1" style="outline: none">${name}</span>
								          </h3>
								          <div id="sites-canvas-main-content">
								              <table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" class="sites-layout-name-one-column sites-layout-hbox">
								                  <tbody>
								                      <tr>
								                          <td class="sites-layout-tile sites-tile-name-content-1">
								                              <div dir="ltr">
								                                  <font size="4">
								                                      <span style="font-family:times new roman, serif">${content}</span>
								                                  </font>
								                          </td>
								                      </tr>
								                  </tbody>
								              </table>
								          </div>
								      </body>
								    </html>`
					}}
						style={styles.webview}
					/>
				</View>
				<View style={styles.footer}/>
			</CustomView>
		)
	}
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
	},
	header: {
		height: 50,
		width: Layouts.width,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: Colors.darkcyan,
		paddingHorizontal: Layouts.getSizeWithRatio(20)
	},
	headerTitle: {
		color: Colors.white,
		fontSize: 18,
		fontWeight: '900',
		textAlign: 'center',
		marginLeft: -Layouts.getSizeWithRatio(80)
	},
	body: {
		padding: 10,
		position: 'absolute',
		top: 100
	},
	content: {
		width: Layouts.width,
		height: Layouts.height,
		paddingBottom: Layouts.height * 0.15
	},
	
	cardShadow: {
		borderRadius: 20,
		overflow: 'hidden',
		shadowColor: Colors.dark,
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 1,
		shadowRadius: 10,
		elevation: 5
	},
	webView: {
		alignSelf: 'center',
		width: Layouts.width - Layouts.getSizeWithRatio(50),
		height: Layouts.height
	},
	footer: {
		height: Layouts.getSizeWithRatio(80),
		width: Layouts.width,
		backgroundColor: Colors.darkcyan,
		position: 'absolute',
		bottom: 0
	}
});
