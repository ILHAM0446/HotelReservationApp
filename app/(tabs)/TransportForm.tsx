import React, { useState } from 'react';
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
import CheckBox from '@react-native-community/checkbox';

export default function TransportReservationForm() {
  const [_, forceUpdate] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);


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

  const ADULT_PRICE = 30;
  const CHILD_PRICE = 30;

  const calculateTotal = () =>
    (adults * ADULT_PRICE + children * CHILD_PRICE).toFixed(2);

  const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) setDate(selectedDate);
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
    { label: 'Aéroport', value: 'aeroport' },
    { label: 'Gare', value: 'gare' },
    { label: 'Centre-ville', value: 'centre_ville' },
  ];

  const time = [
    { label: i18n.t('choose'), value: 'choisir' },
    { label: '07:00 (30dh)', value: '7h' },
    { label: '13:00 (20dh)', value: '13h' },
  ];

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!lastName || !firstName || !email || !date || !validateEmail(email)) {
      alert(i18n.t('error'));
      return;
    }
    setSuccessMessageVisible(true);
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
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{
                      uri: 'https://www.magichotelsandresorts.com/assets/images/png/logo.png',
                    }}
                    style={{ width: 120, height: 60, resizeMode: 'contain' }}
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
                    onValueChange={setDeparturePlace}
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
                    items={time}
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



const Formstyles = StyleSheet.create({
    fakeModalWrapper: {
         position: 'absolute',
         top: 0,
         bottom: 0,
         left: 0,
         right: 0,
         zIndex: 10,
         backgroundColor: 'rgba(255,255,255,0)', // utile pour cliquer derrière si nécessaire
       },
  backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
  overlay: {
      flex: 1,
    },
  scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
      },
      transparentBackground: {
        backgroundColor: 'transparent',
      },
  formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 20,
        padding: 20,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 100,
        },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      justifyContent: 'center',
    },

  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,

  },

  formHeader: {
    backgroundColor: '#f9b300',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom:25,
  },
  formHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

    titleSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },

  inputContainer: {
    marginBottom: 15,
  },

  FlexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  passengersLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 8,
    fontWeight: '500',
  },

  totalContainer: {
    flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
      backgroundColor: '#FEF3C7',
      paddingHorizontal: 15,
      borderRadius: 8,
      marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
  },
  totalPrice: {
    fontSize: 18,
      fontWeight: 'bold',
      color: '#92400e',
  },
  inputField: {
    flex: 1,
    marginHorizontal: 5,
  },
  promoContainer: {
    paddingHorizontal: 12,
    marginBottom: 0,
  },
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  successOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },

    successContainer: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
      width: '100%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },

    successHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
      paddingBottom: 15,
    },

    successIcon: {
      backgroundColor: '#f9b300',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },

    successTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1f2937',
    },

    successContent: {
      marginVertical: 1,
    },

    successRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },

    successLabel: {
      fontSize: 15,
      color: '#6b7280',
      fontWeight: '500',
      flex: 1,
    },

    successValue: {
      fontSize: 15,
      color: '#1f2937',
      fontWeight: '600',
      flex: 1,
      textAlign: 'right',
    },

    successTotal: {
      marginTop: 15,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
    },

    successTotalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1e40af',
      textAlign: 'center',
    },

    closeButton: {
      marginTop: 13,
      backgroundColor: '#1e40af',
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: 'center',
    },

    closeButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
scheduleContainer: {
  backgroundColor: 'rgba(255, 255, 255, 0.90)',
  borderRadius: 10,
  padding: 16,
  marginBottom:0,
  marginHorizontal:20,
  borderWidth: 1,
  borderColor: '#ddd',
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
  top:-110,
},
scheduleTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
  color: '#1e40af',
  textAlign: 'center',
},
scheduleSubtitle: {
  fontSize: 16,
  fontWeight: '600',
  marginTop: 12,
  marginBottom: 4,
  color: '#333',
},
scheduleText: {
  fontSize: 14,
  color: '#555',
  lineHeight: 20,
},
scheduleToggle: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 12,
  paddingHorizontal: 10,
  paddingVertical: 8,
  top:-100,
},
switchLabel:{
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginLeft:30,
    },

});
