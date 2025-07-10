import { StyleSheet } from 'react-native';

export const Screenstyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  logoWrapper: {
    marginBottom: -15,
    top: -7,
    left: 10,
    zIndex: 1,
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 50,


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
    backgroundColor: '#f9b300',
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
