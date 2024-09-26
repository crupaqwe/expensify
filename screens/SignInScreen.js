import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';
import { colors } from '../theme';

export default function SignInScreen({navigation}) {
  const [pin, setPin] = useState('');

  // Function to verify the stored PIN
  const verifyPin = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (pin == 123) {
        console.log('PIN is correct');
        Alert.alert('Success', 'Login successful!');
        // Navigate to home screen
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid PIN');
      }
    } catch (error) {
      console.log("Couldn't access Keychain", error);
    }
  };

  // Function to handle biometric login
  const handleBiometricLogin = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        authenticationPrompt: {
          title: 'Authenticate with biometrics',
        },
        authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
      });
      if (credentials) {
        console.log('Authenticated with biometrics');
        // Navigate to home screen
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Biometric authentication failed');
      }
    } catch (error) {
      console.log('Biometric authentication error', error);
    }
  };

  return (
    <View className="flex justify-between h-full mx-4 mt-40">
      <View>
        <Text className="text-center font-bold text-4xl my-10">
          Sign In with PIN
        </Text>
        <TextInput
          value={pin}
          keyboardType="numeric"
          secureTextEntry
          placeholder="Enter your PIN"
          onChangeText={value => setPin(value)}
          className="p-4 bg-white rounded-full mb-3"
        />
      </View>

      <TouchableOpacity
        onPress={verifyPin}
        className="shadow p-3 rounded-full bg-green-500">
        <Text className="text-center text-white text-lg font-bold">
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleBiometricLogin}
        className="my-6 rounded-full p-3 shadow-sm mx-2">
        <Text className="text-center text-white text-lg font-bold">
          Sign In with Biometrics
        </Text>
      </TouchableOpacity>
    </View>
  );
}
