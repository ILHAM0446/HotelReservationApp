import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function NumberInput({ label, value, onChange, min = 1, max = 99 }) {
  const handleIncrement = () => {
    const newValue = Math.min(Number(value) + 1, max);
    onChange(newValue.toString());
  };

  const handleDecrement = () => {
    const newValue = Math.max(Number(value) - 1, min);
    onChange(newValue.toString());
  };

  const handleTextChange = (text) => {
    // Ne permet que des nombres entiers
    if (/^\d*$/.test(text)) {
      const num = text === '' ? min : Math.min(Math.max(Number(text), min), max);
      onChange(num.toString());
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleDecrement}
          disabled={Number(value) <= min}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleTextChange}
          keyboardType="numeric"
          selectTextOnFocus
        />
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleIncrement}
          disabled={Number(value) >= max}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    flex: 1,
    textAlign: 'center',
    padding: 12,
    fontSize: 18,
    backgroundColor: '#fff',
  },





  timePickerModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
},
timePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
},
timePickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
},
timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
},
timeSlotButton: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    margin: 5,
    borderRadius: 8,
    width: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
},
timeSlotButtonSelected: {
    backgroundColor: '#007AFF',
},
timeSlotText: {
    fontSize: 16,
    color: '#333',
},
timeSlotTextSelected: {
    color: 'white',
},

});





