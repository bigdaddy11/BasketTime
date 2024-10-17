import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export function NbaTeam(){
    const [standings, setStandings] = useState([]);
    const [selectedScreen, setSelectedScreen] = useState('East'); // 현재 선택된 화면 상태
    const [selectedTeam, setSelectedTeam] = useState(null); // 현재 선택된 팀
    const [players, setPlayers] = useState({});

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
      "defaultIcon": require("../assets/icon.png"),
    };

    useEffect(() => {
        const fetchTeamsAndPlayers = async () => {
          try {
            // 팀 정보 가져오기
            const teamsResponse = await axios.get('http://192.168.0.11:8080/api/nba/teams');
            setStandings(teamsResponse.data); // 데이터가 data 필드에 있다고 가정

            // 전체 플레이어 데이터 가져오기
            const playersResponse = await axios.get('http://192.168.0.11:8080/api/nba/players/all');
              
            const allPlayers = playersResponse.data;
            // 팀별로 플레이어를 분류
            const playersByTeam = {};
            teamsResponse.data.forEach((team) => {
              playersByTeam[team.id] = allPlayers.filter((player) => player.teamId === team.id);
            });
            
            setPlayers(playersByTeam);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchTeamsAndPlayers();
      }, []);

      // 팀을 클릭했을 때 선수 목록을 보여주는 함수
      const handleTeamPress = (teamId) => {
        setSelectedTeam(selectedTeam === teamId ? null : teamId);  // 이미 선택한 팀이면 닫기
      };

    
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
            
            <View>
    {standings.map((item) => {
      // 비교를 문자열로 변환하여 일관성 있게 처리
      if (item.conference === selectedScreen) {
        return (
          <TouchableOpacity 
            key={item.id} 
            style={{flex: 1, justifyContent: "center"}}
            onPress={() => handleTeamPress(item.id)}
          >
            <View key={item.id + "-view"} style={styles.standingsItem}>
              <Image 
                source={logoPath[item.fullName]} 
                style={styles.logo}
              />
              <Text style={{fontSize: 16}}>{item.fullName}</Text>
            </View>

            {/* 선수 목록을 표시하는 부분 */}
            {selectedTeam === item.id && (
                <View style={styles.playersList}>
                  {players[item.id] && players[item.id].length > 0 ? (
                      players[item.id].map((player) => (
                        <TouchableOpacity
                          key={players.id} 
                        >
                          <View style={{ flexDirection: "row", padding: 5, alignItems: "center"}}>
                            <Image
                              source={logoPath["defaultIcon"]} 
                              style={styles.playerlogo}
                            />
                            <Text style={styles.playerName}>
                            {player.firstName} {player.lastName} 
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text>No players found for this team</Text>
                  )}
                </View>
            )}
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          })}
        </View>
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
    playerlogo: {
      width: 40,
      height: 40,
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
      marginLeft: 40,
      paddingBottom: 10,
    },
    playerName: {
      fontSize: 16,
      paddingVertical: 2,
    },
  });
  