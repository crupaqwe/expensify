import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';

export default function SetPinScreen({navigation}) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  // Function to save the PIN
  const savePin = async () => {
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }
    try {
      await Keychain.setGenericPassword('userPin', pin);
      Alert.alert('Success', 'PIN saved successfully!');
      // Navigate to the login screen or home
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Error saving PIN:', error);
      Alert.alert('Error', 'Failed to save PIN');
    }
  }
  
  return (
    <View className="flex justify-between h-full mx-4">
      <View>
        <Text className="text-center font-bold text-4xl mb-10">
          Set Your PIN
        </Text>

        <TextInput
          value={pin}
          keyboardType="numeric"
          secureTextEntry
          placeholder="Enter your PIN"
          onChangeText={value => setPin(value)}
          className="p-4 bg-white rounded-full mb-3"
        />

        <TextInput
          value={confirmPin}
          keyboardType="numeric"
          secureTextEntry
          placeholder="Confirm your PIN"
          onChangeText={value => setConfirmPin(value)}
          className="p-4 bg-white rounded-full mb-3"
        />
      </View>

      <TouchableOpacity
        onPress={savePin}
        className="my-6 rounded-full p-3 shadow-sm mx-2">
        <Text className="text-center text-white text-lg font-bold">
          Save PIN
        </Text>
      </TouchableOpacity>
    </View>
  );
}
