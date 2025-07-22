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
import { Screenstyles } from '../Components/Style';
import CalculCodePromo from '../Components/CodePromo';
import i18n from '../../i18n';
import Header from '../Components/header';
import { checkCapacite, checkPrice, checkCodePromo, CreateReservation } from '../api/PiscineAPI';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from 'expo-router';

export default function PiscineScreen(): JSX.Element {
  const { locale } = useLanguage();

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
  const [promoData, setPromoData] = useState<{ type: 'dh' | 'reduction' | 'gratuit'; valeur: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [promoToCheck, setPromoToCheck] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [Payment, setPayment] = useState(false);
  const [reference, setReference] = useState('');
  const [url, setUrl] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [AdulteJournee, setAdulteJournee] = useState(400);
  const [EnfantJournee, setEnfantJournee] = useState(240);
  const [BebeJournee, setBebeJournee] = useState(0);
  const [AdulteDemiJournee, setAdulteDemiJournee] = useState(250);
  const [EnfantDemiJournee, setEnfantDemiJournee] = useState(150);
  const [BebeDemiJournee, setBebeDemiJournee] = useState(0);
  const [messageCapacite, setMessageCapacite] = useState('');

  const router = useRouter();

  const resetForm = () => {
    setNom('');
    setPrenom('');
    setDate(new Date());
    setAdultes(1);
    setEnfants(0);
    setBebes(0);
    setTelephone('');
    setEmail('');
    setCodepromo('');
    setUseCodePromo(false);
    setReservationType('journee');
    setPromoData(null);
    setPromoError('');
    setPromoToCheck('');
    setSuccessMessage('');
    setPayment(false);
    setReference('');
    setUrl('');
    setPayload('');
    setSignature('');
    setMessageCapacite('');
    setModalVisible(false);
  };

  React.useEffect(() => {
    resetForm();
  }, [locale]);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Vérification du code promo
  React.useEffect(() => {
    const fetchCodePromo = async () => {
      if (!useCodePromo || promoToCheck.trim() === '') {
        setPromoData(null);
        setPromoError('');
        return;
      }
      const result = await checkCodePromo(date, promoToCheck.trim());
      if (result.ok && result.data) {
        setPromoData({
          type: result.data.type,
          valeur: result.data.reduction,
        });
        setPromoError('');
      } else {
        setPromoData(null);
        setPromoError(result.message || i18n.t('ErrorInconnue'));
      }
    };
    fetchCodePromo();
  }, [promoToCheck, date, useCodePromo]);

  // Chargement des prix
  React.useEffect(() => {
    const loadAllPrices = async () => {
      try {
        const [journeeResult, demiResult] = await Promise.all([
          checkPrice(date, 'journee'),
          checkPrice(date, 'demi-journee'),
        ]);
        if (journeeResult.ok) {
          setAdulteJournee(journeeResult.data.prix_personne_pul);
          setEnfantJournee(journeeResult.data.prix_enfant);
          setBebeJournee(journeeResult.data.prix_bebe);
        }
        if (demiResult.ok) {
          setAdulteDemiJournee(demiResult.data.prix_personne_pul);
          setEnfantDemiJournee(demiResult.data.prix_enfant);
          setBebeDemiJournee(demiResult.data.prix_bebe);
        }
      } catch (error) {
        console.warn('Erreur lors du chargement des prix :', error);
      }
    };
    loadAllPrices();
  }, [date]);

  // Calcul du prix
  const Price = (): number =>
    reservationType === 'journee'
      ? Adultes * AdulteJournee + Enfants * EnfantJournee + Bebes * BebeJournee
      : Adultes * AdulteDemiJournee + Enfants * EnfantDemiJournee + Bebes * BebeDemiJournee;

  const statutcode = promoData !== null;

  const FinalPrice = CalculCodePromo(
    codePromo,
    promoData?.type || 'dh',
    promoData?.valeur || 0,
    Price()
  );

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await checkCapacite(date, Adultes, Enfants, Bebes);
      if (!result.ok) {
        setMessageCapacite(result.message);
      } else {
        setMessageCapacite('');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [date, Adultes, Enfants, Bebes]);


  const handleReservation = async () => {
    const payload = {
      nom,
      prenom,
      email: Email,
      telephone,
      dateReservation: date,
      type: reservationType,
      nbrPersones: Adultes,
      nbrEnfants: Enfants,
      nbrBebe: Bebes,
      code_promo_input: codePromo || undefined,
    };
    const apiResult = await CreateReservation(payload);
    if (apiResult.ok) {
      const status = apiResult.data.payment_status;
      setReference(apiResult.data.reference);
      if (status === 'COMPLETED') {
        setPayment(true);
        return { statut: true, Message: i18n.t('ResevationComplite') };
      } else if (status === 'PENDING') {
        setUrl(apiResult.data.url || '');
        setPayload(apiResult.data.payload || '');
        setSignature(apiResult.data.signature || '');
        return {
          statut: true,
          Message: i18n.t('ResevationPending'),
          url: apiResult.data.url,
          payload: apiResult.data.payload,
          signature: apiResult.data.signature,
        };
      }
    } else {
      return { statut: false, Message: apiResult.message || i18n.t('ErrorInconnue') };
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!nom || !prenom || !Email || !telephone || !date || !Adultes) {
      alert(i18n.t('error'));
      return;
    }
    if (!validateEmail(Email)) {
      alert(i18n.t('invalidEmail'));
      return;
    }
    const capaciteResult = await checkCapacite(date, Adultes, Enfants, Bebes);
    if (!capaciteResult.ok) {
      alert(capaciteResult.message);
      return;
    }
    const result = await handleReservation();
    console.log("Résultat retour API:", result);
    if (result.statut) {
      setSuccessMessage(result.Message);
      setModalVisible(true);
    } else {
      alert(i18n.t('ErrorInconnue'));
    }
  };

  return (
    <>
      <View style={Screenstyles.fakeModalWrapper}>
        <ImageBackground
          source={{
            uri: 'https://images.trvl-media.com/lodging/11000000/10390000/10387200/10387148/2b504520.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
          }}
          style={Screenstyles.backgroundImage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, marginBottom: -50 }}
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
                      <Text style={Screenstyles.pricingPrice}>{AdulteJournee} Dhs</Text>
                    </View>
                    <View style={Screenstyles.separator} />
                    <View style={Screenstyles.pricingRow}>
                      <Text style={Screenstyles.pricingLabel}>{i18n.t('child')}</Text>
                      <Text style={Screenstyles.pricingPrice}>{EnfantJournee} Dhs</Text>
                    </View>
                    <View style={Screenstyles.separator} />
                    <View style={Screenstyles.pricingRow}>
                      <Text style={Screenstyles.pricingLabel}>{i18n.t('baby')}</Text>
                      <Text style={Screenstyles.pricingPrice}>{BebeJournee} Dhs</Text>
                    </View>
                  </View>
                  <View style={Screenstyles.pricingCard}>
                    <Text style={Screenstyles.pricingTitle}>{i18n.t('halfDayRates')}</Text>
                    <View style={Screenstyles.pricingRow}>
                      <Text style={Screenstyles.pricingLabel}>{i18n.t('adult')}</Text>
                      <Text style={Screenstyles.pricingPrice}>{AdulteDemiJournee} Dhs</Text>
                    </View>
                    <View style={Screenstyles.separator} />
                    <View style={Screenstyles.pricingRow}>
                      <Text style={Screenstyles.pricingLabel}>{i18n.t('child')}</Text>
                      <Text style={Screenstyles.pricingPrice}>{EnfantDemiJournee} Dhs</Text>
                    </View>
                    <View style={Screenstyles.separator} />
                    <View style={Screenstyles.pricingRow}>
                      <Text style={Screenstyles.pricingLabel}>{i18n.t('baby')}</Text>
                      <Text style={Screenstyles.pricingPrice}>{BebeDemiJournee} Dhs</Text>
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
                            minimumDate={new Date()}
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
                          onPress={() => {
                            setReservationType(type as 'journee' | 'demi-journee');
                            setPromoError('');
                            setPromoToCheck('');
                            setPromoData(null);
                          }}
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
                      <Input
                        value={String(Adultes)}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          const num = Number(text);
                          setAdultes(num);
                        }}
                        onBlur={() => {
                          if (Adultes < 1 || isNaN(Adultes)) {
                            setAdultes(1);
                          }
                        }}
                      />
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
                  {messageCapacite !== '' && (
                    <Text style={{ color: '#D32F2F', marginBottom: 10 }}>{messageCapacite}</Text>
                  )}
                  <View style={Screenstyles.section}>
                    <View style={Screenstyles.codePromoContainer}>
                      <Text style={inputStyles.label}>{i18n.t('usePromo')}</Text>
                      <Switch
                        value={useCodePromo}
                        onValueChange={(value) => {
                          setUseCodePromo(value);
                          setCodepromo('');
                          setPromoError('');
                          setPromoData(null);
                          setPromoToCheck('');
                        }}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={useCodePromo ? '#007AFF' : '#f4f3f4'}
                      />
                    </View>
                    {useCodePromo && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                          <Input
                            label={i18n.t('promoCode')}
                            value={codePromo}
                            onChangeText={text => {
                              setCodepromo(text);
                              setPromoError('');
                              setPromoToCheck('');
                            }}
                            placeholder="Code"
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => setPromoToCheck(codePromo)}
                          style={Screenstyles.ButtonCodePromo}
                          activeOpacity={0.8}
                        >
                          <Icon name="check" size={28} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  {statutcode && (
                    <Text style={{ color: '#7ac277', marginBottom: 10 }}>{i18n.t('applySuccess')}</Text>
                  )}
                  {promoError !== '' && (
                    <Text style={{ color: '#D32F2F', marginBottom: 10 }}>{promoError}</Text>
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
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={Screenstyles.modalOverlay}>
          <View style={Screenstyles.modalCard}>
            <View style={Screenstyles.iconCircle}>
              <Text style={Screenstyles.successIcon}>✔️</Text>
            </View>
            <Text style={Screenstyles.modalTitle}>{i18n.t('ReservationConfirm')}</Text>
            <Text style={Screenstyles.modalSubtitle}>{i18n.t('Thanks')}</Text>
            <View style={Screenstyles.infoBox}>
              <View style={Screenstyles.row}>
                <Text style={Screenstyles.label}>{i18n.t('NomComplet')}</Text>
                <Text style={Screenstyles.value}>{prenom} {nom}</Text>
              </View>
              <View style={Screenstyles.divider} />
              <View style={Screenstyles.row}>
                <Text style={Screenstyles.label}>{i18n.t('email')}</Text>
                <Text style={Screenstyles.value}>{Email}</Text>
              </View>
              <View style={Screenstyles.divider} />
              <View style={Screenstyles.row}>
                <Text style={Screenstyles.label}>{i18n.t('date')}</Text>
                <Text style={Screenstyles.value}>{date.toLocaleDateString()}</Text>
              </View>
              <View style={Screenstyles.divider} />
              <View style={Screenstyles.row}>
                <Text style={Screenstyles.label}>{i18n.t('Reference')}</Text>
                <Text style={Screenstyles.value}>{reference}</Text>
              </View>
              <View style={Screenstyles.divider} />
              <View style={Screenstyles.row}>
                <Text style={Screenstyles.labelBold}>{i18n.t('totalPrice')}</Text>
                <Text style={Screenstyles.valueBold}>{statutcode ? `${FinalPrice} DH` : `${Price()} DH`}</Text>
              </View>
            </View>
            <Text style={Screenstyles.confirmationNote}>{successMessage}</Text>
            <Pressable
              onPress={() => {
                if (!Payment) {
                  if (url && payload && signature) {
                    const paymentData = { url, payload, signature };
                    const paymentParamsString = JSON.stringify(paymentData);
                    router.push({
                      pathname: '/paiement',
                      params: {
                        paymentParams: encodeURIComponent(paymentParamsString)
                      }
                    });
                  } else {
                    console.error("Missing payment details.");
                    alert(i18n.t('ErrorInconnue'));
                  }
                  resetForm();
                  setModalVisible(false);
                } else {
                  resetForm();
                  setModalVisible(false);
                }
              }}
              style={Screenstyles.ctaButton}
            >
              <Text style={Screenstyles.ctaButtonText}>
                {Payment ? i18n.t('Nouvelle') : i18n.t('Payer')}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}