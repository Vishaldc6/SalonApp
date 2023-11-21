import React, { useState, memo } from 'react';
import { Pressable, StyleSheet, View, ScrollView, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { AppIcons } from '../utils';
import BaseText from './BaseText';
import PrimaryCustomTextInput from './PrimaryCustomTextInput';
import { Colors, FontSizes } from '../styles';


interface CustomDropdownMenuProps {
    data: { id: number, title: string }[],
    onSelectItem: (item: { id: number, title: string }) => void,
    selectedItem?: { id: number, title: string },
    placeholderText?: string
};

const CustomDropdownMenu = (props: CustomDropdownMenuProps) => {

    const styles = useStyles()
    const [isMenuVisiable, setisMenuVisiable] = useState(false)

    return (
        <View>
            <Pressable onPress={() => setisMenuVisiable(!isMenuVisiable)}>
                <PrimaryCustomTextInput
                    value={props.selectedItem?.title}
                    onChangeText={(val) => console.log(val)}
                    placeholder={props.placeholderText}
                    rightComponent={<View style={styles.arrowContainer}>
                        <Image source={AppIcons.down_arrow}
                            resizeMode='contain'
                            style={{
                                ...styles.arrowIcon,
                                transform: [{ rotate: isMenuVisiable ? '180deg' : '0deg' }]
                            }} />
                    </View>}
                    editable={false}
                    containerStyle={{ marginBottom: 2 }}
                />
            </Pressable>
            {isMenuVisiable &&
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.menuListContainer}>
                        {props.data.map((item, index) =>
                            <><BaseText
                                onPress={() => {
                                    props.onSelectItem(item)
                                    setisMenuVisiable(!isMenuVisiable)
                                }}
                            >{item.title}</BaseText>
                                {index !== props.data.length - 1 && <View style={{
                                    marginVertical: hp(1),
                                    borderBottomColor: '#bbb',
                                    borderBottomWidth: StyleSheet.hairlineWidth
                                }} />}
                            </>
                        )}
                    </View>
                </ScrollView>
            }

        </View>
    )
};

export default memo(CustomDropdownMenu);

const useStyles = () => {
    return StyleSheet.create({
        arrowContainer: {
            justifyContent: 'center',
            paddingRight: wp(3)
        },
        arrowIcon: {
            width: wp(5),
            height: wp(5)
        },
        scrollContainer: {
            zIndex: 23,
            position: 'absolute',
            top: wp(16),
            left: 0, right: 0,
            borderRadius: hp(2),
            backgroundColor: Colors.DROPDOWN_MENU_BACKGROUND,
            elevation: 2,
            maxHeight: hp(20)
        },
        menuListContainer: {
            paddingHorizontal: wp(3),
            paddingVertical: hp(1)
        }
    });
};