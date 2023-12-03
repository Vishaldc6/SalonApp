import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AppImages, AppStrings, AsyncStorageKey, setStorage} from '../../utils';
import {BaseText, PrimaryCustomButton} from '../../components';
import {Colors, FontSizes, useGlobalStyles} from '../../styles';
import {useCustomNavigation} from '../../hooks';

interface OnBoardingDataType {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

const OnboardingScreen = () => {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const navigation = useCustomNavigation('AuthStack');
  const flatListRef = useRef<FlatList>(null);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const onBoardingData: OnBoardingDataType[] = [
    {
      id: '1',
      title: AppStrings.onboarding.onboarding1,
      image: AppImages.onBoarding1,
    },
    {
      id: '2',
      title: AppStrings.onboarding.onboarding2,
      image: AppImages.onBoarding2,
    },
    {
      id: '3',
      title: AppStrings.onboarding.onboarding3,
      image: AppImages.onBoarding3,
    },
  ];

  // handle scroll/swipe screen
  const handleScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / wp(100));
    setCurrentScreenIndex(index);
  };

  // Manage onPress next button
  const handleNext = (index: number) => {
    if (index < onBoardingData?.length - 1) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: index + 1,
      });
    } else {
      storeOnboardingVisit();
      navigation.navigate('AuthStack', {
        screen: 'InitialAuthScreen',
      });
    }
  };

  // hide onboarding with save visit value on first time
  const storeOnboardingVisit = async () => {
    await setStorage(AsyncStorageKey.IS_ON_BOARDING, true);
  };

  const renderItem = (item: OnBoardingDataType) => (
    <View style={{width: wp(92)}}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={globalStyles.centerContainer}>
        <BaseText style={styles.title}>{item.title}</BaseText>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.appContainer}>
      <FlatList
        ref={flatListRef}
        data={onBoardingData}
        keyExtractor={item => item.id}
        renderItem={({item}) => renderItem(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        contentContainerStyle={{flexGrow: 1}}
      />

      <View style={styles.indicatorRowContainer}>
        {onBoardingData.map((_, index) => (
          <View
            style={[
              styles.indicator,
              index == currentScreenIndex
                ? styles.activeIndicator
                : styles.inActiveIndicator,
            ]}
          />
        ))}
      </View>

      <PrimaryCustomButton
        title={
          currentScreenIndex !== onBoardingData.length - 1
            ? AppStrings.onboarding.next
            : AppStrings.onboarding.get_started
        }
        onPress={() => handleNext(currentScreenIndex)}
        containerStyle={{marginVertical: hp(3)}}
      />
    </View>
  );
};

export default OnboardingScreen;

const useStyles = () => {
  const globalStyles = useGlobalStyles();

  return StyleSheet.create({
    image: {
      height: wp(100),
      width: wp(90),
      alignSelf: 'center',
    },
    title: {
      fontSize: FontSizes.FONT_SIZE_18,
      textAlign: 'center',
      fontWeight: '500',
      paddingHorizontal: wp(5),
    },
    indicatorRowContainer: {
      ...globalStyles.rowCenterContainer,
      marginVertical: hp(2),
    },
    indicator: {
      height: wp(2),
      borderRadius: wp(1),
      marginHorizontal: wp(1),
    },
    activeIndicator: {
      backgroundColor: Colors.PRIMARY,
      width: wp(9),
    },
    inActiveIndicator: {
      backgroundColor: Colors.GREY,
      width: wp(3),
    },
  });
};
