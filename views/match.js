import { StyleSheet, Dimensions, View, ScrollView, Text} from 'react-native';
import { MainImage } from '../components/mainImage';

const { width:CATEGORY_SCREEN_WIDTH } = Dimensions.get("window");

export function Match(){
    return(
        <ScrollView contentContainerStyle={styles.BodyMain}>
            <MainImage></MainImage>
        </ScrollView>
    );
    
}

const styles = StyleSheet.create({
    BodyMain:{
        width: CATEGORY_SCREEN_WIDTH,
        flex: 1,
    }
});
