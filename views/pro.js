import { StyleSheet, Dimensions, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NbaTeam } from './nbaTeam';
const { width:CATEGORY_SCREEN_WIDTH } = Dimensions.get("window");

export function Pro(){
    const [selectedScreen, setSelectedScreen] = useState('nba'); // 현재 선택된 화면 상태
    const renderScreen = () => {
        switch (selectedScreen) {
          case 'nba':
            return <NbaTeam />;
          case 'kbl':
            return <Text>KBL</Text>;
          default:
            return <Text>NBA</Text>;
        }
    };

    return(
        <ScrollView contentContainerStyle={styles.BodyMain}>
            <View style={{justifyContent: "space-around", flexDirection: "row", padding: 5, backgroundColor: "white", height: 40, alignItems: "center", borderBottomColor: "whitesmoke", borderBottomWidth: 1}}>
                <TouchableOpacity onPress={() => setSelectedScreen('nba')}>
                    {/* <MaterialIcons name="location-on" size={24} color={selectedScreen === 'location' ? '#FFD73C' : 'gray'} /> */}
                    <Text style={{color: selectedScreen === 'nba' ? '#FFD73C' : 'gray'}}>NBA</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedScreen('kbl')}>
                    {/* <Feather name="list" size={24} color={selectedScreen === 'list' ? '#FFD73C' : 'gray'} /> */}
                    <Text style={{color: selectedScreen === 'kbl' ? '#FFD73C' : 'gray'}}>KBL</Text>
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
