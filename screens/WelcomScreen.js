import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Keychain from 'react-native-keychain'; // For biometric authentication
import { useNavigation } from '@react-navigation/native';
import { setUserLoading } from '../redux/slices/user'; // Reusing existing session management
import { useDispatch } from 'react-redux'; // To manage user session

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Manage user session state

  // Handle successful authentication and session management
  const handleAuthSuccess = () => {
    dispatch(setUserLoading(true)); // Set loading state for user session

    // Simulate a successful session creation and navigation to Home screen
    setTimeout(() => {
      dispatch(setUserLoading(false));
      navigation.navigate('Home'); // Navigate to home screen after successful login
    }, 1000); // Simulate loading duration
  };

  // Handle Biometric Login
  const handleBiometricLogin = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        authenticationPrompt: 'Authenticate with biometrics',
        authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
      });
      if (credentials) {
        console.log('Authenticated with biometrics');
        handleAuthSuccess(); // Reuse session management for success
      } else {
        console.log('Biometric authentication failed');
      }
    } catch (error) {
      console.log('Biometric authentication error:', error);
    }
  };

  return (
    <View className="h-full flex justify-around">
      <View className="flex-row justify-center mt-10">
        <Image source={require('../assets/images/111.png')} className="h-96 w-96 shadow" />
      </View>

      <View className="items-center my-10">
        <Text className="text-center font-bold text-4xl mb-10">CoinDaddy</Text>

        {/* PIN Sign In Button */}
        <TouchableOpacity
          className="shadow p-3 rounded-full bg-blue-500 mb-5 w-3/4"
          onPress={() => navigation.navigate('Home')}
        >
          <Text className="text-center text-white text-lg font-bold">Sign In with PIN</Text>
        </TouchableOpacity>

        {/* Biometric Sign In Button */}
        <TouchableOpacity
          className="shadow p-3 rounded-full bg-green-500 w-3/4"
          onPress={handleBiometricLogin}
        >
          <Text className="text-center text-white text-lg font-bold">Sign In with Biometrics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
