import { StyleSheet, View, TextInput, Text } from 'react-native';
import React, {useState} from "react";
import { Fontisto } from "@expo/vector-icons";

export function Header(){
    const onChangeText = (payload) => setText(payload);
    const [text, setText] = useState("");

    return (
        <View style={styles.header}>
        <View>
            <Text style={styles.Text}>Basket Time</Text>
        </View>
        
        {/* <TextInput
          //onSubmitEditing={addToDo}

          onChangeText={onChangeText}
          returnKeyType="default"
          value={text}
          placeholder={
            "관심있는 글 검색"
          }
          style={styles.input}
        /> */}
        <View style={styles.icongroup}>
            <Fontisto name="hipchat" size={24} color="black" style={styles.icon}/>
            <Fontisto name="nav-icon-grid" size={24} color="black" style={styles.icon}/>
        </View>
        
      </View>
    );
}

const styles = StyleSheet.create({
    header: {
        //flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFD73C',
        padding: 5,
    },
    icon: {
        padding: 10,
        justifyContent: 'center',
    },
    input: {
        flex: 4,
        backgroundColor: "black",
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        fontSize: 14,
    },
    Text: {
        fontSize: 18,
        color: "black",
        
    },
    icongroup: {
        //flex: "row",
        flexDirection: "row"
    }
});