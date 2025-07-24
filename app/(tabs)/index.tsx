import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '../../i18n';
import LanguageSelector from '../Components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import Header from '../Components/header';
import { Waves, Bus } from 'lucide-react-native';

export default function HomeScreen(): JSX.Element {
  const navigation = useNavigation<any>();

  useLanguage();
  return (
      <>
    <ImageBackground
      source={{ uri: 'https://images.trvl-media.com/lodging/11000000/10390000/10387200/10387148/2b504520.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill' }}
      style={styles.background}
      blurRadius={2}
    >
        <Header />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <SafeAreaView style={styles.container}>
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>{i18n.t('welcome')}</Text>
              <Text style={styles.welcomeText}>
                {i18n.t('welcometext')}
              </Text>
            </View>

            {/* Service Cards */}
            <View style={styles.servicesContainer}>
              <TouchableOpacity
                style={styles.serviceCard}
                onPress={() => navigation.navigate('Piscine')}
                activeOpacity={0.8}>
                <View style={styles.iconCircle}>
                  <Waves size={32} color="white" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{i18n.t('buttonPiscine')}</Text>
                  <Text style={styles.cardDescription}>
                    {i18n.t('descriptionPiscine')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.serviceCard}
                onPress={() => navigation.navigate('TransportForm')}
                activeOpacity={0.8}>
                <View style={styles.iconCircle}>
                  <Bus size={32} color="white" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{i18n.t('buttonTransport')}</Text>
                  <Text style={styles.cardDescription}>
                    {i18n.t('descriptionTransport')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.serviceCard}
                onPress={() => navigation.navigate('Restaurant')}
                activeOpacity={0.8}>
                <View style={styles.iconCircle}>
                  <Icon name="silverware-fork-knife" size={32} color="white" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{i18n.t('buttonRestaurant')}</Text>
                  <Text style={styles.cardDescription}>
                    {i18n.t('descriptionRestaurant')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
    </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 24,
  },
  servicesContainer: {
    gap: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  serviceCard: {
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 100,
    overflow: 'hidden',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 122, 255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
    textAlign: 'left',
  },
  cardDescription: {
    fontSize: 12,
    color: '#333',
    textAlign: 'left',
    lineHeight: 18,
  },
});
