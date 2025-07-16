import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { locale, setLocale } = useLanguage();

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const changeLanguage = (lang: 'fr' | 'en') => {
    setLocale(lang);
    setMenuVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={toggleMenu} style={styles.button}>
        <Image
          source={
            locale === 'fr'
              ? require('../assets/flags/fr.png')
              : require('../assets/flags/en.png')
          }
          style={styles.flag}
        />
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.option} onPress={() => changeLanguage('fr')}>
            <Image source={require('../assets/flags/fr.png')} style={styles.flag} />
            <Text style={styles.label}>Français</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => changeLanguage('en')}>
            <Image source={require('../assets/flags/en.png')} style={styles.flag} />
            <Text style={styles.label}>English</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
  },
  button: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  flag: {
    width: 24,
    height: 18,
    resizeMode: 'contain',
    marginRight: 4,
  },
  arrow: {
    fontSize: 12,
    color: 'white',
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    width: 120,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
  },
});
