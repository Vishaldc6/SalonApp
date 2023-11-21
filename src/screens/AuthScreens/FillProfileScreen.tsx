import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CountryPicker from 'rn-country-picker';
import DatePicker from 'react-native-date-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Colors, useGlobalStyles } from '../../styles';
import { CustomDropdownMenu, CustomHeader, CustomLoader, PrimaryCustomButton, PrimaryCustomTextInput } from '../../components';
import { AppIcons, AppImages } from '../../utils';

const FillProfileScreen = () => {

    const styles = useStyles()
    const globalStyles = useGlobalStyles()
    const [isLoading, setIsLoading] = useState(false)
    const [isDateModal, setIsDateModal] = useState(false)
    const [gender, setGender] = useState()
    const [countryCode, setCountryCode] = useState<string>("91");

    const genderMenu = [
        {
            id: 0, title: 'Male'
        },
        {
            id: 1, title: 'Female'
        },
        {
            id: 2, title: 'Other'
        }
    ];

    return (
        <View style={globalStyles.flexContainer}>
            {isLoading && <CustomLoader />}
            <CustomHeader title={'Fill Your Profile'} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.appContainer}>

                <View style={styles.imageContainer}>
                    <Image source={AppImages.user} style={styles.image} />
                </View>

                <PrimaryCustomTextInput
                    // ref={emailFieldRef}
                    // value={''}
                    onChangeText={(val) => console.log(val)}
                    placeholder={'Enter Full Name'}
                    leftIcon={AppIcons.user}
                    returnKeyType={'next'}
                // onSubmitEditing={() => passwordFieldRef?.current?.focus()}
                />
                <PrimaryCustomTextInput
                    // ref={emailFieldRef}
                    // value={''}
                    onChangeText={(val) => console.log(val)}
                    placeholder={'Enter Email'}
                    leftIcon={AppIcons.mail}
                    returnKeyType={'next'}
                    keyboardType={'email-address'}
                // onSubmitEditing={() => passwordFieldRef?.current?.focus()}
                />
                <Pressable onPress={() => setIsDateModal(true)}>
                    <PrimaryCustomTextInput
                        // ref={emailFieldRef}
                        // value={''}
                        onChangeText={(val) => console.log(val)}
                        placeholder={'Choose Date of Birth'}
                        leftIcon={AppIcons.calendar}
                        editable={false}
                    />
                </Pressable>

                {/* <CountryPicker
                    disable={false}
                    animationType={"slide"}
                    language="en"
                    containerStyle={{
                        height: 54,
                        width: 150,
                        marginVertical: 10,
                        borderColor: "#303030",
                        alignItems: "center",
                        marginHorizontal: 10,
                        padding: 10,
                        backgroundColor: "white",
                        borderRadius: 5,
                        borderWidth: 2,
                        // fontSize: 16,
                        // color: "#000",
                    }}
                    pickerTitleStyle={{
                        justifyContent: "center",
                        flexDirection: "row",
                        alignSelf: "center",
                        fontWeight: "bold",
                    }}
                    // dropDownImage={require("./res/ic_drop_down.png")}
                    selectedCountryTextStyle={{
                        paddingLeft: 5,
                        color: "#000",
                        textAlign: "right",
                    }}
                    countryNameTextStyle={{
                        paddingLeft: 10,
                        color: "#000",
                        textAlign: "right",
                    }}
                    pickerTitle={"Country Picker"}
                    searchBarPlaceHolder={"Search......"}
                    hideCountryFlag={false}
                    hideCountryCode={false}
                    searchBarStyle={{ flex: 1 }}
                    backButtonImage={require("./res/ic_back_black.png")}
                    searchButtonImage={require("./res/ic_search.png")}
                    countryCode={"1"}
                    selectedValue={setCountryCode}
                /> */}

                <PrimaryCustomTextInput
                    containerStyle={{
                        // backgroundColor: 'red',
                        paddingHorizontal: wp(3)
                    }}
                    leftComponent={
                        // need to changes in library
                        <CountryPicker
                            disable={false}
                            selectedValue={setCountryCode}
                            hideCountryCode
                            searchBarPlaceHolder={'Select your country'}
                            countryFlagStyle={{
                                width: wp(8),
                                height: wp(6),
                            }}
                        // containerStyle={{
                        //     // backgroundColor: 'yellow',
                        // }}
                        // dropDownImageStyle={{
                        //     // marginLeft: wp(2)
                        // }}
                        // searchBarContainerStyle={{
                        //     // backgroundColor: 'red'
                        // }}
                        // searchBarStyle={{
                        //     backgroundColor: 'yellow'
                        // }}
                        // hideCountryFlag
                        // backButtonImage={AppIcons.back}
                        />}
                    placeholder={'Enter Phone Number'}
                />

                <CustomDropdownMenu
                    data={genderMenu}
                    selectedItem={gender}
                    onSelectItem={(item) => {
                        console.log('item = > ', { item })
                        setGender(item)
                    }}
                    placeholderText={'Select Gender'}

                />

                <PrimaryCustomButton
                    title={'Save Profile'}
                    containerStyle={{
                        marginVertical: hp(2),
                        elevation: 4
                    }}
                    titleStyle={{
                        color: Colors.PRIMARY_BACKGROUND
                    }}
                    onPress={() => console.log('Save profile')}
                />


                <DatePicker
                    date={new Date()}
                    modal
                    open={isDateModal}
                    mode={'date'}
                    onCancel={() => setIsDateModal(false)}
                    onConfirm={() => setIsDateModal(false)}
                    androidVariant={'iosClone'}
                    title={null}
                />

            </ScrollView>
        </View>
    )
};

export default FillProfileScreen;

const useStyles = () => {
    return StyleSheet.create({
        imageContainer: {
            backgroundColor: Colors.PRIMARY,
            height: wp(25),
            width: wp(25),
            borderRadius: wp(50),
            alignSelf: 'center'
        },
        image: {
            resizeMode: 'contain',
            borderRadius: wp(50),
            height: wp(25),
            width: wp(25)
        }
    });
};