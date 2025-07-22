import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import {Check ,AlertCircle,} from 'lucide-react-native';

interface InputProps {
label?: string;
value: string;
onChangeText: (text: string) => void;
placeholder?: string;
keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
onBlur?: () => void;
error?: string;
touched?: boolean;
isvalide?: boolean;
}

export default function Input({
label,
value,
onChangeText,
placeholder,
keyboardType = 'default',
onBlur,
error,
touched,
isvalide,
}: InputProps) {
// Détermine la couleur de la bordure selon l'état
let borderColor = '#ddd';
if (touched, isvalide) {
if (error) borderColor = '#D32F2F';
else borderColor = '#4CAF50';
}

return (
<View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <View style={{ position: 'relative' }}>
        <TextInput
            style={[styles.input, { borderColor }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            keyboardType={keyboardType}
            onBlur={onBlur} />
        {touched && isvalide && (
        <>
            {error ? (
            <AlertCircle color="red" size={20} style={{ position: 'absolute', right: 10, top: 14,  marginLeft: 5, }} />) : (
            <Check color="green" size={20} style={{ position: 'absolute', right: 10, top: 14 }} />
            )}
        </>
        )}
    </View>
    {touched && !!error && isvalide && error !== ' ' && (
    <Text style={styles.errorText}>{error}</Text>
    )}
</View>
);
}

export const styles = StyleSheet.create({
container: {
marginBottom: 12,
},
label: {
fontSize: 14,
color: '#666',
marginBottom: 8,
fontWeight: '500',
},
input: {
backgroundColor: '#fff',
borderRadius: 10,
paddingHorizontal: 15,
paddingVertical: 10,
fontSize: 16,
borderWidth: 1,
borderColor: '#ddd',
shadowColor: '#000',
shadowOpacity: 0.05,
shadowOffset: { width: 0, height: 2 },
elevation: 2,
paddingRight: 40,
},
errorText: {
color: '#D32F2F',
fontSize: 13,
marginTop: 4,
marginLeft: 2,
},
});