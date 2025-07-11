import React , {useState} from 'react';
import { View , Text , TouchableOpacity , Platform , StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface SelectedDatesProps {
    label: string ;
    value: Date ;
    onChange: ( date: Date) => void ;
    error : string ;
    minimumDate?: Date | null ;
    }

export default function SelectDates ( { label , value , onChange , error , minimumDate = null ,}: SelectedDatesProps){
    const [showPicker , setShowPicker] = useState(false);
    const handleChange = ( event: any , selectedDate?: Date ) => {
        setShowPicker( Platform.OS === 'ios');
        if ( selectedDate){ onChange(selectedDate);}
        };
    return (
        <View style = {styles.container}>
            {label && < Text style={styles.label}> {label} </Text>}
            <TouchableOpacity
               style = {[styles.input , error ? styles.inputError : null]}
               onPress = { ()=> setShowPicker(true)}
               activeOpacity = {0.7}
            >
                <Text style ={styles.dateText}>
                   {value.toLocaleDateString( 'fr-FR', {
                       weekday: 'short',
                       day: 'numeric',
                       month: 'long',
                       year: 'numeric',
                       })}
                </Text>
            </TouchableOpacity>

            { error && <Text style={styles.errorText}> {error}</Text>}
            {showPicker && (
                <DateTimePicker
                  value ={value}
                  mode= "date"
                  display= {Platform.OS === 'ios' ? 'spinner': 'default'}
                  onChange={handleChange}
                  locale= "fr-FR"
                  minimumDate= {minimumDate || undefined }
                  themeVariant = "light"
                /> )}
        </View>
        );
}

const styles = StyleSheet.create ({
    container: {
        marginBottom: 16,},
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8, },
    input: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',},
    inputError: {
        borderColor: '#ff3b30',},
    dateText: {
        color:'#333',
        fontSize:16,},
    errorText: {
        color:'#ff3b30',
        fontSize: 14,
        marginTop: 4,},
    });









