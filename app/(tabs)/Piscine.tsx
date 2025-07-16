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
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../Components/Input';
import Button from '../Components/Button';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { styles as inputStyles } from '../Components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useCapaciteMax from '../Components/useCapaciteMax';
import { Screenstyles } from '../Components/Style';
import CalculCodePromo from '../Components/CodePromo';
import i18n from '../../i18n';
import Header from '../Components/header';
import { checkCapacite } from '../api/PiscineAPI';
import { useLanguage } from '../Context/LanguageContext';

export default function PiscineScreen(): JSX.Element {

 useLanguage();


  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [Adultes, setAdultes] = useState(1);
  const [Enfants, setEnfants] = useState(0);
  const [Bebes, setBebes] = useState(0);
  const [telephone, setTelephone] = useState('');
  const [Email, setEmail] = useState('');
  const [codePromo, setCodepromo] = useState('');
  const [useCodePromo, setUseCodePromo] = useState(false);
  const [reservationType, setReservationType] = useState<'journee' | 'demi-journee'>('journee');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const maxCapacite = 20;
  const personnes = Adultes + Enfants;
  const { isCapaciteDepassee, message } = useCapaciteMax(personnes, maxCapacite);

  const AdulteJournee = 400;
  const EnfantJournee = 240;
  const BebeJournee = 0;
  const AdulteDemiJournee = 250;
  const EnfantDemiJournee = 150;
  const BebeDemiJournee = 0;

  const DataCode = {
    MAGIC: { type: 'reduction', valeur: 10 },
    ILHAM22: { type: 'dh', valeur: 100 },
    ILHAM: { type: 'gratuit', valeur: 0 },
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };


  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const Price = (): number =>
    reservationType === 'journee'
      ? Adultes * AdulteJournee + Enfants * EnfantJournee + Bebes * BebeJournee
      : Adultes * AdulteDemiJournee + Enfants * EnfantDemiJournee + Bebes * BebeDemiJournee;

  const { FinalPrice, statutcode } = CalculCodePromo(
    codePromo,
    DataCode[codePromo]?.type,
    DataCode[codePromo]?.valeur,
    Price()
  );

  const handleSubmit =async (): Promise<void> => {
    if (!nom || !prenom || !Email || !telephone || !date || !Adultes) {
      alert(i18n.t('error'));
      return;
    }
    if (!validateEmail(Email)) {
      alert(i18n.t('invalidEmail'));
      return;
    }
    const result = await checkCapacite(date, Adultes, Enfants, Bebes);
    if (!result.ok) {
      alert(result.message);
      return;
    }

    console.log(result.data);

    setModalVisible(true);
  };

  return (
    <>{isVisible && (
        <View style={Screenstyles.fakeModalWrapper}>
        <ImageBackground
          source={{
            uri: 'https://images.trvl-media.com/lodging/11000000/10390000/10387200/10387148/2b504520.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
          }}
          style={Screenstyles.backgroundImage}
        >
        <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 , marginBottom: -50}}
                  >
                  <Header />
        <ScrollView contentContainerStyle={Screenstyles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <SafeAreaView style={{ flex: 1 }}>

              <View style={Screenstyles.header}>
                <Text style={Screenstyles.pageTitle}>{i18n.t('reservationTitle')}</Text>

              </View>

              <View style={Screenstyles.pricingSection}>
                <View style={Screenstyles.pricingCard}>
                  <Text style={Screenstyles.pricingTitle}>{i18n.t('dayRates')}</Text>
                  <View style={Screenstyles.pricingRow}>
                    <Text style={Screenstyles.pricingLabel}>{i18n.t('adult')}</Text>
                    <Text style={Screenstyles.pricingLabel}>{i18n.t('child')}</Text>
                    <Text style={Screenstyles.pricingLabel}>{i18n.t('baby')}</Text>
                  </View>
                  <View style={Screenstyles.pricingRow}>
                    <Text style={Screenstyles.pricingPrice}>400 Dhs</Text>
                    <Text style={Screenstyles.pricingPrice}>240 Dhs</Text>
                    <Text style={Screenstyles.pricingPrice}>0 Dhs</Text>
                  </View>
                </View>

                <View style={Screenstyles.pricingCard}>
                  <Text style={Screenstyles.pricingTitle}>{i18n.t('halfDayRates')}</Text>
                  <View style={Screenstyles.pricingRow}>
                    <Text style={Screenstyles.pricingLabel}>{i18n.t('adult')}</Text>
                    <Text style={Screenstyles.pricingLabel}>{i18n.t('child')}</Text>
                    <Text style={Screenstyles.pricingLabel}>{i18n.t('baby')}</Text>
                  </View>
                  <View style={Screenstyles.pricingRow}>
                    <Text style={Screenstyles.pricingPrice}>250 Dhs</Text>
                    <Text style={Screenstyles.pricingPrice}>150 Dhs</Text>
                    <Text style={Screenstyles.pricingPrice}>0 Dhs</Text>
                  </View>
                </View>
              </View>

              <View style={Screenstyles.card}>
                <Text style={Screenstyles.TitleForm}>{i18n.t('enterData')}</Text>

                <View style={Screenstyles.inputRow}>
                  <View style={Screenstyles.inputHalf}>
                    <Input label={i18n.t('name')} value={nom} onChangeText={setNom} />
                  </View>
                  <View style={Screenstyles.inputHalf}>
                    <Input label={i18n.t('firstName')} value={prenom} onChangeText={setPrenom} />
                  </View>
                </View>

                <Input label={i18n.t('email')} value={Email} onChangeText={setEmail} placeholder={i18n.t('placeholderEmail')} keyboardType="email-address" />

                <View style={Screenstyles.inputRow}>
                  <View style={Screenstyles.inputHalf}>
                    <Input
                      label={i18n.t('phone')}
                      value={telephone}
                      onChangeText={setTelephone}
                      placeholder= "06 XX XX XX XX"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={Screenstyles.inputHalf}>
                    <View style={inputStyles.container}>
                      <Text style={inputStyles.label}>{i18n.t('date')}</Text>
                      <TouchableOpacity
                        style={[inputStyles.input, { flexDirection: 'row', alignItems: 'center' }]}
                        onPress={() => setShowDatePicker(true)}
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
                  <Text style={inputStyles.label}>{i18n.t('type')}</Text>
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
                        <Text>{i18n.t(type === 'journee' ? 'day' : 'halfDay')}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={Screenstyles.inputRow}>
                  <View style={Screenstyles.inputHalf}>
                    <Text style={Screenstyles.dropdownLabel}>{i18n.t('adults')}</Text>
                    <Input value={String(Adultes)} onChangeText={(text) => setAdultes(Number(text))} keyboardType="numeric" />
                  </View>
                  <View style={Screenstyles.inputHalf}>
                    <Text style={Screenstyles.dropdownLabel}>{i18n.t('children')}</Text>
                    <Input value={String(Enfants)} onChangeText={(text) => setEnfants(Number(text))} keyboardType="numeric" />
                  </View>
                  <View style={Screenstyles.inputHalf}>
                    <Text style={Screenstyles.dropdownLabel}>{i18n.t('babies')}</Text>
                    <Input value={String(Bebes)} onChangeText={(text) => setBebes(Number(text))} keyboardType="numeric" />
                  </View>
                </View>

                {isCapaciteDepassee && <Text style={{ color: '#D32F2F', marginBottom: 10 }}>🚫 {i18n.t('messageCapacite')}</Text>}

                <View style={Screenstyles.section}>
                  <View style={Screenstyles.codePromoContainer}>
                    <Text style={inputStyles.label}>{i18n.t('usePromo')}</Text>
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
                      label={i18n.t('promoCode')}
                      value={codePromo}
                      onChangeText={setCodepromo}
                      placeholder="Code"
                    />
                  )}
                </View>

                {statutcode && (
                  <Text style={{ color: '#7ac277', marginBottom: 10 }}>{i18n.t('applySuccess')}</Text>
                )}

                <View style={Screenstyles.priceSection}>
                  <View style={Screenstyles.PriceRow}>
                    <Text style={Screenstyles.PriceText}>{i18n.t('totalPrice')}</Text>
                    <Text style={Screenstyles.PriceText}>{statutcode ? `${FinalPrice} DH` : `${Price()} DH`}</Text>
                  </View>
                </View>

                <Button title={i18n.t('validate')} onPress={handleSubmit} />
              </View>

          </SafeAreaView>

           </ScrollView>
           </KeyboardAvoidingView>
        </ImageBackground>

       </View>
      )}

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={Screenstyles.modalBackground}>
          <View style={Screenstyles.modalContainer}>
            <Text style={Screenstyles.modalTitle}>{i18n.t('reservationSent')}</Text>
            <Text style={{ textAlign: 'center', marginVertical: 10 }}>
              {i18n.t('thankYou')} {prenom} {nom}, {i18n.t('reservationConfirmed')} {date.toLocaleDateString()} {i18n.t('confirmed')}
            </Text>
            <Text style={[Screenstyles.PriceText, { marginTop: 15 }]}>
              {i18n.t('price')}: {statutcode ? `${FinalPrice} DH` : `${Price()} DH`}
            </Text>
            <Pressable onPress={() => setModalVisible(false)} style={Screenstyles.modalButton}>
              <Text style={Screenstyles.modalButtonText}>{i18n.t('close')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}