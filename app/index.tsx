import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  Button  from './Components/Button';
import TransportReservationForm from './TransportForm';

export default function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <View style={styles.container}>
      {showForm ? (
        <TransportReservationForm />
      ) : (
        <View style={styles.home}>
          <Text style={styles.title}>Bienvenue à Magic Hotels</Text>
          <Button title="Reserver un transport" onPress={() => setShowForm(true)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
});
