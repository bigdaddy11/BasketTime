import { StyleSheet, View, Pressable, Text } from 'react-native';
import React, {useState} from "react";

export function HeaderTab(){
    const [tab, setTab] = useState(true);
    const home = () => setTab(true);
    const popularity = () => setTab(false);
    
    return(
        <View style={styles.tab}>
        <Pressable onPress={home} style={{ ...styles.tabPress, borderBlockColor: tab ? "white" : "#3A3D40"}}>
          <Text style={{ ...styles.btnText, color: tab ? "white" : "#3A3D40" }}>홈</Text>
        </Pressable>
        <Pressable onPress={popularity} style={{ ...styles.tabPress, borderBlockColor: !tab ? "white" : "#3A3D40"}}>
        <Text style={{ ...styles.btnText, color: !tab ? "white" : "#3A3D40" }}>인기</Text>
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
    tab: {
        //flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        //padding: 10,
        marginTop: 10
    },
    tabPress: {
        flex: 1, 
        alignItems: "center", 
        paddingBottom: 10, 
        borderBottomWidth: 1,
    },
});