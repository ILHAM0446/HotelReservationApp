import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useMemo, useState } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from "../Components/Button";
import Input from "../Components/Input";
//import { styles } from '../Components/Mystyle';
import Select from "../Components/Select";
import SelectDate from "../Components/SelectDate";



export default function restaurant () {
    const [ LastName , setLastName] = useState('');
    const [ FirstName , setFirstName] = useState('');
    const [ Email , setEmail] = useState('');
    const [ Source , setSource] = useState('');
    const [ReservationNumber, setReservationNumber] = useState('');
    const [ RoomNumber , setRoomNumber] = useState('');
    const [ CheckIn, setCheckIn] = useState<Date>(new Date());
    const [ CheckOut , setCheckOut] = useState<Date>(() => {
            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate()+1 );
            return nextDay ;
            });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [ReservationDateTime, setReservationDateTime] = useState<Date>(() => {
            const now = new Date();
            now.setHours(19, 0, 0, 0); 
            return now;
            });
    const [showReservationField, setShowReservationField] = useState(false);
    const [showCakeSelection, setShowCakeSelection] = useState(false);
    const [selectedCake, setSelectedCake] = useState<number | null>(null);
    const [numberOfPeople, setNumberOfPeople] = useState(0);

    const cakes = [
        { id: 1, name: "Gâteau1", price: 200 },
        { id: 2, name: "Gâteau2", price: 100 },
        { id: 3, name: "Gâteau3", price: 3936 }
    ];

    

    
    
    
    
    const handleForm = () => {
        console.log('last_name:', LastName );
        console.log('first_name:', FirstName);
        console.log('email:', Email);
        console.log('source:', Source);
        console.log('reservation_number:', ReservationNumber);
        console.log('room_number:', RoomNumber);
        console.log('check_in:', CheckIn);
        console.log('check_out', CheckOut);
        console.log('reservation_date:', ReservationDateTime.toISOString().split('T')[0]);
        console.log('reservation_time:', ReservationDateTime.toTimeString().substring(0, 5));
        console.log('reservation_full_datetime:', ReservationDateTime.toISOString());
        console.log('Formulaire soumis !');
        console.log('selected_cake:', selectedCake);
        console.log('cake_people:', numberOfPeople);
        // Ici vous enverriez les données à votre API
        };

    
   
    
    
    
    const handleCheckInChange = (newDate: Date) =>{
        setCheckIn(newDate)
        if (newDate >= CheckOut) {
                const nextDay = new Date(newDate);
                nextDay.setDate(nextDay.getDate() + 1);
                setCheckOut(nextDay);
        };
        checkIfShowFields();
    };
    const minCheckoutDate = new Date(CheckIn);
        minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
    const handleCheckOutChange = (newDate: Date) => {
        const adjustedDate = new Date(newDate);
        adjustedDate.setDate(adjustedDate.getDate() + 1);
        setCheckOut(adjustedDate);
        checkIfShowFields();
    };
    const checkIfShowFields = () => {
    if (CheckIn && CheckOut) {
        setShowReservationField(true);
        setShowCakeSelection(true);
    }
};


    const handleDateChange = (event: any, selectedDate?: Date) => {
        const shouldKeepOpen = Platform.OS === 'ios';
        setShowDatePicker(shouldKeepOpen);
        if (selectedDate) {
        const newDate = new Date(selectedDate);
        newDate.setHours(ReservationDateTime.getHours(), ReservationDateTime.getMinutes());
        setReservationDateTime(newDate);
        // Afficher le time picker après un court délai
        setTimeout(() => {
            setShowTimePicker(true);
        }, 100);
        }
        };
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 19; hour <= 21; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                if (hour === 21 && minute > 45) break;
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(time);
            }
        }
        //console.log('timeSlots:', timeSlots);
        return slots;
    };

    const timeSlots = useMemo(() => generateTimeSlots(), []);


    const handleTimeSelect = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(ReservationDateTime);
    newDate.setHours(hours, minutes);
    setReservationDateTime(newDate);
    setShowTimePicker(false);
    };
    console.log('timeSlots:', timeSlots);
    const calculateStayDuration = (checkIn: Date, checkOut: Date) => {
            const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Nombre de jours
            };
    
    
   

