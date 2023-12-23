import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = (key: string, data: any) => {
  if (JSON.stringify(data).length) {
    return new Promise(async (resolve, reject) => {
      await AsyncStorage.setItem(key, JSON.stringify(data))
        .then(res => {
          resolve(res);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};

export const getStorage = (key: string) => {
  return new Promise(async (resolve, reject) => {
    await AsyncStorage.getItem(key)
      .then(res => {
        if (res?.length) {
          resolve(JSON.parse(res));
        } else {
          resolve(null);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const maskedEmail = (email: string) => {
  if (email.length) {
    const [localPart, domain] = email.trim().split('@');

    const maskedLocalPart =
      localPart.length > 4
        ? `${localPart.slice(0, 2)}${'*'.repeat(
            localPart.length - 4,
          )}${localPart.slice(-2)}`
        : localPart.length > 2
        ? `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart.slice(
            -1,
          )}`
        : `${localPart[0]}${'*'.repeat(localPart.length - 1)}`;

    const masked_email = `${maskedLocalPart}@${domain}`;
    return masked_email;
  } else {
    return '';
  }
};

export const maskedPhonnumber = (phoneNumber: string) => {
  if (phoneNumber.length) {
    const [countryCode, rest1, rest2] = phoneNumber.split(' ');

    const maskedPart = `${rest1.slice(0, 2)}${'*'.repeat(
      rest1.length - 2,
    )} ${'*'.repeat(rest2.length - 2)}${rest2.slice(-2)}`;

    const masked_phone_number = `${countryCode} ${maskedPart}`;
    return masked_phone_number;
  } else {
    return '';
  }
};
