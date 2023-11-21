import React, { memo } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomLoader = () => {

    const styles = useStyles()

    return (
        <View style={styles.container}>
            <Image source={require('../assets/loader.gif')} style={styles.loader} />
        </View>
    )
};

export default memo(CustomLoader);

const useStyles = () => {
    return StyleSheet.create({
        container: {
            backgroundColor: '#00000040',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
        },
        loader: {
            height: wp(25),
            width: wp(25),
        }
    });
};