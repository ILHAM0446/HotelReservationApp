import  React , {useState} from "react";
import {View , Text ,StyleSheet, ScrollView , KeyboardAvoidingView , Platform} from "react-native";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Select from "../Components/Select";
import NumberInput from "../Components/NumberInput";
import SelectDate from "../Components/SelectDate" ;

export default function restaurant () {
    const [ LastName , setLastName] = useState('');
    const [ FirstName , setFirstName] = useState('');
    const [ Email , setEmail] = useState('');
    const [ Source , setSource] = useState('');
    const [ ReservationNumber , setReservationNumber] = useState('');
    const [ RoomNumber , setRoomNumber] = useState('');
    const [ CheckIn, setCheckIn] = useState<Date>(new Date());
    const [ CheckOut , setCheckOut] = useState<Date>(() => {
            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate()+1 );
            return nextDay ;
            });
    const [ error , setError] = useState <string | null >(null);

    const handleForm = () => {
        console.log('last_name:', LastName );
        console.log('first_name:', FirstName);
        console.log('email:', Email);
        console.log('source:', Source);
        console.log('reservation_number:', ReservationNumber);
        console.log('room_number:', RoomNumber);
        console.log('check_in:', CheckIn);
        console.log('check_out', CheckOut);
        console.log('Formulaire soumis !');
        // Ici vous enverriez les données à votre API
        };

    const handleCheckInChange = (newDate: Date) =>{
        setCheckIn(newDate)
        setError(null);
        if (newDate > CheckOut){
            setCheckOut(newDate);
            setError('veuillez sélectionner une date de  départ après la date d\'arrivée');}
        };
    const handleCheckOutChange = ( newDate: Date) => {
        setCheckOut(newDate);
        setError(null);
        if (newDate < CheckIn){
            setError('La date de départ doit être après la date d\'arrivée');}
        };

    return (
       <KeyboardAvoidingView behavior= {Platform.OS === "ios" ? "padding" : "height" } style = {{flex: 1}} >
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 50}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
         <View style={styles.row}>
         <Input
            label="Last name "
            placeholder="enter your last name "
            value={LastName}
            onChangeText={setLastName}
         />
         <Input
            label="First name"
            placeholder="enter your first name"
            value={FirstName}
            onChangeText={setFirstName}
         />
         </View>
         <Input
            label="Adresse email"
            placeholder="exemple@email.com"
            value={Email}
            onChangeText={setEmail}
            keyboardType="email-address"
         />
         <Select
            label="Source dont vous avez trouvez nous"
            selectedValue={Source}
            onChangeValue={setSource}
            items={[
                {label: 'select source' , value: 'select_source' },
                {label: 'Agence' , value: 'agency'},
                {label: 'Web' , value: 'web'}
            ]}
         />
         <View style= {styles.row}>
         <View style={styles.equalWidthContainer}>
         <NumberInput
            label="Reservation number"
            value={ReservationNumber}
            onChange={setReservationNumber}
            min={0}
            max={1000}
         />
         </View>
         <View style={styles.equalWidthContainer}>
         <NumberInput
            label="Room number"
            value={RoomNumber}
            onChange={setRoomNumber}
            min={0}
            max={200}
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
            minimumDate={null}
         />
         </View>




         <Button
            title="Reserver"
            onPress={handleForm}
         />
        </ScrollView>
       </KeyboardAvoidingView>
    );
}

const styles= StyleSheet.create ({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        },
    equalWidthContainer: {
        flex: 1,
        marginHorizontal: 8,
      },
    })
