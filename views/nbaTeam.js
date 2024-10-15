import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';

export function NbaTeam(){
    const [standings, setStandings] = useState([]);

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
      //"LA Clippers": require("../assets/teamlogo/nba/LA Clippers.gif"),
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
      //"Chicago Stags": require("../assets/teamlogo/nba/Chicago Stags.gif"),
      //"St. Louis Bombers": require("../assets/teamlogo/nba/St. Louis Bombers.gif"),
      //"Cleveland Rebels": require("../assets/teamlogo/nba/Cleveland Rebels.gif"),
      //"Detroit Falcons": require("../assets/teamlogo/nba/Detroit Falcons.gif"),
      //"Toronto Huskies": require("../assets/teamlogo/nba/Toronto Huskies.gif"),
      //"Washington Capitols": require("../assets/teamlogo/nba/Washington Capitols.gif"),
      //"Providence Steamrollers": require("../assets/teamlogo/nba/Providence Steamrollers.gif"),
      //"Pittsburgh Ironmen": require("../assets/teamlogo/nba/Pittsburgh Ironmen.gif"),
      //"Baltimore Bullets": require("../assets/teamlogo/nba/Baltimore Bullets.gif"),
      //"Indianapolis Jets": require("../assets/teamlogo/nba/Indianapolis Jets.gif"),
      //"Anderson Packers": require("../assets/teamlogo/nba/Anderson Packers.gif"),
      //"Waterloo Hawks": require("../assets/teamlogo/nba/Waterloo Hawks.gif"),
      //"Indianapolis Olympians": require("../assets/teamlogo/nba/Indianapolis Olympians.gif"),
      "Denver Nuggets": require("../assets/teamlogo/nba/Denver Nuggets.gif"),
      //"Sheboygan Redskins": require("../assets/teamlogo/nba/Sheboygan Redskins.gif"),
    };

    useEffect(() => {
        const fetchStandings = async () => {
          try {
            const response = await axios.get('http://192.168.0.11:8080/api/teams/nba');
            setStandings(response.data.data); // 데이터가 data 필드에 있다고 가정
            
            standings.map((team) => {
              console.log('"' + team.full_name + '": require("../assets/teamlogo/nba/' + team.full_name + '.gif"),');
            });
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchStandings();
      }, []);
    
      return (
        <ScrollView style={styles.container}>
            {standings.map((item) => (
                <View key={item.id} style={styles.standingsItem}>
                  <Image 
                    source={logoPath[item.full_name]} 
                    style={styles.logo}
                  />
                  <Text>{item.full_name}</Text>
                  {/* <Text>{item.abbreviation}</Text>
                  <Text>{item.conference}</Text> */}
                </View>
            ))}
        </ScrollView>
      );
};

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //padding: 20,
      backgroundColor: 'white',
    },
    standingsItem: {
      padding: 20,
      //marginBottom: 15,
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: "whitesmoke", 
      borderBottomWidth: 1
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 30,
        marginRight: 10,
        
        //marginRight: 2,
        //marginLeft: 20
    }
  });
  