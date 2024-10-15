import { StyleSheet, Dimensions, View, ScrollView, TouchableOpacity, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MainImage } from '../components/mainImage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { MatchList } from './matchList';

const { width:CATEGORY_SCREEN_WIDTH } = Dimensions.get("window");

export function Match(){
    const [selectedScreen, setSelectedScreen] = useState('location'); // 현재 선택된 화면 상태
    const renderScreen = () => {
        switch (selectedScreen) {
          case 'location':
            return <MainImage />;
          case 'list':
            return <MatchList>test</MatchList>;
          default:
            return <MainImage />;
        }
    };
    return(
        <ScrollView contentContainerStyle={styles.BodyMain}>
            <View style={{justifyContent: "space-around", flexDirection: "row", padding: 5, backgroundColor: "white", borderBottomColor: "whitesmoke", borderBottomWidth: 1, height: 40, alignItems: "center"}}>
                <TouchableOpacity onPress={() => setSelectedScreen('location')}>
                    <MaterialIcons name="location-on" size={24} color={selectedScreen === 'location' ? '#FFD73C' : 'gray'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedScreen('list')}>
                    <Feather name="list" size={24} color={selectedScreen === 'list' ? '#FFD73C' : 'gray'} />
                </TouchableOpacity>
            </View>            
            {renderScreen()}
        </ScrollView>
    );
    
}

const styles = StyleSheet.create({
    BodyMain:{
        width: CATEGORY_SCREEN_WIDTH,
        flex: 1,
    }
});
