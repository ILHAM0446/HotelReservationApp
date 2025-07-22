import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { ChevronDown, Check, AlertCircle } from 'lucide-react-native';
import i18n from '../../i18n';

interface SelectItem {
  label: string;
  value: string;
  data?: any;
}

interface SelectProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: SelectItem[];
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  isvalide?: boolean;
}

export default function Select({
  label,
  selectedValue,
  onValueChange,
  items,
  disabled = false,
  error,
  touched,
  isvalide,
}: SelectProps) {
  const [isVisible, setIsVisible] = useState(false);

  const selectedItem = items.find(item => item.value === selectedValue);
  const displayValue = selectedItem?.label;

  // Détermine la couleur de la bordure selon l'état
  let borderColor = '#ddd';
  if (touched && isvalide) {
    if (error) borderColor = '#D32F2F';
    else borderColor = '#4CAF50';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ position: 'relative' }}>
        <TouchableOpacity
          style={[
            styles.selector,
            { borderColor },
            error && styles.selectorError,
            disabled && styles.selectorDisabled,
          ]}
          onPress={() => !disabled && setIsVisible(true)}
          disabled={disabled}
        >
          <Text style={[
            styles.selectorText,
            !selectedItem && styles.placeholderText,
            disabled && styles.disabledText,
          ]}>
            {displayValue}
          </Text>
          <ChevronDown
            size={20}
            color={disabled ? '#9ca3af' : '#6b7280'}
          />
          {touched && isvalide && (
            <>
              {error ? (
                <AlertCircle color="red" size={20} style={{ position: 'absolute', right: 10, top: 14 }} />
              ) : (
                <Check color="green" size={20} style={{ position: 'absolute', right: 10, top: 14 }} />
              )}
            </>
          )}
        </TouchableOpacity>
      </View>
      {touched && !!error && isvalide && error !== ' ' && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
            </View>

            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === selectedValue && styles.selectedOption,
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setIsVisible(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    item.value === selectedValue && styles.selectedOptionText,
                  ]}>
                    {item.label}
                  </Text>
                  {item.value === selectedValue && (
                    <Check size={20} color="#1e40af" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight:'500',
  },
  selector: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  selectorError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  selectorDisabled: {
    backgroundColor: '#f3f4f6',
    opacity: 0.6,
  },
  selectorText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  placeholderText: {
    color: '#374151',
  },
  disabledText: {
    color: '#9ca3af',
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    maxHeight: '70%',
    overflow: 'hidden',
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  selectedOption: {
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  selectedOptionText: {
    color: '#1e40af',
    fontWeight: '500',
  },
});