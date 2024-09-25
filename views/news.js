import { StyleSheet, Dimensions, View, ScrollView, Text} from 'react-native';
const { width:CATEGORY_SCREEN_WIDTH } = Dimensions.get("window");

export function News(){
    return(
        <ScrollView contentContainerStyle={styles.BodyMain}>
            <Text>소식화면</Text>
        </ScrollView>
    );
    
}

const styles = StyleSheet.create({
    BodyMain:{
        width: CATEGORY_SCREEN_WIDTH,
        //flex: 1,
    }
});
