import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../theme';
import BackButton from '../components/backButton';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore';
import { tripsRef } from '../config/firebase';
import { useSelector } from 'react-redux';
import { categories } from '../constants/index';

export default function AddTransactionScreen() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [category, setCategory] = useState('');
  const [selectedType, setSelectedType] = useState();

  const navigation = useNavigation();

  const handleAddTrip = async () => {
    if (description && amount) {
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        description,
        amount,
        type: selectedType,
        userId: user.uid,
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      Snackbar.show({
        text: 'Description and Amount are required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>

            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              Add Transaction
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image className="h-60 w-60" source={require('../assets/images/4.png')} />
          </View>
          <View className="space-y-2 mx-2">
            <View></View>
            <Text className={`${colors.heading} text-lg font-bold`}>Description</Text>
            <TextInput
              value={description}
              onChangeText={(value) => setDescription(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => setSelectedType('Income')}
                className={`rounded-full bg-white w-20 px-2 py-2 mb-5 mr-5 ${
                  selectedType === 'Income' ? 'bg-green-100 border border-gray-400' : 'opacity-70'
                }`}
              >
                <Text className="font-bold text-center">Income</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedType('Expense')}
                className={`rounded-full bg-white w-20 px-2 py-2 mb-5 ${
                  selectedType === 'Expense' ? 'bg-green-100 border border-gray-400' : 'opacity-70'
                }`}
              >
                <Text className="font-bold text-center">Expense</Text>
              </TouchableOpacity>
            </View>
            <Text className={`${colors.heading} text-lg font-bold`}>Amount</Text>
            <TextInput
              value={amount}
              onChangeText={(value) => setAmount(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
            <View className="flex-row flex-wrap items-center">
              {categories.map((cat) => {
                let bgColor = 'bg-white';
                let border = ''
                let font = '';
                if (cat.value == category) {
                  bgColor = 'bg-green-100';
                  font = 'font-bold';
                  border = 'border border-gray-400'
                }
                return (
                  <TouchableOpacity
                    onPress={() => setCategory(cat.value)}
                    key={cat.value}
                    className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2 ${border}`}
                  >
                    <Text className={`${font}`}>{cat.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleAddTrip}
              style={{ backgroundColor: colors.button }}
              className="my-6 rounded-full p-3 shadow-sm mx-2"
            >
              <Text className="text-center text-white text-lg font-bold">
                Add Transaction
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
