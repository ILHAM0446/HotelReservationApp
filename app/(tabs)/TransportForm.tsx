import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,Switch,ScrollView,Alert,TouchableOpacity,Platform,Modal,ImageBackground,SafeAreaView,KeyboardAvoidingView,Image,} from 'react-native';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Select from '../Components/Select';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { styles as inputStyles } from '../Components/Input';
import { Calendar, Bus, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CalculCodePromo from '../Components/CodePromo';
import i18n from '../../i18n';
import LanguageSelector from '../Components/LanguageSelector';
import { Formstyles } from '../Components/Style';
import { fetchHoursByType, checkCapacity } from '../api/transportAPI';
import { useLanguage } from '../context/LanguageContext';

export default function TransportReservationForm() {
  const { language } = useLanguage();
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [reservationCode, setReservationCode] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [hasPromo, setHasPromo] = useState(false);
  const [departurePlace, setDeparturePlace] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [hoursOptions, setHoursOptions] = useState([]);

  const formatDateForAPI = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const ADULT_PRICE = 30;
  const CHILD_PRICE = 30;

  const calculateTotal = () =>
    (adults * ADULT_PRICE + children * CHILD_PRICE).toFixed(2);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const DataCode = {
    MAGIC: { type: 'reduction', valeur: 10 },
    ILHAM22: { type: 'dh', valeur: 100 },
    ILHAM: { type: 'gratuit', valeur: 0 },
  };

  const { FinalPrice, statutcode } = CalculCodePromo(
    promoCode,
    DataCode[promoCode]?.type,
    DataCode[promoCode]?.valeur,
    calculateTotal()
  );

  const lieux = [
    { label: i18n.t('choose'), value: 'choisir' },
    { label: 'Aqua Mirage', value: 'aqua' },
    { label: 'Jamaa El Fna', value: 'jamaa' },
  ];

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!lastName || !firstName || !email || !date || !validateEmail(email)) {
      alert(i18n.t('error'));
      return;
    }

    if (!departurePlace || !departureTime) {
      alert(i18n.t('chooseDeparture'));
      return;
    }

    try {
      const formattedDate = formatDateForAPI(date);

      const capacityResponse = await checkCapacity({
        date: formattedDate,
        heure: departureTime,
        adults,
        children,
      });
      console.log('Réponse complète de checkCapacity:', capacityResponse);


      const { code, status, message } = capacityResponse;

      if (code === 200 && status) {
        setSuccessMessageVisible(true);
      } else if (code === 400) {
        Alert.alert('Capacité insuffisante', message || 'Aucune place disponible.');
      } else if (code === 500) {
        Alert.alert('Erreur serveur', message || 'Une erreur technique est survenue.');
      } else {
        Alert.alert('Erreur inconnue', 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      Alert.alert('Erreur réseau', 'Impossible de contacter le serveur');
    }
  };

  const handleDeparturePlaceChange = async (selectedPlace) => {
    setDeparturePlace(selectedPlace);
    setDepartureTime('');

    if (!selectedPlace || selectedPlace === 'choisir') {
      setHoursOptions([]);
      return;
    }

    try {
      const options = await fetchHoursByType(selectedPlace);
      setHoursOptions(options);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de récupérer les horaires');
    }
  };


  return (
    <>
      {isVisible && (
              <View style={Formstyles.fakeModalWrapper}>
        <ImageBackground
          source={{
            uri: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg',
          }}
          style={Formstyles.backgroundImage}
        >

    <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 , marginBottom: -50}}
          >
          <LinearGradient
            colors={['rgba(28, 74, 224, 0.4)', 'rgba(59, 130, 246, 0.6)']}
            style={Formstyles.overlay}
          >
            <SafeAreaView style={Formstyles.modalOverlay}>
              <ScrollView contentContainerStyle={Formstyles.scrollContainer}>
             <View style={{ marginBottom: -15, top: -7, left: 10, }}>
             <Image
              source={{ uri: 'https://www.magichotelsandresorts.com/assets/images/png/logo.png',}}
              style={{ width: 100, height: 60, resizeMode: 'contain' }}
              />
        </View>
                <LanguageSelector />

                <View style={Formstyles.formContainer}>
                  <View style={Formstyles.formHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Bus size={24} color="#1e40af" style={{ marginRight: 8 }} />
                      <Text style={Formstyles.formHeaderText}>
                        {i18n.t('transportTitle')}
                      </Text>
                    </View>
                  </View>

                  <View style={Formstyles.FlexContainer}>
                    <View style={Formstyles.inputField}>
                      <Input label={i18n.t('name')} value={lastName} onChangeText={setLastName} />
                    </View>
                    <View style={Formstyles.inputField}>
                      <Input
                        label={i18n.t('firstName')}
                        value={firstName}
                        onChangeText={setFirstName}
                      />
                    </View>
                  </View>
              <View style={Formstyles.FlexContainer}>
                <View style={Formstyles.inputField}>
                  <Input
                    label={i18n.t('email')}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                 </View>
                 <View style={Formstyles.inputField}>
                  <Input
                    label={i18n.t('reservationCode')}
                    value={reservationCode}
                    onChangeText={setReservationCode}
                  />
                </View>
               </View>
                  <Select
                    label={i18n.t('departurePlace')}
                    selectedValue={departurePlace}
                    onValueChange={handleDeparturePlaceChange}
                    items={lieux}
                  />

                  <View style={[inputStyles.inputContainer, { marginBottom: 10 }]}>
                    <Text style={inputStyles.label}>{i18n.t('departureDate')}</Text>
                    <TouchableOpacity
                      style={[
                        inputStyles.input,
                        { flexDirection: 'row', alignItems: 'center' },
                      ]}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Calendar size={20} color="#666" />
                      <Text style={{ marginLeft: 8 }}>{date.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChangeDate}
                      />
                    )}
                  </View>

                  <Select
                    label={i18n.t('departureTime')}
                    selectedValue={departureTime}
                    onValueChange={setDepartureTime}
                    items={hoursOptions}
                  />

              <View style={Formstyles.FlexContainer}>
                <View style={Formstyles.inputField}>
                  <Input
                    label={i18n.t('adults')}
                    value={String(adults)}
                    onChangeText={(text) => setAdults(Number(text))}
                    keyboardType="numeric"
                  />
                  </View>
                 <View style={Formstyles.inputField}>
                  <Input
                    label={i18n.t('children')}
                    value={String(children)}
                    onChangeText={(text) => setChildren(Number(text))}
                    keyboardType="numeric"
                  />
                  </View>
                 </View>

                  <View style={Formstyles.promoHeader}>
                    <Text>{i18n.t('usePromo')}</Text>
                    <Switch
                      value={hasPromo}
                      onValueChange={(value) => {
                        setHasPromo(value);
                        if (!value) setPromoCode('');
                      }}
                    />
                  </View>

                  {hasPromo && (
                    <Input
                      label={i18n.t('promoCode')}
                      value={promoCode}
                      onChangeText={setPromoCode}
                      placeholder="Code"
                    />
                  )}

                  {statutcode && (
                    <Text style={{ color: '#7ac277' }}>{i18n.t('applySuccess')}</Text>
                  )}

                  <View style={Formstyles.totalContainer}>
                    <Text style={Formstyles.totalLabel}>{i18n.t('totalPrice')}</Text>
                    <Text style={Formstyles.totalPrice}>
                      {statutcode ? `${FinalPrice} DH` : `${calculateTotal()} DH`}
                    </Text>
                  </View>

                  <Button title={i18n.t('validate')} onPress={handleSubmit} />
                  </View>
                  <View style={Formstyles.scheduleToggle}>
                    <Text style={Formstyles.switchLabel}>Voir les horaires et prix</Text>
                    <Switch
                      value={showSchedule}
                      onValueChange={setShowSchedule}
                      trackColor={{ false: '#ccc', true: '#AECDF7' }}
                      thumbColor={showSchedule ? '#1e40af' : '#1e40af'}
                    />
                  </View>

                {showSchedule && (
                  <View style={Formstyles.scheduleContainer}>
                    <Text style={Formstyles.scheduleTitle}>Horaires et Tarifs</Text>

                    <Text style={Formstyles.scheduleSubtitle}>Aqua Mirage → Jamaa El Fna</Text>
                    <Text style={Formstyles.scheduleText}>
                      10h00 : 30 Dhs{'\n'}
                      12h30 : Gratuit / Free of charge{'\n'}
                      14h30 : 30 Dhs{'\n'}
                      16h00 : 30 Dhs{'\n'}
                      17h30 : 30 Dhs{'\n'}
                      19h00 : Gratuit / Free of charge{'\n'}
                      20h00 : 30 Dhs{'\n'}
                      23h00 : Gratuit / Free of charge
                    </Text>

                    <Text style={Formstyles.scheduleSubtitle}>Jamaa El Fna → Aqua Mirage</Text>
                    <Text style={Formstyles.scheduleText}>
                      10h30 : Gratuit / Free of charge{'\n'}
                      13h00 : 30 Dhs{'\n'}
                      15h00 : Gratuit / Free of charge{'\n'}
                      16h30 : 30 Dhs{'\n'}
                      18h00 : 30 Dhs{'\n'}
                      19h30 : 30 Dhs{'\n'}
                      22h30 : 30 Dhs{'\n'}
                      23h30 : Gratuit / Free of charge
                    </Text>
                  </View>
                )}

              </ScrollView>
            </SafeAreaView>
          </LinearGradient>
          </KeyboardAvoidingView>
        </ImageBackground>
       </View>
            )}
      <Modal visible={successMessageVisible} transparent animationType="fade" onRequestClose={()=> setSuccessMessageVisible(false)}>
                      <View style={Formstyles.successOverlay}>
                          <View style={Formstyles.successContainer}>
                              <View style={Formstyles.successHeader}>
                                  <View style={Formstyles.successIcon}>
                                      <Check size={24} color="white" />
                                  </View>
                                  <Text style={Formstyles.successTitle}>{i18n.t('confirmedReservation')}</Text>
                              </View>

                              <View style={Formstyles.successContent}>
                                  <View style={Formstyles.successRow}>
                                      <Text style={Formstyles.successLabel}>{i18n.t('fieldName')}:</Text>
                                      <Text style={Formstyles.successValue}>{firstName} {lastName}</Text>
                                  </View>
                                  <View style={Formstyles.successRow}>
                                      <Text style={Formstyles.successLabel}>{i18n.t('fieldEmail')}:</Text>
                                      <Text style={Formstyles.successValue}>{email}</Text>
                                  </View>
                                  <View style={Formstyles.successRow}>
                                      <Text style={Formstyles.successLabel}>{i18n.t('fieldPlace')}:</Text>
                                      <Text style={Formstyles.successValue}>{departurePlace}</Text>
                                  </View>
                                  <View style={Formstyles.successRow}>
                                      <Text style={Formstyles.successLabel}>{i18n.t('fieldDate')}::</Text>
                                      <Text style={Formstyles.successValue}>{date.toDateString()}</Text>
                                  </View>
                                  <View style={Formstyles.successRow}>
                                      <Text style={Formstyles.successLabel}>{i18n.t('fieldTime')}:</Text>
                                      <Text style={Formstyles.successValue}>{departureTime}</Text>
                                  </View>
                              </View>

                              <View style={Formstyles.successTotal}>
                                  <Text style={Formstyles.successTotalText}>
                                    {i18n.t('total')}: {statutcode ? `${FinalPrice} DH` : `${calculateTotal()} DH`}
                                  </Text>
                              </View>

                              <TouchableOpacity
                                  style={Formstyles.closeButton}
                                  onPress={()=> setSuccessMessageVisible(false)}
                                  >
                                  <Text style={Formstyles.closeButtonText}>{i18n.t('close')}</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </Modal>
    </>
  );
}



