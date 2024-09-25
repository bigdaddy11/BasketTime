import { StyleSheet, View, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, {useState} from "react";

const { width:CATEGORY_SCREEN_WIDTH } = Dimensions.get("window");

export function OrderCombo(){
    const [selectedValue, setSelectedValue] = useState('최신순');  // Picker 초기값

    return(
    <View style={styles.mainCombo}> 
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="최신순" value="1" />
          <Picker.Item label="추천순" value="2" />
        </Picker>
      </View>
    );
};

const styles = StyleSheet.create({
    mainCombo: {
        borderBottomWidth: 1,
        borderBlockColor: "#3A3D40",
      },
    picker: {
        width: CATEGORY_SCREEN_WIDTH,
        height: 50,
        color: "black",
    },
    pickerItem: {
        fontSize: 20
    },
});