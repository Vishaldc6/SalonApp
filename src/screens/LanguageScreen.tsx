import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {useCustomNavigation} from '../hooks';
import {FontSizes, useGlobalStyles} from '../styles';
import {BaseText, CustomHeader, CustomRadioButton} from '../components';

interface LanguageType {
  id: number;
  key: string;
  title: string;
}

const LanguageList: LanguageType[] = [
  {
    id: 0,
    key: 'eng_us',
    title: 'English (US)',
  },
  {
    id: 1,
    key: 'eng_uk',
    title: 'English (UK)',
  },
  {
    id: 2,
    key: 'hnd',
    title: 'Hindi',
  },
  {
    id: 3,
    key: 'guj',
    title: 'Gujarati',
  },
  {
    id: 4,
    key: 'mrt',
    title: 'Marathi',
  },
];

const LanguageScreen = () => {
  const styles = useStyle();
  const globalStyles = useGlobalStyles();
  const navigation = useCustomNavigation('LanguageScreen');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(
    LanguageList[0],
  );

  const renderMenu = useCallback(
    ({item}: {item: LanguageType}) => {
      return (
        <View style={styles.menutile}>
          <BaseText style={styles.menuTitle}>{item.title}</BaseText>
          <CustomRadioButton
            value={item.key === selectedLanguage.key}
            onChange={() => setSelectedLanguage(item)}
          />
        </View>
      );
    },
    [selectedLanguage],
  );

  return (
    <View style={globalStyles.flexContainer}>
      <CustomHeader
        title={'Language'}
        canGoBack
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={LanguageList}
        renderItem={renderMenu}
        contentContainerStyle={globalStyles.appContainer}
      />
    </View>
  );
};

export default LanguageScreen;

const useStyle = () => {
  return StyleSheet.create({
    menutile: {
      flexDirection: 'row',
      paddingVertical: wp(2),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menuTitle: {
      marginHorizontal: wp(2),
      fontWeight: '600',
      fontSize: FontSizes.FONT_SIZE_18,
    },
  });
};
