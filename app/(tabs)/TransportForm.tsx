import React, { useState,useEffect } from 'react';
import {View,Text,StyleSheet,Switch,ScrollView,Alert,TouchableOpacity,Platform,Modal,ImageBackground,SafeAreaView,KeyboardAvoidingView,Image,Pressable} from 'react-native';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Select from '../Components/Select'; // Assurez-vous que ce Select est bien celui modifié
import DateTimePicker from '@react-native-community/datetimepicker';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { styles as inputStyles } from '../Components/Input';
import { Calendar, Bus, Check } from 'lucide-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Formstyles } from '../Components/Style';
import i18n from '../../i18n';
import Header from '../Components/header';
import CheckBox from '@react-native-community/checkbox';
import LanguageSelector from '../Components/LanguageSelector';
import { checkPromoCode, fetchHoursByType, checkCapacity,checkReservation } from '../api/transportAPI';
import { useLanguage } from '../context/LanguageContext';
import useCheckCapacity from '../Components/useCheckCapacity';
import { useRouter } from 'expo-router';

export default function TransportReservationForm() {
  const { locale } = useLanguage();
  const router = useRouter();
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [reservationCode, setReservationCode] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [hasPromo, setHasPromo] = useState(false);
  const [promoType, setPromoType] = useState();
  const [promoValeur, setPromoValeur] = useState();
  const [promoMessage, setPromoMessage] = useState('');
  const [promoStatus, setPromoStatus] = useState<'success' | 'error' | ''>('');
  const [departurePlace, setDeparturePlace] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedAdultPrice, setSelectedAdultPrice] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [departureOptions, setDepartureOptions] = useState([]);
  const [returnOptions, setReturnOptions] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [hoursOptions, setHoursOptions] = useState([]);
  const { serverMessage, isCapacityOk } = useCheckCapacity({adults,children,date,hour: departureTime,});
  const [paymentPayload, setPaymentPayload] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');

  // Nouveaux états pour la validation des champs
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [lastNameError, setLastNameError] = useState('');
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [reservationCodeTouched, setReservationCodeTouched] = useState(false);
  const [reservationCodeError, setReservationCodeError] = useState('');
  const [adultsTouched, setAdultsTouched] = useState(false);
  const [adultsError, setAdultsError] = useState('');
  const [childrenTouched, setChildrenTouched] = useState(false);
  const [departurePlaceTouched, setDeparturePlaceTouched] = useState(false); // Nouveau
  const [departurePlaceError, setDeparturePlaceError] = useState(''); // Nouveau
  const [departureTimeTouched, setDepartureTimeTouched] = useState(false); // Nouveau
  const [departureTimeError, setDepartureTimeError] = useState(''); // Nouveau
  const [formSubmitted, setFormSubmitted] = useState(false); // Similaire à isvalide

  const resetForm = () => {
    setLastName('');
    setFirstName('');
    setEmail('');
    setReservationCode('');
    setPromoCode('');
    setHasPromo(false);
    setPromoType(undefined);
    setPromoValeur(undefined);
    setPromoMessage('');
    setPromoStatus('');
    setDeparturePlace('');
    setDepartureTime('');
    setAdults(1);
    setChildren(0);
    setSelectedAdultPrice(0);
    setDate(new Date());
    setShowDatePicker(false);
    setShowSchedule(false);
    setHoursOptions([{ label: i18n.t('select'), value: '' }]);
    setPaymentPayload(null);
    setPaymentStatus('');
    setSuccessMessageVisible(false);

    // Réinitialisation des états de validation
    setLastNameTouched(false); setLastNameError('');
    setFirstNameTouched(false); setFirstNameError('');
    setEmailTouched(false); setEmailError('');
    setAdultsTouched(false); setAdultsError('');
    setDeparturePlaceTouched(false); setDeparturePlaceError(''); // Nouveau
    setDepartureTimeTouched(false); setDepartureTimeError(''); // Nouveau
    setFormSubmitted(false);
  };
  useEffect(() => {
    resetForm();
  }, [locale]);

  const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };
  const lieux = [
    { label: i18n.t('select'), value: 'choisir' },
    { label: 'Aqua Mirage', value: 'aqua' },
    { label: 'Jamaa El Fna', value: 'jamaa' },
  ];

  const handleDeparturePlaceChange = async (selectedPlace) => {
      setDeparturePlace(selectedPlace);
      setDepartureTime('');
      if (!selectedPlace || selectedPlace === 'choisir') {
        setHoursOptions([{ label: i18n.t('select'), value: '' }]);
        return;
      }
      try {
        const options = await fetchHoursByType(selectedPlace);
        setHoursOptions(options);
      } catch (error) {
        Alert.alert('Erreur', i18n.t('missedTime'));
      }
    };

    const handlePromoCodeChange = (text: string) => {
      setPromoCode(text);
      setPromoMessage('');
      setPromoStatus('');
    };

    const validatePromoCode = async () => {
      if (!promoCode.trim()) {
        setPromoMessage(`❌ ${i18n.t('missedPromoCode')}` );
        setPromoStatus('error');
        return;
      }

    const result = await checkPromoCode(promoCode.trim());
      console.log(result);

      if (result.success) {
        setPromoType(result.data.type);
        setPromoValeur(result.data.reduction);
        setPromoMessage(` ${result.message}`);
        setPromoStatus('success');
      } else {
        setPromoType(undefined);
        setPromoValeur(undefined);
        setPromoMessage(` ${result.message}`);
        setPromoStatus('error');
      }
    };

    const handleTimeChange = (selectedHour) => {
      setDepartureTime(selectedHour);
      const selectedOption = hoursOptions.find((opt) => opt.value === selectedHour);
      if (selectedOption && selectedOption.data && typeof selectedOption.data.prix_adult !== 'undefined') {
        setSelectedAdultPrice(Number(selectedOption.data.prix_adult));
        console.log('Prix adulte sélectionné:', selectedOption.data.prix_adult);
      } else {
        setSelectedAdultPrice(0);
      }
    };

    const statutcode = promoType !== undefined && promoValeur !== undefined;
    const calculateTotal = () => {
      const total = adults * selectedAdultPrice;
      return total.toFixed(2);
    };
    const getFinalPrice = () => {
      const total = Number(calculateTotal());
      if (!promoType || promoValeur === undefined) return total;
      if (promoType === 'reduction') {
        return (total - total * (promoValeur / 100)).toFixed(2);
      }
      if (promoType === 'dh') {
        return Math.max(0, total - promoValeur).toFixed(2);
      }
      if (promoType === 'gratuit') {
        return '0.00';
      }
      return total.toFixed(2);
    };

    useEffect(() => {
      const loadSchedule = async () => {
        try {
          const Departure = await fetchHoursByType('aqua');
          const Return = await fetchHoursByType('jamaa');
          setDepartureOptions(Departure.slice(1));
          setReturnOptions(Return.slice(1));
        } catch (err) {
          console.error('Erreur lors du chargement des horaires', err);
        }
      };

      loadSchedule();
    }, []);

  const handleSubmit = async () => {
    setFormSubmitted(true); // Déclenche l'affichage des styles de validation

    let formIsValid = true;

    // Validation lastName
    setLastNameTouched(true);
    if (!lastName) { setLastNameError(' '); formIsValid = false; } else { setLastNameError(''); }

    // Validation firstName
    setFirstNameTouched(true);
    if (!firstName) { setFirstNameError(' '); formIsValid = false; } else { setFirstNameError(''); }

    // Validation email
    setEmailTouched(true);
    if (!email || !validateEmail(email)) { setEmailError(i18n.t('invalidEmail')); formIsValid = false; } else { setEmailError(''); }
    setReservationCodeTouched(true);
    if (!reservationCode) { setReservationCodeError(' '); formIsValid = false; } else { setReservationCodeError(''); }

    // Validation adults
    setAdultsTouched(true);
    if (Number(adults) < 1 || isNaN(Number(adults))) { setAdultsError(' '); formIsValid = false; } else { setAdultsError(''); }
    setChildrenTouched(true);

    // Validation departurePlace (Select)
    setDeparturePlaceTouched(true);
    if (!departurePlace || departurePlace === 'choisir') {
      setDeparturePlaceError(' ');
      formIsValid = false;
    } else {
      setDeparturePlaceError('');
    }

    // Validation departureTime (Select)
    setDepartureTimeTouched(true);
    if (!departureTime) {
      setDepartureTimeError(' ');
      formIsValid = false;
    } else {
      setDepartureTimeError('');
    }

    if (!formIsValid) {
      return; // Arrête la soumission si une validation échoue
    }

    const formattedTime = departureTime.includes(':')
      ? `${departureTime}:00`
      : `${departureTime.slice(0, 2)}:${departureTime.slice(2)}:00`;

    if (!isCapacityOk) {
      Alert.alert(i18n.t('Capacite3'));
      return;
    }

    const result = await checkReservation({
      departureDate: formatDate(date),
      departureTime: formattedTime,
      adults,
      children,
      reservationCode,
      lastName,
      firstName,
      email,
      departurePlace,
      total: getFinalPrice(),
      promoCode: promoCode || undefined,
    });

    if (result.success) {
      setPaymentStatus(result.data.paymentStatus);
      if (result.data.paymentStatus==='PENDING'){
          setPaymentPayload(result.data);
          setSuccessMessageVisible(true);}
          else if (result.data.free){
              setSuccessMessageVisible(true);
    } else {
      Alert.alert('Erreur', result.message);
    }}
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
            <SafeAreaView style={Formstyles.Overlay}>
              <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={Formstyles.scrollContainer} showsVerticalScrollIndicator={false}>
             <Header />

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
                      <Input
                        label={i18n.t('name')}
                        value={lastName}
                        onChangeText={(text) => {
                          setLastName(text);
                          setLastNameTouched(true);
                          setLastNameError(text ? '' : ' ');
                        }}
                        onBlur={() => {
                          setLastNameTouched(true);
                          setLastNameError(lastName ? '' : ' ');
                        }}
                        touched={lastNameTouched}
                        isvalide={formSubmitted}
                        error={lastNameError}
                      />
                    </View>
                    <View style={Formstyles.inputField}>
                      <Input
                        label={i18n.t('firstName')}
                        value={firstName}
                        onChangeText={(text) => {
                          setFirstName(text);
                          setFirstNameTouched(true);
                          setFirstNameError(text ? '' : ' ');
                        }}
                        onBlur={() => {
                          setFirstNameTouched(true);
                          setFirstNameError(firstName ? '' : ' ');
                        }}
                        touched={firstNameTouched}
                        isvalide={formSubmitted}
                        error={firstNameError}
                      />
                    </View>
                  </View>
              <View style={Formstyles.FlexContainer}>
                <View style={Formstyles.inputField}>
                  <Input
                    label={i18n.t('email')}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setEmailTouched(true);
                      setEmailError(validateEmail(text) ? '' : i18n.t('invalidEmail'));
                    }}
                    placeholder={i18n.t('placeholderEmail')}
                    onBlur={() => {
                      setEmailTouched(true);
                      setEmailError(validateEmail(email) ? '' : i18n.t('invalidEmail'));
                    }}
                    touched={emailTouched}
                    isvalide={formSubmitted}
                    error={emailError}
                    keyboardType="email-address"
                  />
                 </View>
                 <View style={Formstyles.inputField}>
                  <Input
                    label={i18n.t('reservationCode')}
                    value={reservationCode}
                    onChangeText={text => {
                        setReservationCode(text);
                        setReservationCodeTouched(true);
                        setReservationCodeError(text ? '' : ' ');}}
                     onBlur={() => {setReservationCodeTouched(true);
                         setReservationCodeError(reservationCode ? '' : ' ');}}
                   touched={reservationCodeTouched}
                   isvalide={formSubmitted}
                   error={reservationCodeError}
                  />
                </View>
               </View>
                  <Select
                    label={i18n.t('departurePlace')}
                    selectedValue={departurePlace}
                    onValueChange={(value) => {
                      handleDeparturePlaceChange(value);
                      setDeparturePlaceTouched(true);
                      setDeparturePlaceError(value && value !== 'choisir' ? '' : ' ');
                    }}
                    items={lieux}
                    touched={departurePlaceTouched}
                    isvalide={formSubmitted}
                    error={departurePlaceError}
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
                      <Text style={{ marginLeft: 8 }}>{formatDate(date)}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChangeDate}
                        minimumDate={new Date()}
                      />
                    )}
                  </View>

                  <Select
                    label={i18n.t('departureTime')}
                    selectedValue={departureTime}
                    onValueChange={(value) => {
                      handleTimeChange(value);
                      setDepartureTimeTouched(true);
                      setDepartureTimeError(value ? '' : ' ');
                    }}
                    items={hoursOptions}
                    touched={departureTimeTouched}
                    isvalide={formSubmitted}
                    error={departureTimeError}
                  />

              <View style={Formstyles.FlexContainer}>
                <View style={Formstyles.inputField}>
                  <Input
                    label={i18n.t('adults')}
                    value={String(adults)}
                    onChangeText={text => {
                      const num = Number(text);
                      setAdults(num);
                      setAdultsTouched(true);
                      setAdultsError(num < 1 || isNaN(num) ? ' ' : '');
                    }}
                    onBlur={() => {
                      setAdultsTouched(true);
                      setAdultsError(adults < 1 || isNaN(adults) ? ' ' : '');
                    }}
                    touched={adultsTouched}
                    isvalide={formSubmitted}
                    error={adultsError}
                    keyboardType="numeric"
                  />
                  </View>
                 <View style={Formstyles.inputField}>
                  <Input
                    label={i18n.t('children')}
                    value={children === 0 ? '0' : String(children)}
                    onChangeText={text => {
                      setChildren(text === '' ? '' : Number(text));
                      setChildrenTouched(true);
                    }}
                    onBlur={() => {
                      setChildrenTouched(true);
                    }}
                    touched={childrenTouched}
                    isvalide={formSubmitted}
                    keyboardType="numeric"

                  />
                  </View>
                 </View>
                 {serverMessage !== '' && (
                   <Text style={{
                     color: 'red',
                     marginVertical: 5,marginLeft:7,
                   }}>
                     {serverMessage}
                   </Text>
                 )}

                  <View style={Formstyles.promoHeader}>
                    <Text>{i18n.t('usePromo')}</Text>
                    <Switch
                      value={hasPromo}
                      onValueChange={(value) => {
                        setHasPromo(value);
                        if (!value) {
                              setPromoCode('');
                              setPromoMessage('');
                              setPromoStatus('');
                              setPromoType(undefined);
                              setPromoValeur(undefined);
                            }
                      }}
                    />
                  </View>

                  {hasPromo && (
                    <View style={[Formstyles.promoContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                    <View style={{ flex:1 }}>
                      <Input
                        label={i18n.t('promoCode')}
                        value={promoCode}
                        onChangeText={handlePromoCodeChange}
                        placeholder="Code"
                        // Ajoutez ici les props touched, isvalide, error si vous voulez valider ce champ
                      />
                      </View>
                      <TouchableOpacity
                        style={Formstyles.promoButton}
                        activeOpacity={0.8}
                        onPress={validatePromoCode}
                      >
                        <Icon name="check" size={28} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  )}
                      {promoMessage !== '' && (
                        <Text style={{ color: promoStatus === 'success' ? '#7ac277' : 'red', margin:5,marginLeft:8,}}>
                          {promoMessage}
                        </Text>
                      )}

                  <View style={Formstyles.totalContainer}>
                    <Text style={Formstyles.totalLabel}>{i18n.t('totalPrice')}</Text>
                    <Text style={Formstyles.totalPrice}>
                      {statutcode ? `${getFinalPrice()} DH` : `${calculateTotal()} DH`}
                    </Text>

                  </View>

                  <Button title={i18n.t('validate')} onPress={handleSubmit} />
                  </View>
                  <View style={Formstyles.scheduleToggle}>
                    <Text style={Formstyles.switchLabel}>{i18n.t('ScheduleLabel')}</Text>
                    <Switch
                      value={showSchedule}
                      onValueChange={setShowSchedule}
                      trackColor={{ false: '#ccc', true: '#AECDF7' }}
                      thumbColor={showSchedule ? '#1e40af' : '#1e40af'}
                    />
                  </View>
                {showSchedule && (
                  <View style={Formstyles.scheduleContainer}>
                    <Text style={Formstyles.scheduleTitle}>{i18n.t('ScheduleTitle')}</Text>
                    {departureOptions.length > 0 && (
                      <>
                        <Text style={Formstyles.scheduleSubtitle}>Aqua Mirage → Jamaa El Fna</Text>
                        {departureOptions.map((item, index) => (
                          <Text key={index} style={Formstyles.scheduleText}>
                            {item.value} : {item.data.prix_adult === 0 ? 'Gratuit / Free of charge' : `${item.data.prix_adult} Dhs`}
                          </Text>
                        ))}
                      </>
                    )}
                    {returnOptions.length > 0 && (
                      <>
                        <Text style={Formstyles.scheduleSubtitle}>Jamaa El Fna → Aqua Mirage</Text>
                        {returnOptions.map((item, index) => (
                          <Text key={index} style={Formstyles.scheduleText}>
                            {item.value} : {item.data.prix_adult === 0 ? 'Gratuit / Free of charge' : `${item.data.prix_adult} Dhs`}
                          </Text>
                        ))}
                      </>
                    )}
                  </View>
                )}
              </ScrollView>
            </SafeAreaView>
          </LinearGradient>
          </KeyboardAvoidingView>
        </ImageBackground>
       </View>
            )}
                  <Modal visible={successMessageVisible} transparent animationType="fade">
                    <View style={Formstyles.modalOverlay}>
                      <View style={Formstyles.modalCard}>
                        <View style={Formstyles.iconCircle}>
                          <Text style={Formstyles.successIcon}>✔</Text>
                        </View>

                        <Text style={Formstyles.modalTitle}>{i18n.t('ReservationConfirm')}</Text>
                        <Text style={Formstyles.modalSubtitle}>{i18n.t('Thanks')}</Text>

                        <View style={Formstyles.infoBox}>
                          <View style={Formstyles.row}>
                            <Text style={Formstyles.label}>{i18n.t('NomComplet')}:</Text>
                            <Text style={Formstyles.value}>{firstName} {lastName}</Text>
                          </View>
                          <View style={Formstyles.divider} />

                          <View style={Formstyles.row}>
                            <Text style={Formstyles.label}>{i18n.t('fieldEmail')}:</Text>
                            <Text style={Formstyles.value}>{email}</Text>
                          </View>
                          <View style={Formstyles.divider} />

                          <View style={Formstyles.row}>
                            <Text style={Formstyles.label}>{i18n.t('fieldDate')}:</Text>
                            <Text style={Formstyles.value}>{formatDate(date)} {departureTime}</Text>
                          </View>
                          <View style={Formstyles.divider} />
                          <View style={Formstyles.row}>
                            <Text style={Formstyles.label}>{i18n.t('fieldPlace')}:</Text>
                            <Text style={Formstyles.value}>{(lieux.find(item => item.value === departurePlace) || {}).label || departurePlace}</Text>
                            </View>
                          <View style={Formstyles.divider} />
                          <View style={Formstyles.row}>
                            <Text style={Formstyles.labelBold}>{i18n.t('totalPrice')}</Text>
                            <Text style={Formstyles.valueBold}>{statutcode ? `${getFinalPrice()} DH` : `${calculateTotal()} DH`}</Text>
                          </View>
                        </View>

                        {paymentStatus === 'PENDING' && paymentPayload ?
                           <Text style={Formstyles.confirmationNote}>{i18n.t('ResevationPending')}</Text> :
                        <Text style={Formstyles.confirmationNote}>{i18n.t('ResevationComplite')}</Text>}

                        <Pressable
                          onPress={() => {
                            setSuccessMessageVisible(true);
                            if (paymentStatus === 'PENDING' && paymentPayload) {
                              router.push({
                                pathname: '/TransportPayment',
                                params: {
                                  url: paymentPayload.paywallUrl,
                                  payload: paymentPayload.payload,
                                  signature: paymentPayload.signature,
                                },
                              });
                                resetForm();
                                setSuccessMessageVisible(false);
                            } else {
                              resetForm();
                              setSuccessMessageVisible(false);
                            }
                          }}
                          style={({ pressed }) => [
                            Formstyles.ctaButton,
                            pressed && { opacity: 0.7 },
                          ]}
                          accessibilityRole="button"
                          android_ripple={{ color: '#ccc' }}
                        >
                          <Text style={Formstyles.ctaButtonText}>
                            {paymentStatus === 'PENDING' ? i18n.t('payer') : i18n.t('Nouvelle')}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
    </>
  );
}
