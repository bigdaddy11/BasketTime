import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, {useEffect, useState} from "react";
import { MainHome } from '../views/mainHome';
import { News } from '../views/news';
import { Match } from '../views/match';
import { MyPage } from '../views/mypage';

export function Footer(){
    const [selectedScreen, setSelectedScreen] = useState('home'); // 현재 선택된 화면 상태

    const renderScreen = () => {
        //console.log(selectedScreen);
        switch (selectedScreen) {
          case 'home':
            return <MainHome />;
          case 'news':
            return <News />;
          case 'match':
            return <Match />;
          case 'mypage':
            return <MyPage />;
          default:
            return <MainHome />;
        }
      };
    
    return(
        <View style={styles.container}>
            
            { renderScreen() }
           
            <View style={styles.footer}>
                <TouchableOpacity style={styles.bar} onPress={() => setSelectedScreen('home')}>
                    <Fontisto name="home" size={20} color={selectedScreen === 'home' ? '#FFD73C' : 'gray'} style={styles.icon}></Fontisto>
                    <Text style={[styles.text, { color: selectedScreen=== 'home' ? '#FFD73C' : 'gray' }]}>홈</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bar} onPress={() => setSelectedScreen('news')}>
                    <FontAwesome6 name="basketball" size={20} color={selectedScreen === 'news' ? '#FFD73C' : 'gray'} style={styles.icon}></FontAwesome6>
                    <Text style={[styles.text, { color: selectedScreen=== 'news' ? '#FFD73C' : 'gray' }]}>소식</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bar} onPress={() => setSelectedScreen('match')}>
                    <Fontisto name="search" size={20} color={selectedScreen === 'match' ? '#FFD73C' : 'gray'} style={styles.icon}></Fontisto>
                    <Text style={[styles.text, { color: selectedScreen=== 'match' ? '#FFD73C' : 'gray' }]}>경기매칭</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bar} onPress={() => setSelectedScreen('mypage')}>
                    <Fontisto name="person" size={20} color={selectedScreen === 'mypage' ? '#FFD73C' : 'gray'} style={styles.icon}></Fontisto>
                    <Text style={[styles.text, { color: selectedScreen=== 'mypage' ? '#FFD73C' : 'gray' }]}>마이페이지</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContent: {
        //flex: 1, // 화면을 차지하는 영역
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: 'white', // 이전 화면 잔상 방지
        //width: '100%', // 화면 너비를 100%로 설정
        //height: '100%', // 화면 높이를 100%로 설정
    },

    footer: {
        //flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",        
        //marginTop: -10,
        alignItems: "center",
        backgroundColor: "white",
        height: 50,
        
    },
    bar: {
        flex: 1,
        //flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //marginBottom: 30,
    },
    icon: {
        //padding: 10,
        justifyContent: 'center',
        marginBottom: 3,
    },
    text: {
        fontSize: 11,
        //color: "gray"
    }
});