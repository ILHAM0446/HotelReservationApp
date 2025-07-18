import { StyleSheet } from 'react-native';

export const Screenstyles = StyleSheet.create({
   fakeModalWrapper: {
     position: 'absolute',
     top: 0,
     bottom: 0,
     left: 0,
     right: 0,
     zIndex: 10,
     backgroundColor: 'rgba(255,255,255,0)',
   },

  backgroundImage: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
    top: -40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f9b300',
    marginBottom: 5,
    textAlign: 'center',
    top: -10,
  },
  pricingSection: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: 'rgba(249, 179, 0, 0.85)',
    padding: 15,
    borderRadius: 12,
  },
  pricingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  pricingLabel: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  pricingPrice: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  TitleForm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  inputHalf: {
    flex: 1,
    minWidth: '30%',
  },
  radioSection: {
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  radioSelected: {
    backgroundColor: '#e0f2fe',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioInner: {
    width: 10,
    height: 10,
  },
  radioInnerSelected: {
    borderRadius: 5,
    backgroundColor: '#1e40af',
  },
  section: {
    marginBottom: 10,
  },
  codePromoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  priceSection: {
    marginTop: 0.5,
    marginBottom: 20,
  },
  PriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  PriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#10b981',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#f9b300',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export const Formstyles = StyleSheet.create({
    fakeModalWrapper: {
         position: 'absolute',
         top: 0,
         bottom: 0,
         left: 0,
         right: 0,
         zIndex: 10,
         backgroundColor: 'rgba(255,255,255,0)', // utile pour cliquer derrière si nécessaire
       },
  backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
  overlay: {
      flex: 1,
    },
  scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
      },
      transparentBackground: {
        backgroundColor: 'transparent',
      },
  formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 20,
        padding: 20,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      justifyContent: 'center',
    },

  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,

  },

  formHeader: {
    backgroundColor: '#f9b300',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom:25,
  },
  formHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

    titleSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },

  inputContainer: {
    marginBottom: 15,
  },

  FlexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  passengersLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 8,
    fontWeight: '500',
  },

  totalContainer: {
    flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
      backgroundColor: '#FEF3C7',
      paddingHorizontal: 15,
      borderRadius: 8,
      marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
  },
  totalPrice: {
    fontSize: 18,
      fontWeight: 'bold',
      color: '#92400e',
  },
  inputField: {
    flex: 1,
    marginHorizontal: 5,
  },
  promoContainer: {
    paddingHorizontal: 12,
    marginBottom: 0,
  },
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  successOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },

    successContainer: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
      width: '100%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },

    successHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
      paddingBottom: 15,
    },

    successIcon: {
      backgroundColor: '#f9b300',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },

    successTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1f2937',
    },

    successContent: {
      marginVertical: 1,
    },

    successRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },

    successLabel: {
      fontSize: 15,
      color: '#6b7280',
      fontWeight: '500',
      flex: 1,
    },

    successValue: {
      fontSize: 15,
      color: '#1f2937',
      fontWeight: '600',
      flex: 1,
      textAlign: 'right',
    },

    successTotal: {
      marginTop: 15,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
    },

    successTotalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1e40af',
      textAlign: 'center',
    },

    closeButton: {
      marginTop: 13,
      backgroundColor: '#1e40af',
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: 'center',
    },

    closeButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
scheduleContainer: {
  backgroundColor: 'rgba(255, 255, 255, 0.90)',
  borderRadius: 10,
  padding: 16,
  marginBottom:0,
  marginHorizontal:20,
  borderWidth: 1,
  borderColor: '#ddd',
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
  top:-110,
},
scheduleTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
  color: '#1e40af',
  textAlign: 'center',
},
scheduleSubtitle: {
  fontSize: 16,
  fontWeight: '600',
  marginTop: 12,
  marginBottom: 4,
  color: '#333',
},
scheduleText: {
  fontSize: 14,
  color: '#555',
  lineHeight: 20,
},
scheduleToggle: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 12,
  paddingHorizontal: 10,
  paddingVertical: 8,
  marginBottom:70,
  top:-45,
},
switchLabel:{
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginLeft:30,
    },

});