return (
        <ImageBackground 
            source={require('../../assets/images/slider2.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
        <View style={styles.overlay}>
        <KeyboardAvoidingView behavior= {Platform.OS === "ios" ? "padding" : "height" } style = {{flex: 1}} >
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 50}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >

        <View style={styles.header}>
            <Icon name="cutlery" size={24} color="#FFF" style={styles.headerIcon} />
            <Text style={styles.headerTitle}>Reservation Restaurants</Text>
        </View>
         <View style={styles.row}>
         <View style={styles.inputWrapper}>
         <Input
            label="Last name "
            placeholder="your last name "
            value={LastName}
            onChangeText={setLastName}
         />
         </View>
         <View style={styles.inputWrapper}>
         <Input
            label="First name"
            placeholder="your first name"
            value={FirstName}
            onChangeText={setFirstName}
         />
         </View>
         </View>
         <Input
            label="Adresse email"
            placeholder="exemple@email.com"
            value={Email}
            onChangeText={setEmail}
            keyboardType="email-address"
         />
         <Input
             label="Numéro de réservation dans l'hôtel"
             placeholder="Entrez le numéro de réservation"
             value={ReservationNumber}
             onChangeText={setReservationNumber}
             keyboardType="default"
         />
         <View style={styles.row}>
         <View style={styles.inputWrapper}>
         <Input
              label="Room Number "
              placeholder={"Your room number"}
              value={RoomNumber}
              onChangeText={setRoomNumber}
              keyboardType="numeric"
         />
         </View>
         <View style={styles.inputWrapper}>
         <Select
            label="Source"
            selectedValue={Source}
            onChangeValue={setSource}
            items={[
                {label: 'select source' , value: 'select_source' },
                {label: 'Agence' , value: 'agency'},
                {label: 'Web' , value: 'web'}
            ]}
         />
         </View>
         </View>
         <View style= {styles.row}>
         <SelectDate
            label="Date d'arrivée (Check-in)"
            value={CheckIn}
            onChange={handleCheckInChange}
            minimumDate={null}
         />
         <SelectDate
            label="Date de départ (Check-out)"
            value={CheckOut}
            onChange= {handleCheckOutChange}
            minimumDate={minCheckoutDate}
         />
         </View>
         
         
{/* Champ de sélection date/heure */}
{showReservationField && (
        <View style={styles.dateTimeField}>
        <Text style={styles.label}>Date et heure de réservation</Text>
        <TouchableOpacity
            style={styles.dateTimeInput}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
        >
            <Text style={styles.dateTimeText}>
                {ReservationDateTime.toLocaleDateString('fr-FR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
            </Text>
                <Text style={styles.dateTimeText}>
                {ReservationDateTime.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
        </TouchableOpacity>

{showDatePicker && (
            <DateTimePicker
                value={ReservationDateTime}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                locale="fr-FR"
                minimumDate={new Date()}
                maximumDate={(() => {
                    const maxDate = new Date();
                    maxDate.setDate(maxDate.getDate() + 14);
                    return maxDate;
                })()}
                themeVariant="light"
            />
        )}
    
{/* TimePicker Modal */}
{showTimePicker && (
    <View style={styles.timePickerModal}>
        <View style={styles.timePickerContainer}>
            <Text style={styles.timePickerTitle}>Choisissez l'heure</Text>
            <View style={styles.timeSlotsGrid}>
                {timeSlots.map((time, index) => {
                    const currentTime = ReservationDateTime.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }).replace(':', '');
                    const isSelected = time.replace(':', '') === currentTime;
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.timeSlotButton,
                                isSelected && styles.timeSlotButtonSelected
                            ]}
                            onPress={() => handleTimeSelect(time)}
                        >
                            <Text style={[
                                styles.timeSlotText,
                                isSelected && styles.timeSlotTextSelected
                            ]}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    </View>
)}
{/* Affichage conditionnel des restaurants */}
    {calculateStayDuration(CheckIn, CheckOut) >= 4 ? (
      <View>
        <View style={styles.restaurantOption}>
          <Text style={styles.restaurantText}>Steak House</Text>
        </View>
        <View style={styles.restaurantOption}>
          <Text style={styles.restaurantText}>Marocain</Text>
        </View>
        <View style={styles.restaurantOption}>
          <Text style={styles.restaurantText}>Italien</Text>
        </View>
      </View>
    ) : (
      <View style={styles.restaurantOption}>
        <Text style={styles.restaurantText}>Option Restaurant 1 - Menu Classique</Text>
      </View>
    )}

{showCakeSelection && (
    <View style={styles.cakeContainer}>
        <Text style={styles.sectionTitle}>Birthday Cake</Text>
        
        <Text style={styles.label}>Number of people for the birthday cake</Text>
        <TextInput
            style={styles.numberInput}
            keyboardType="numeric"
            value={numberOfPeople.toString()}
            onChangeText={(text) => setNumberOfPeople(Number(text) || 0)}
        />

        {cakes.map((cake) => (
            <TouchableOpacity 
                key={cake.id}
                style={[
                    styles.cakeOption,
                    selectedCake === cake.id && styles.cakeOptionSelected
                ]}
                onPress={() => setSelectedCake(cake.id)}
            >
                {/* Partie modifiée avec icône */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="birthday-cake" size={20} color="#FF6B6B" />
                    <Text style={styles.cakeName}>{cake.name}</Text>
                </View>
                <Text style={styles.cakePrice}>{cake.price} DHs</Text>
            </TouchableOpacity>
        ))}
    </View>
)}
</View>
        )}






         <Button
            title="Reserver"
            onPress={handleForm}
         />
        </ScrollView>
       </KeyboardAvoidingView>
       </View>
       </ImageBackground>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputWrapper: {
        flex: 1,
        marginRight: 8,
        marginBottom: 16,
    },
    dateTimeField: {
        marginBottom: 15,
        marginTop: 10,
    },
    dateTimeInput: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateTimeText: {
        color: '#333',
        fontSize: 14,
    },
    timePickerModal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white', // Fond blanc opaque
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        zIndex: 1000,
    },
    timePickerContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0', // Couleur neutre
        padding: 16,
        width: '85%',
        maxHeight: 300, // Hauteur maximale ajustée
        minHeight: 200, // Hauteur minimale
    },
    timePickerTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
        color: '#333',
    },
    timeSlotsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 4,
    },
    timeSlotButton: {
        width: 60, // Réduit la largeur
        height: 60, // Réduit la hauteur
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        margin: 4,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    timeSlotButtonSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    timeSlotText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    timeSlotTextSelected: {
        color: 'white',
    },
    restaurantOption: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    restaurantText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    cakeContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
},
sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
},
cakeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
},
cakeOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#e6f2ff',
},
cakeName: {
    fontSize: 16,
    color: '#333',
},
cakePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
},
numberInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    fontSize: 16,
},
background: {
  flex: 1,
  
  width: '100%',
  height: '100%',
},
overlay: {
  flex: 1,
  backgroundColor: 'rgba(245, 241, 241, 0.25)', // Fond semi-transparent
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#f7b500',
    borderRadius: 10,
},
headerIcon: {
    marginRight: 10,
},
headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
},

});

