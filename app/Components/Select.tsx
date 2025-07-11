import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Select({ label, selectedValue, onValueChange, items = [], placeholder }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#666"
          mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}
        >
          {items.map((item) => (
            <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  color= '#333'
                  style={[
                    styles.item,
                    item.value === '' ? styles.placeholderItem : styles.optionItem,
                  ]}
                />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
      fontWeight:'500',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    height: 42, // Ajouté pour fixer la hauteur
    justifyContent: 'center', // Centrer verticalement
  },
  picker: {
    height: 60,
    color: '#333',
    width: '100%',
  },
  item: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#333',
  },


});



