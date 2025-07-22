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


<LinearGradient
        colors={['rgba(30, 64, 175, 0.2)', 'rgba(59, 130, 246, 0.3)']}
        style={styles.overlay}>
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
                      <LinearGradient
                        colors={['#f9b300', '#FFD600']}
                        style={styles.cardGradient}>
                        <View style={styles.cardIcon}>
                          <Waves size={35} color="white" />
                        </View>
                        <Text style={styles.cardTitle}>{i18n.t('buttonPiscine')}</Text>
                        <Text style={styles.cardDescription}>
                          {i18n.t('descriptionPiscine')}
                        </Text>
                        <View style={styles.cardButton}>
                          <Text style={styles.cardButtonText}>{i18n.t('ButtonReserver')}</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.serviceCard}
                      onPress={() => navigation.navigate('TransportForm')}
                      activeOpacity={0.8}>
                      <LinearGradient
                        colors={['#1e40af', '#3b82f6']}
                        style={styles.cardGradient}>
                        <View style={styles.cardIcon}>
                          <Bus size={35} color="white" />
                        </View>
                        <Text style={styles.cardTitle}>{i18n.t('buttonTransport')}</Text>
                        <Text style={styles.cardDescription}>
                          {i18n.t('descriptionTransport')}
                        </Text>
                        <View style={styles.cardButton}>
                          <Text style={styles.cardButtonText}>{i18n.t('ButtonReserver')}</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.serviceCard}
                      onPress={() => navigation.navigate('Restaurant')}
                      activeOpacity={0.8}>
                      <LinearGradient
                        colors={['#f9b300', '#FFD600']}
                        style={styles.cardGradient}>
                        <View style={styles.cardIcon}>
                           <Icon name="silverware-fork-knife" size={35} color="white" />
                        </View>
                        <Text style={styles.cardTitle}>{i18n.t('buttonRestaurant')}</Text>
                        <Text style={styles.cardDescription}>
                          {i18n.t('descriptionRestaurant')}
                        </Text>
                        <View style={styles.cardButton}>
                          <Text style={styles.cardButtonText}>{i18n.t('ButtonReserver')}</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    </View>
                    </SafeAreaView>

</ScrollView>


            </LinearGradient>

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
  },
  cardGradient: {
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical:15,
    marginHorizontal: 10,
  },
  cardIcon: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

});


