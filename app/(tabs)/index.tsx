import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '../../i18n';
import LanguageSelector from '../Components/LanguageSelector';


export default function HomeScreen(): JSX.Element {
  const navigation = useNavigation<any>();
  const [, forceUpdate] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((prev) => !prev);
    }, 500);
return () => clearInterval(interval);
}, []);

  return (
    <ImageBackground
      source={{ uri: 'https://bo.booking.lightresa.com/storage/images/ff211430-7c3f-11ed-8200-bb217364b5ad/20241111160522-et87d.jpg' }}
      style={styles.background}
      blurRadius={2}
    >
        <View style={{ marginBottom: -15, top: -7, left: 10, }}>
             <Image
              source={{ uri: 'https://www.magichotelsandresorts.com/assets/images/png/logo.png',}}
              style={{ width: 100, height: 60, resizeMode: 'contain' }}
              />
        </View>
    <LanguageSelector />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{i18n.t('welcome')}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Piscine')}
        >
          <Icon name="pool" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>{i18n.t('buttonPiscine')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TransportForm')}
        >
          <Icon name="bus" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>{i18n.t('buttonTransport')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Restaurant')}
        >
          <Icon name="silverware-fork-knife" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>{i18n.t('buttonRestaurant')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f9b300',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  icon: {
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
