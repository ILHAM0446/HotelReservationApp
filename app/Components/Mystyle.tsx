import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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