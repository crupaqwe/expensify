import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom Header */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome!</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
      />
      {/* Add other DrawerItem components as needed */}

      {/* Custom Footer */}
      <TouchableOpacity
        style={{ padding: 20 }}
        onPress={() => {
          // Handle logout or other actions
          console.log('Logout Pressed');
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
