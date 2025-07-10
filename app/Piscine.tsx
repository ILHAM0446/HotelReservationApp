import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Switch,
  Modal,
  Pressable,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from './Components/Input';
import Button from './Components/Button';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { styles as inputStyles } from './Components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useCapaciteMax from './Components/useCapaciteMax';
import { Screenstyles } from './Components/Style';
import { useNavigation } from '@react-navigation/native';

export default function PiscineScreen(): JSX.Element {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [Adultes, setAdultes] = useState(0);
  const [Enfants, setEnfants] = useState(0);
  const [Bebes, setBebes] = useState(0);
  const [telephone, setTelephone] = useState('');
  const [Email, setEmail] = useState('');
  const [codePromo, setCodepromo] = useState('');
  const [useCodePromo, setUseCodePromo] = useState(false);
  const [reservationType, setReservationType] = useState<'journee' | 'demi-journee'>('journee');
  const [isModalVisible, setModalVisible] = useState(false);

const navigation = useNavigation<any>();

  const maxCapacite = 20;
  const personnes = Adultes + Enfants;
  const { isCapaciteDepassee, message } = useCapaciteMax(personnes, maxCapacite);

  const AdulteJournee = 400;
  const EnfantJournee = 240;
  const BebeJournee = 0;
  const AdulteDemiJournee = 250;
  const EnfantDemiJournee = 150;
  const BebeDemiJournee = 0;
  const [isVisible, setIsVisible] = useState(true);

  const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) setDate(selectedDate);
    setShowDatePicker(false);
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const Price = (): number => {
    return reservationType === 'journee'
      ? Adultes * AdulteJournee + Enfants * EnfantJournee + Bebes * BebeJournee
      : Adultes * AdulteDemiJournee + Enfants * EnfantDemiJournee + Bebes * BebeDemiJournee;
  };

  const handleSubmit = (): void => {
    if (!nom || !prenom || !Email || !telephone || !date || !Adultes) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (!validateEmail(Email)) {
      alert('Email invalide ❌');
      return;
    }

    if (isCapaciteDepassee) {
      alert(message);
      return;
    }

    setModalVisible(true);
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
          uri: "https://images.trvl-media.com/lodging/11000000/10390000/10387200/10387148/2b504520.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
        }}
        style={Screenstyles.backgroundImage}
      >
        {/* Logo */}
        <TouchableOpacity style={Screenstyles.logoWrapper} onPress={() => { navigation.navigate('index');}}>
          <Image
             source={{ uri: "https://www.magichotelsandresorts.com/assets/images/png/logo.png" }}
             style={Screenstyles.logo}
          />
        </TouchableOpacity>

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={Screenstyles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={Screenstyles.header}>
              <Text style={Screenstyles.pageTitle}>FORMULAIRE DE RÉSERVATION</Text>
            </View>

            {/* Pricing Cards */}
            <View style={Screenstyles.pricingSection}>
              <View style={Screenstyles.pricingCard}>
                <Text style={Screenstyles.pricingTitle}>Tarifs journée :</Text>
                <View style={Screenstyles.pricingRow}>
                  <Text style={Screenstyles.pricingLabel}>Adulte</Text>
                  <Text style={Screenstyles.pricingLabel}>Enfant</Text>
                  <Text style={Screenstyles.pricingLabel}>Bébé</Text>
                </View>
                <View style={Screenstyles.pricingRow}>
                  <Text style={Screenstyles.pricingPrice}>400 Dhs</Text>
                  <Text style={Screenstyles.pricingPrice}>240 Dhs</Text>
                  <Text style={Screenstyles.pricingPrice}>0 Dhs</Text>
                </View>
              </View>

              <View style={Screenstyles.pricingCard}>
                <Text style={Screenstyles.pricingTitle}>Tarifs demi-journée :</Text>
                <View style={Screenstyles.pricingRow}>
                  <Text style={Screenstyles.pricingLabel}>Adulte</Text>
                  <Text style={Screenstyles.pricingLabel}>Enfant</Text>
                  <Text style={Screenstyles.pricingLabel}>Bébé</Text>
                </View>
                <View style={Screenstyles.pricingRow}>
                  <Text style={Screenstyles.pricingPrice}>250 Dhs</Text>
                  <Text style={Screenstyles.pricingPrice}>150 Dhs</Text>
                  <Text style={Screenstyles.pricingPrice}>0 Dhs</Text>
                </View>
              </View>
            </View>

            <View style={Screenstyles.card}>
              <Text style={Screenstyles.TitleForm}>Saisissez vos données</Text>

              <View style={Screenstyles.inputRow}>
                <View style={Screenstyles.inputHalf}>
                  <Input label="Nom" value={nom} onChangeText={setNom} />
                </View>
                <View style={Screenstyles.inputHalf}>
                  <Input label="Prénom" value={prenom} onChangeText={setPrenom} />
                </View>
              </View>

              <Input
                label="Email"
                value={Email}
                onChangeText={setEmail}
                placeholder="votre@email.com"
                keyboardType="email-address"
              />

              <View style={Screenstyles.inputRow}>
                <View style={Screenstyles.inputHalf}>
                  <Input
                    label="Téléphone"
                    value={telephone}
                    onChangeText={setTelephone}
                    placeholder="06 XX XX XX XX"
                    keyboardType="numeric"
                  />
                </View>
                <View style={Screenstyles.inputHalf}>
                  <View style={inputStyles.container}>
                    <Text style={inputStyles.label}>Date</Text>
                    <TouchableOpacity
                      style={[inputStyles.input, { flexDirection: 'row', alignItems: 'center' }]}
                      onPress={() => setShowDatePicker(true)}
                      activeOpacity={0.8}
                    >
                      <Icon name="calendar" size={20} color="#666" style={{ marginRight: 8 }} />
                      <Text>
                        {date.getDate().toString().padStart(2, '0')}/
                        {(date.getMonth() + 1).toString().padStart(2, '0')}/
                        {date.getFullYear()}
                      </Text>
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
                </View>
              </View>

              <View style={Screenstyles.radioSection}>
                <Text style={inputStyles.label}>Type de la Réservation</Text>
                <View style={Screenstyles.radioContainer}>
                  {['journee', 'demi-journee'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        Screenstyles.radioOption,
                        reservationType === type && Screenstyles.radioSelected,
                      ]}
                      onPress={() => setReservationType(type as 'journee' | 'demi-journee')}
                    >
                      <View style={Screenstyles.radioButton}>
                        <View
                          style={[
                            Screenstyles.radioInner,
                            reservationType === type && Screenstyles.radioInnerSelected,
                          ]}
                        />
                      </View>
                      <Text>{type === 'journee' ? 'Journée' : 'Demi-journée'}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={Screenstyles.inputRow}>
                <View style={Screenstyles.inputHalf}>
                  <Text style={Screenstyles.dropdownLabel}>Adultes</Text>
                  <Input
                    value={String(Adultes)}
                    onChangeText={(text) => setAdultes(Number(text))}
                    keyboardType="numeric"
                  />
                </View>
                <View style={Screenstyles.inputHalf}>
                  <Text style={Screenstyles.dropdownLabel}>Enfants</Text>
                  <Input
                    value={String(Enfants)}
                    onChangeText={(text) => setEnfants(Number(text))}
                    keyboardType="numeric"
                  />
                </View>
                <View style={Screenstyles.inputHalf}>
                  <Text style={Screenstyles.dropdownLabel}>Bébés</Text>
                  <Input
                    value={String(Bebes)}
                    onChangeText={(text) => setBebes(Number(text))}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {isCapaciteDepassee && (
                <Text style={{ color: '#D32F2F', marginBottom: 10 }}>
                  🚫 {message}
                </Text>
              )}

              <View style={Screenstyles.section}>
                <View style={Screenstyles.codePromoContainer}>
                  <Text style={inputStyles.label}>Utilisez un code promo</Text>
                  <Switch
                    value={useCodePromo}
                    onValueChange={(value) => {
                      setUseCodePromo(value);
                      if (!value) setCodepromo('');
                    }}
                  />
                </View>
                {useCodePromo && (
                  <Input
                    label="Code promo"
                    value={codePromo}
                    onChangeText={setCodepromo}
                    placeholder="Entrez votre code promo"
                  />
                )}
              </View>

              <View style={Screenstyles.priceSection}>
                <View style={Screenstyles.PriceRow}>
                  <Text style={Screenstyles.PriceText}>Prix Total</Text>
                  <Text style={Screenstyles.PriceText}>{Price()} DH</Text>
                </View>
              </View>

              <Button title="Valider" onPress={handleSubmit} />
            </View>
          </ScrollView>
          </SafeAreaView>

      </ImageBackground>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={Screenstyles.modalBackground}>
          <View style={Screenstyles.modalContainer}>
            <Text style={Screenstyles.modalTitle}>Réservation envoyée !</Text>
            <Text style={{ textAlign: 'center', marginVertical: 10 }}>
              Merci {prenom} {nom}, votre réservation du {date.toLocaleDateString()} a été enregistrée avec succès !
            </Text>
            <Text style={[Screenstyles.PriceText, { marginTop: 15 }]}>Prix: {Price()} DH</Text>
            <Pressable onPress={() => setModalVisible(false)} style={Screenstyles.modalButton}>
              <Text style={Screenstyles.modalButtonText}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </Modal>
    </>
  );
}
