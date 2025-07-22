import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(245, 241, 241, 0.25)', // Fond semi-transparent
    },
    formContainer: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputWrapper: {
        flex: 1,
        marginRight: 8,
        marginBottom: 16,
    },
    container: {
        marginBottom: 16,},
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8, },
    input: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',},
    dateText: {
        color:'#333',
        fontSize:16,},
    dateTimeField: {
        marginBottom: 15,
        marginTop: 10,
    },
    dateTimeInput: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateTimeText: {
        color: '#333',
        fontSize: 15,
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
        alignSelf: 'center',
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
  inputContainer: {
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#ffebcd',
    padding: 13,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    flex: 1,
  },




restaurantContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
},
peopleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
},
peopleLabel: {
    fontSize: 14,
    color: '#000',
    marginRight: 5,
},
numberInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 8,
    width: 60,
    textAlign: 'center',
    backgroundColor: '#FFF',
},



menuContainer: {
  marginTop: 20,
  backgroundColor: 'rgba(255,255,255,0.8)',
  borderRadius: 10,
  padding: 20,
},
menuSection: {
  marginBottom: 20,
},
menuTitle: {
  fontSize: 19,
  fontWeight: 'bold',
  marginBottom: 15,
  color: '#333',
},
personContainer: {
  marginBottom: 15,
  borderBottomWidth: 1,  // Ligne noire en bas
  borderBottomColor: '#000',
  paddingBottom: 10,     // Espace sous la ligne
},
personHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between', // Pour pousser l'icône à droite
  alignItems: 'center',
  paddingVertical: 10,
  width: '100%', // Prend toute la largeur
},
personTitle: {
  fontWeight: 'bold',
  fontSize: 18,
  color: '#000',
  flex: 1, // Prend tout l'espace disponible
},
iconContainer: {
  marginLeft: 10, // Espace entre le texte et l'icône
},
menuType: {
  marginTop: 15,
},
typeTitle: {
  fontWeight: 'bold',
  fontSize: 17,
  marginBottom: 10,
  color: '#1e90ff',
},
typeItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#EEE',
},
checkboxContainer: {
  marginRight: 10,
},
checkbox1: {
  width: 20,
  height: 20,
  borderRadius: 4,
  borderWidth: 2,
  borderColor: '#666',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
},
checkboxSelected: {
  backgroundColor: '#f7b500',
  borderColor: '#f7b500',
},
menuItemText: {
  flex: 1,
  color: '#000',
  fontSize: 16,
},



cakesGrid: {
    marginTop: 15,
},
cakeCard: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
},
radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f7b500',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
},
radioButtonSelected: {
    backgroundColor: '#f7b500',
    borderColor: '#f7b500',
},
radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
},



  totalContainer: {
    marginTop: 30,
    backgroundColor: '#FFF5E1',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  commentContainer: {
    marginBottom: 20,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
    commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 60,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
commentToggleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
checkbox: {
  marginLeft: 10,
},
checkboxBox: {
  width: 18,
  height: 18,
  borderWidth: 1,
  borderColor: '#333',
  borderRadius: 3,
  justifyContent: 'center',
  alignItems: 'center',
},

checkboxInner: {
  width: 10,
  height: 10,
  backgroundColor: '#333',
  borderRadius: 1,
},
  promoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // ou marginRight dans le bouton si React Native < 0.71
  },
  promoInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  promoButton: {
    backgroundColor: '#f7b500',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  promoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  promoValid: {
    color: 'green',
    marginTop: 8,
  },
  promoInvalid: {
    color: 'red',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f7b500',
    marginBottom: 5,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f7b500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },




// style commun

sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f7b500',
    marginBottom: 15,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
},
cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
},
cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
},
price: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
},



});