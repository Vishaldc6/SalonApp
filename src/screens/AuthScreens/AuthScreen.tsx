import React, { useRef, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Colors, FontSizes, useGlobalStyles } from '../../styles';
import { BaseText, CustomCheckBox, CustomHeader, CustomLoader, PrimaryCustomButton, PrimaryCustomTextInput } from '../../components';
import { AppIcons, AppImages } from '../../utils';
import { AuthButtons } from './InitialAuthScreen';

const AuthScreenType = {
    SIGN_UP: {
        mainTitle: 'Create your account',
        actionTitle: 'Sign up',
        subTitle: 'Already have an account?',
        subActionTitle: 'Sign in'
    },
    SIGN_IN: {
        mainTitle: 'Login to your account',
        actionTitle: 'Sign in',
        subTitle: 'Don\'t have an account?',
        subActionTitle: 'Sign up'
    }
};

const AuthScreen = () => {

    const styles = useStyles()
    const globalStyles = useGlobalStyles()
    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [screenType, setScreenType] = useState<'SIGN_IN' | 'SIGN_UP'>('SIGN_IN')
    const emailFieldRef = useRef<TextInput>(null)
    const passwordFieldRef = useRef<TextInput>(null)

    return (
        <View style={globalStyles.flexContainer}>
            {isLoading && <CustomLoader />}
            <CustomHeader />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.appContainer}>
                <BaseText style={styles.mainText}>{AuthScreenType[screenType].mainTitle}</BaseText>
                <PrimaryCustomTextInput
                    ref={emailFieldRef}
                    // value={''}
                    onChangeText={(val) => console.log(val)}
                    placeholder={'Enter Email'}
                    leftIcon={AppIcons.mail}
                    returnKeyType={'next'}
                    keyboardType={'email-address'}
                    onSubmitEditing={() => passwordFieldRef?.current?.focus()}
                />
                <PrimaryCustomTextInput
                    ref={passwordFieldRef}
                    // value={''}
                    onChangeText={(val) => console.log(val)}
                    placeholder={'Enter Password'}
                    leftIcon={AppIcons.lock}
                    isPasswordField={true}
                />

                <CustomCheckBox
                    value={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    label={'Remember me'}
                    style={{ alignSelf: 'flex-end' }}
                />

                <PrimaryCustomButton
                    title={AuthScreenType[screenType].actionTitle}
                    containerStyle={{
                        marginVertical: hp(2),
                        elevation: 4
                    }}
                    titleStyle={{
                        color: Colors.PRIMARY_BACKGROUND
                    }}
                    onPress={() => console.log('Sign up')}
                />

                <View style={styles.orOptionContainer}>
                    <View style={styles.optionBar} />
                    <BaseText style={{ marginHorizontal: '2%', fontSize: FontSizes.FONT_SIZE_12 }}>{'or continue with'}</BaseText>
                    <View style={styles.optionBar} />
                </View>

                <View style={globalStyles.rowCenterContainer}>
                    {AuthButtons.map(item => (
                        <TouchableOpacity
                            style={styles.authButtonContainer}
                            onPress={item.onPress}
                        >
                            <Image source={item.icon} style={styles.authIcon} />
                        </TouchableOpacity>
                    ))}
                </View>

                <BaseText style={styles.subText}>
                    {AuthScreenType[screenType].subTitle}&nbsp;
                    <BaseText style={{ color: Colors.PRIMARY }} onPress={() => {
                        console.log('Sign up')
                        setIsLoading(true)
                        setTimeout(() => {
                            screenType == 'SIGN_IN' ? setScreenType('SIGN_UP') : setScreenType('SIGN_IN')
                            setIsLoading(false)
                        }, 1000);
                    }}>
                        &nbsp;{AuthScreenType[screenType].subActionTitle}
                    </BaseText>
                </BaseText>
            </ScrollView>
        </View>
    );
};

export default AuthScreen;

const useStyles = () => {
    return StyleSheet.create({
        mainText: {
            paddingVertical: '8%',
            width: '80%',
            fontSize: FontSizes.FONT_SIZE_24,
            fontWeight: '600'
        },
        orOptionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp(3)
        },
        optionBar: {
            flex: 1,
            height: 0.5,
            opacity: 0.3,
            backgroundColor: Colors.PRIMARY_TEXT
        },
        authButtonContainer: {
            flexDirection: 'row',
            borderWidth: 0.3,
            borderRadius: wp(1),
            padding: hp(2),
            marginHorizontal: wp(4),
            marginVertical: hp(1)
        },
        authIcon: {
            marginHorizontal: wp(3),
            height: wp(6),
            width: wp(6)
        },
        subText: {
            fontSize: FontSizes.FONT_SIZE_12,
            textAlign: 'center',
            marginVertical: hp(3)
        }
    })
};