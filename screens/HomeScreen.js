import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const items = [
    {
        id: 1,
        place: 'Food',
        country: 'Pakistan'
    },
    {
        id: 2,
        place: 'Car',
        country: 'England',
    },
    {
        id: 3,
        place: 'Rent',
        country: 'America',
    },
    {
        id: 4,
        place: 'Phone',
        country: 'America'
    },
    {
        id: 5,
        place: 'Food',
        country: 'Pakistan'
    },
    {
        id: 6,
        place: 'Car',
        country: 'England',
    },
    {
        id: 7,
        place: 'Rent',
        country: 'America',
    },
    {
        id: 8,
        place: 'Phone',
        country: 'America'
    }

]

export default function HomeScreen() {
    const navigation = useNavigation();

    const { user } = useSelector(state => state.user);
    const [trips, setTrips] = useState(items);

    const isFocused = useIsFocused();

    // const fetchTrips = async ()=>{
    //     const q = query(tripsRef, where("userId", "==", user.uid));
    //     const querySnapshot = await getDocs(q);
    //     let data = [];
    //     querySnapshot.forEach(doc=>{
    //         // console.log('documement: ',doc.data());
    //         data.push({...doc.data(), id: doc.id})
    //     })
    //     setTrips(data);
    // }

    // useEffect(()=>{
    //     if(isFocused)
    //         fetchTrips();
    // },[isFocused])

    const handleLogout = async () => {
        // await signOut(auth);
        console.log("logout")
    }

    const openMenu = async () => {
        // await signOut(auth);
        console.log("menu")
    }


    return (
        <ScreenWrapper className="flex-1">
            <View className="flex-row justify-between items-center p-4">
                <TouchableOpacity onPress={openMenu} className="p-2 px-3 bg-white border border-gray-200 rounded-full"> 
                    <Text className={colors.heading}>Menu</Text>
                </TouchableOpacity>
                <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>CoinDaddy</Text>
                <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                    <Text className={colors.heading}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
                <Image source={require('../assets/images/banner.png')} className="w-60 h-60" />
            </View>
            <View className="px-4 space-y-3">
                <View className="flex-row justify-between items-center mt-3">
                    <Text className={`${colors.heading} font-bold text-xl`}>Recent Transactions</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddTransaction')}
                        className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                        <Text className={`{colors.heading} text-center font-bold`}>Add new</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 430 }}>
                    <FlatList
                        data={trips}
                        numColumns={1}
                        ListEmptyComponent={<EmptyList message={"You haven't recorded any trips yet"} />}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        className="mx-1"
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('Transactions', { ...item })} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                                    <View className="flex-row left">
                                        <Image source={randomImage()} className="w-10 h-10 mb-2 mr-5" />
                                        <Text className={`${colors.heading} font-bold mt-3`}>{item.place}</Text>

                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        </ScreenWrapper>
    )
}