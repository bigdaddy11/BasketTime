import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export function NbaTeam(){
    const [standings, setStandings] = useState([]);
    const [selectedScreen, setSelectedScreen] = useState('East'); // 현재 선택된 화면 상태
    const [expandedTeam, setExpandedTeam] = useState(null);  // 어떤 팀이 펼쳐져 있는지 추적하는 상태
    const [players, setPlayers] = useState({});  // 각 팀의 선수 목록을 저장하는 상태

    const logoPath = {
      "Atlanta Hawks": require("../assets/teamlogo/nba/Atlanta Hawks.gif"),
      "Boston Celtics": require("../assets/teamlogo/nba/Boston Celtics.gif"),
      "Brooklyn Nets": require("../assets/teamlogo/nba/Brooklyn Nets.gif"),
      "Charlotte Hornets": require("../assets/teamlogo/nba/Charlotte Hornets.gif"),
      "Chicago Bulls": require("../assets/teamlogo/nba/Chicago Bulls.gif"),
      "Cleveland Cavaliers": require("../assets/teamlogo/nba/Cleveland Cavaliers.gif"),
      "Dallas Mavericks": require("../assets/teamlogo/nba/Dallas Mavericks.gif"),
      "Denver Nuggets": require("../assets/teamlogo/nba/Denver Nuggets.gif"),
      "Detroit Pistons": require("../assets/teamlogo/nba/Detroit Pistons.gif"),
      "Golden State Warriors": require("../assets/teamlogo/nba/Golden State Warriors.gif"),
      "Houston Rockets": require("../assets/teamlogo/nba/Houston Rockets.gif"),
      "Indiana Pacers": require("../assets/teamlogo/nba/Indiana Pacers.gif"),
      "Los Angeles Lakers": require("../assets/teamlogo/nba/Los Angeles Lakers.gif"),
      "Memphis Grizzlies": require("../assets/teamlogo/nba/Memphis Grizzlies.gif"),
      "Miami Heat": require("../assets/teamlogo/nba/Miami Heat.gif"),
      "Milwaukee Bucks": require("../assets/teamlogo/nba/Milwaukee Bucks.gif"),
      "Minnesota Timberwolves": require("../assets/teamlogo/nba/Minnesota Timberwolves.gif"),
      "New Orleans Pelicans": require("../assets/teamlogo/nba/New Orleans Pelicans.gif"),
      "New York Knicks": require("../assets/teamlogo/nba/New York Knicks.gif"),
      "Oklahoma City Thunder": require("../assets/teamlogo/nba/Oklahoma City Thunder.gif"),
      "Orlando Magic": require("../assets/teamlogo/nba/Orlando Magic.gif"),
      "Philadelphia 76ers": require("../assets/teamlogo/nba/Philadelphia 76ers.gif"),
      "Phoenix Suns": require("../assets/teamlogo/nba/Phoenix Suns.gif"),
      "Portland Trail Blazers": require("../assets/teamlogo/nba/Portland Trail Blazers.gif"),
      "Sacramento Kings": require("../assets/teamlogo/nba/Sacramento Kings.gif"),
      "San Antonio Spurs": require("../assets/teamlogo/nba/San Antonio Spurs.gif"),
      "Toronto Raptors": require("../assets/teamlogo/nba/Toronto Raptors.gif"),
      "Utah Jazz": require("../assets/teamlogo/nba/Utah Jazz.gif"),
      "Washington Wizards": require("../assets/teamlogo/nba/Washington Wizards.gif"),
      "Denver Nuggets": require("../assets/teamlogo/nba/Denver Nuggets.gif"),
      "LA Clippers" : require("../assets/teamlogo/nba/LA Clippers.gif"),
      "western": require("../assets/teamlogo/nba/western.png"),
      "eastern": require("../assets/teamlogo/nba/eastern.png"),
    };

    useEffect(() => {
        const fetchStandings = async () => {
          try {
            const response = await axios.get('http://192.168.0.11:8080/api/teams/nba');
            setStandings(response.data.data); // 데이터가 data 필드에 있다고 가정
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchStandings();
      }, []);
    
      return (
        <ScrollView style={styles.container}>
            <View style={styles.conference}>
              <TouchableOpacity style={styles.conferenceText} onPress={() => setSelectedScreen('East')}>
                <Image source={logoPath["eastern"]} style={styles.smalllogo}/>
                <Text style={{color: selectedScreen === 'East' ? '#FFD73C' : 'gray'}}>동부 컨퍼런스</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.conferenceText} onPress={() => setSelectedScreen('West')}>
                <Image source={logoPath["western"]} style={styles.smalllogo}/>
                <Text style={{color: selectedScreen === 'West' ? '#FFD73C' : 'gray'}}>서부 컨퍼런스</Text>
              </TouchableOpacity>
            </View>
            {standings.map((item) => 
              item.conference === selectedScreen ? 
              (
                <TouchableOpacity key={item.id} style={{flex: 1, justifyContent: "center"}}>
                  <View key={item.id} style={styles.standingsItem}>
                    <Image 
                      source={logoPath[item.full_name]} 
                      style={styles.logo}
                    />
                    <Text style={{fontSize: 16}}>{item.full_name}</Text>
                  </View>
                </TouchableOpacity>
              ) : null
            )}
        </ScrollView>
      );
};

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //padding: 20,
      backgroundColor: 'white',
    },
    conference: {
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: 10,
      borderBottomColor: "whitesmoke", 
      borderBottomWidth: 1
    },
    conferenceText: {
      //marginRight: 0,
      flexDirection: "row",
      padding: 5,
      //borderRightColor: "whitesmoke", 
      //borderRightWidth: 1
    },
    standingsItem: {
      padding: 10,
      //marginBottom: 15,
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: "whitesmoke", 
      borderBottomWidth: 1
    },
    logo: {
        width: 90,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30,
        marginRight: 10,
    },
    smalllogo: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
        borderRadius: 30,
        marginRight: 3,
    },
    playersList: {
      paddingLeft: 20,
      paddingBottom: 10,
    },
    playerName: {
      fontSize: 16,
      paddingVertical: 2,
    },
  });
  