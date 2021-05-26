import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';
import {Colors} from "../configs/colors";
import FastImage from "react-native-fast-image";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {commonPrayer, dailyPrayer, rosary} from "../configs/SampleData";
import {CardItem} from "../components/Common/CardItem";
import Layouts from "../constants/Layouts";
import {getAllChant} from "../services/realm";

export default class Home extends React.PureComponent {
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
		this.getData();
	};
	
	onLoadMore = () => {
		const {page} = this.state;
		this.setState({
			...this.state,
			page: page + 1,
			isLoading: true,
		}, () => {
			if (this.state.page > 1) this.getData();
		});
	};
	
	getData = () => {
		const {page, initialCommonPrayer} = this.state;
		var index = page - 1;
		var newData = page === 1 ? initialCommonPrayer : initialCommonPrayer.concat(commonPrayer[index].data);
		this.setState({
			...this.state,
			initialCommonPrayer: newData,
			isLoading: false
		})
	};
	
	renderFooter = () => {
		const {isLoading} = this.state;
		return (
			<View style={styles.footerContainer}>
				{isLoading ?
					<ActivityIndicator size={'small'} color={Colors.lightcyan}/> :
					<TouchableOpacity
						onPress={this.onLoadMore}
						style={[styles.cardShadow, styles.loadMoreButton]}>
						<Text style={styles.loadMoreText}>
							Load thêm
						</Text>
						<MaterialIcon size={15} color={Colors.dark} name={'arrow-downward'}/>
					</TouchableOpacity>
				}
			</View>
		)
	};
	
	render() {
		const {initialCommonPrayer} = this.state;
		const {navigation} = this.props;
		return (
			<View style={styles.parent}>
				{/*header*/}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>
						iChant
					</Text>
				</View>
				
				{/*content*/}
				<View style={styles.content}>
					<ScrollView bounces={false}
					            nestedScrollEnabled={true}>
						
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Chuỗi mân côi
							</Text>
							<FlatList
								data={rosary}
								getItemLayout={(rosary, index) => (
									{length: 3 / 10 * Layouts.height, offset: (3 / 10 * Layouts.height) * index, index}
								)}
								style={{
									marginVertical: 10
								}}
								horizontal={true}
								initialNumToRender={4}
								keyExractor={(item) => item.name}
								renderItem={({item, index}) => (
									<TouchableOpacity
										onPress={() => navigation.navigate('DetailScreen', {chantName: item.name})}
										key={`${item.name}_no${index}`}
										style={[styles.sectionCard, {
											marginHorizontal: index === 0 ? 0 : 5,
										}]}
									>
										<CardItem image={item.image} name={item.name} date={item.date} width={600}
										          height={3 / 10 * Layouts.height} key={item.name}/>
									</TouchableOpacity>
								)}
							/>
						</View>
						
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Chuỗi kinh phổ biến
							</Text>
							<FlatList
								data={dailyPrayer}
								getItemLayout={(rosary, index) => (
									{length: 3 / 10 * Layouts.height, offset: (3 / 10 * Layouts.height) * index, index}
								)}
								style={{
									marginVertical: 10
								}}
								horizontal={true}
								initialNumToRender={4}
								keyExractor={(item) => item.name}
								renderItem={({item, index}) => (
									<TouchableOpacity
										onPress={() => navigation.navigate('DetailScreen', {chantName: item.name})}
										key={`${item.name}_no${index}`}
										style={[styles.sectionCard, {
											marginHorizontal: index === 0 ? 0 : 5,
										}]}
									>
										<CardItem image={item.image} name={item.name} width={600} height={3 / 10 * Layouts.height}
										          key={item.name}/>
									</TouchableOpacity>
								)}
							/>
						</View>
						
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Kinh nguyện hằng ngày
							</Text>
							<FlatList
								data={initialCommonPrayer}
								getItemLayout={(rosary, index) => (
									{length: 1 / 10 * Layouts.height, offset: (1 / 10 * Layouts.height) * index, index}
								)}
								style={{
									marginVertical: 10
								}}
								initialNumToRender={10}
								keyExractor={(item) => item.name.toString()}
								extraData={this.state}
								ListFooterComponent={this.renderFooter}
								renderItem={({item, index}) => (
									<TouchableOpacity
										onPress={() => navigation.navigate('DetailScreen', {chantName: item.name})}
										key={`${item.name}_no${index}`}
										style={[styles.cardShadow, styles.sectionCard_finalList, {
											marginVertical: index === 0 ? 0 : 5,
										}]}
									>
										
										<View style={styles.sectionCard_finalList_imageContainer}>
											<FastImage source={item.image}
											           style={styles.sectionCard_finalList_image}
											           resizeMode={FastImage.resizeMode.stretch}
											/>
										</View>
										<View style={styles.sectionCard_finalList_textContainer}>
											
											<Text
												numberOfLines={2}
												style={styles.sectionCard_finalList_text}
											>
												{item.name}
											</Text>
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
		width: Layouts.width,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 50,
		backgroundColor: Colors.darkcyan
	},
	headerTitle: {
		color: Colors.white,
		fontSize: 18,
		fontWeight: '900',
		textAlign: 'center'
	},
	content: {
		overflow: 'hidden',
		marginTop: 100,
		padding: 10
	},
	section: {
		marginVertical: 10
	},
	sectionTitle: {
		color: Colors.black,
		fontSize: 22,
		fontWeight: '500',
	},
	sectionCard: {
		width: 2 / 3 * Layouts.width
	},
	sectionCard_finalList: {
		width: 0.9 * Layouts.width,
		height: 60,
		flexDirection: 'row',
		backgroundColor: Colors.white,
	},
	sectionCard_finalList_imageContainer: {
		height: '100%',
		width: 60,
		overflow: 'hidden',
		borderRadius: 20,
		position: 'absolute',
		left: 0
	},
	sectionCard_finalList_image: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0
	},
	sectionCard_finalList_textContainer: {
		width: (0.9 * Layouts.width) - 60,
		height: 60,
		position: 'absolute',
		left: 80,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	sectionCard_finalList_text: {
		fontSize: 18,
		fontWeight: '600',
		width: '90%',
		color: Colors.dark
	},
	body: {
		padding: 10,
		position: 'absolute',
		top: 100
	},
	footerContainer: {
		marginTop: 10,
		width: Layouts.width,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadMoreButton: {
		flexDirection: 'row',
		backgroundColor: Colors.white,
		borderRadius: 20,
		width: 0.28 * Layouts.width,
		height: 30,
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingHorizontal: Layouts.getSizeWithRatio(20)
	},
	loadMoreText: {
		color: Colors.lightcyan,
		fontSize: 15,
	},
	cardShadow: {
		borderRadius: 20,
		overflow: 'hidden',
		shadowColor: Colors.dark,
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 1,
		shadowRadius: 10,
		elevation: 5
	}
});
