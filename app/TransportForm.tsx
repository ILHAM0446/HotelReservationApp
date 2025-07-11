import React, { useState } from 'react';
import { View, Text, StyleSheet,Switch, ScrollView, Alert, TouchableOpacity, Platform, Modal, ImageBackground, SafeAreaView, Image} from 'react-native';
import Input from './Components/Input';
import Button from './Components/Button';
import Select from './Components/Select';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { styles } from './Components/Input';
import { Calendar,Bus,Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CalculCodePromo from './Components/CodePromo';

export default function TransportReservationForm() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reservationCode, setReservationCode] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [hasPromo, setHasPromo] = useState(false);
  const [departurePlace, setDeparturePlace] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  // Tarifs
  const ADULT_PRICE = 30;
  const CHILD_PRICE = 30;
  const BABY_PRICE = 0;

  // Calcul du prix total
  const calculateTotal = () => {
    let total = adults * ADULT_PRICE + children * CHILD_PRICE ;
    return total.toFixed(2);
  };


  const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
      if (selectedDate) {
        setDate(selectedDate);
      }
      setShowDatePicker(false);
    };

    const DataCode = {
        'MAGIC': { type: 'reduction', valeur: 10 },
        'ILHAM22': { type: 'dh', valeur: 100 },
        'ILHAM': { type: 'gratuit', valeur: 0 },
      };

  const {FinalPrice , statutcode} = CalculCodePromo(promoCode, DataCode[promoCode]?.type, DataCode[promoCode]?.valeur, calculateTotal());

  const lieux = [
    { label: '', value: 'choisir' },
    { label: 'Aéroport', value: 'aeroport' },
    { label: 'Gare', value: 'gare' },
    { label: 'Centre-ville', value: 'centre_ville' },
  ];
  const time = [
      { label: '', value: 'choisir' },
      { label: '07:00 (30dh)', value: '7h' },
      { label: '13:00 (20dh)', value: '13h' },
    ];

  const handleSubmit = () => {
    if (!lastName || !firstName || !email || !date) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    let details = `
  Nom : ${firstName} ${lastName}
  Email : ${email}
  Date : ${date.toDateString()}


  Prix total : ${calculateTotal()} DH
  `;
    setSuccessMessage(details);
    setSuccessMessageVisible(true);
  };

  return (
  <>
  <Modal
      visible={isVisible}
      transparent
      animationType="fade"
    >
  <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg',
      }}
      style={Formstyles.backgroundImage}
      resizeMode="cover"
    >
  <LinearGradient
      colors={['rgba(28, 74, 224, 0.4)', 'rgba(59, 130, 246, 0.6)']}
      style={Formstyles.overlay}>
  <SafeAreaView style={Formstyles.modalOverlay}>
  <ScrollView
        contentContainerStyle={Formstyles.scrollContainer}
        style={Formstyles.transparentBackground}
  >
  {/* Logo en haut */}
  <View style={{ alignItems: 'center', marginBottom: 0 }}>
      <Image
        source={{ uri: 'https://www.magichotelsandresorts.com/assets/images/png/logo.png' }}
        style={{ width: 120, height: 60, resizeMode: 'contain' }}
        />
  </View>
  {/* Header */}
  <View style={Formstyles.formContainer}>
  <View style={Formstyles.formHeader}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Bus size={24} color="#1e40af" style={{ marginRight: 8 }} />
      <Text style={Formstyles.formHeaderText}>RESERVATION TRANSPORT</Text>
    </View>
  </View>
  <View style={Formstyles.FlexContainer}>
    <View style={Formstyles.inputField}>
      <Input
        label="Nom"
        value={lastName}
        onChangeText={setLastName}
      />
    </View>
    <View style={Formstyles.inputField}>
      <Input
        label="Prénom"
        value={firstName}
        onChangeText={setFirstName}
      />
    </View>
  </View>
  <View style={Formstyles.FlexContainer}>
     <View style={Formstyles.inputField}>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
     </View>
     <View style={Formstyles.inputField}>
      <Input
        label="Code de Réservation"
        value={reservationCode}
        onChangeText={setReservationCode}
        placeholder=""
        keyboardType="numeric"
      />
     </View>
     </View>

      <Select
        label="Lieu de départ"
        selectedValue={departurePlace}
        onValueChange={(value) => setDeparturePlace(value)}
        items={lieux}
        placeholder="Choisir"
      />

      {/* Champ Date Aller */}
      <View style={[styles.inputContainer,{marginBottom:10}]}>
        <Text style={styles.label}>Date Aller</Text>
        <TouchableOpacity
          style={[styles.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.8}
        >
          <Text style={{ color: '#333' }}>
            {date ? date.toDateString() : 'Sélectionner une date'}
          </Text>
          <Calendar size={20} color="#666" />
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
              label="Heure de départ"
              selectedValue={departureTime}
              onValueChange={(value) => setDeparturePlace(value)}
              items={time}
            />
      <View style={Formstyles.FlexContainer}>
        <View style={Formstyles.inputField}>
          <Text style={Formstyles.passengersLabel}>Adultes </Text>
          <Input
            value={adults.toString()}
            onChangeText={(text) => {
              const num = parseInt(text) || 0;
              if (num > 30) {
                Alert.alert('Limite atteinte', 'Le nombre maximum est 30');
                setAdults(30);
              } else {
                setAdults(num);
              }
            }}
            keyboardType="numeric"
            placeholder="0"/>
        </View>

        <View style={Formstyles.inputField}>
          <Text style={Formstyles.passengersLabel}>Enfants </Text>
          <Input
            value={children.toString()}
            onChangeText={(text) => {
              const num = parseInt(text) || 0;
              if (num > 30) {
                Alert.alert('Limite atteinte', 'Le nombre maximum est 30');
                setChildren(30);
              } else {
                setChildren(num);
              }
            }}
            keyboardType="numeric"
            placeholder="0"
          />
        </View>
      </View>

      {/* Prix total */}
      <View style={Formstyles.totalContainer}>
        <Text style={Formstyles.totalLabel}>Prix Total</Text>
        <Text style={Formstyles.totalPrice}>{statutcode ? `${FinalPrice} DH` : `${calculateTotal()} DH`}</Text>
      </View>

      {/* Code promo */}
      <View style={Formstyles.promoContainer}>
        <View style={Formstyles.promoHeader}>
          <Text style={Formstyles.promoLabel}>Code promo</Text>
          <Switch
            value={hasPromo}
            onValueChange={setHasPromo}
            trackColor={{ false: '#ccc', true: '#AECDF7' }}
            thumbColor={hasPromo ? '#1e40af' : '#1e40af'}
          />
        </View>

        {hasPromo && (
          <View>
            <Input
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder="Entrez votre code promo"
            />
          </View>
        )}
      </View>
      {statutcode && (
                        <Text style={{ color: '#7ac277', marginBottom: 10 }}>
                          ✅ Code promo appliqué avec succès !
                        </Text>
                    )}
      <Button title="Valider" onPress={handleSubmit} />
      </View>

    </ScrollView>
    </SafeAreaView>
    </LinearGradient>
    </ImageBackground>
    </Modal>

    <Modal
      visible={successMessageVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setSuccessMessageVisible(false)}
    >
      <View style={Formstyles.successOverlay}>
        <View style={Formstyles.successContainer}>
          <View style={Formstyles.successHeader}>
            <View style={Formstyles.successIcon}>
              <Check size={24} color="white" />
            </View>
            <Text style={Formstyles.successTitle}>Réservation confirmée</Text>
          </View>

          <View style={Formstyles.successContent}>
            <View style={Formstyles.successRow}>
              <Text style={Formstyles.successLabel}>Nom:</Text>
              <Text style={Formstyles.successValue}>{firstName} {lastName}</Text>
            </View>
            <View style={Formstyles.successRow}>
              <Text style={Formstyles.successLabel}>Email:</Text>
              <Text style={Formstyles.successValue}>{email}</Text>
            </View>
            <View style={Formstyles.successRow}>
              <Text style={Formstyles.successLabel}>Lieu:</Text>
              <Text style={Formstyles.successValue}>{departurePlace}</Text>
            </View>
            <View style={Formstyles.successRow}>
              <Text style={Formstyles.successLabel}>Date:</Text>
              <Text style={Formstyles.successValue}>{date.toDateString()}</Text>
            </View>
            <View style={Formstyles.successRow}>
              <Text style={Formstyles.successLabel}>Heure:</Text>
              <Text style={Formstyles.successValue}>{departureTime}</Text>
            </View>
          </View>

          <View style={Formstyles.successTotal}>
            <Text style={Formstyles.successTotalText}>Total: {statutcode ? `${FinalPrice} DH` : `${calculateTotal()} DH`}</Text>
          </View>

          <TouchableOpacity
            style={Formstyles.closeButton}
            onPress={() => setSuccessMessageVisible(false)}
          >
            <Text style={Formstyles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </>
  );
}

const Formstyles = StyleSheet.create({
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
});