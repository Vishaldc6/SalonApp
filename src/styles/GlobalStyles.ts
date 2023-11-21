import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const useGlobalStyles = () => {

    return StyleSheet.create({
        flexContainer: {
            flex: 1
        },
        appContainer: {
            flex: 1,
            paddingHorizontal: wp(4)
        },
        centerContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        rowCenterContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
};