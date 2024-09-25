import { Pressable, Text, StyleSheet, View } from "react-native";

export function MainBanner(){
    return(
        <View style={styles.container}>
            <View style={styles.viewrow}>
                <Pressable style={styles.banner}>
                    <Text style={styles.Text}>경기매칭</Text>
                </Pressable>
                <Pressable style={styles.banner}>
                    <Text style={styles.Text}>TEAM</Text>
                </Pressable>
            </View>
            <View style={styles.viewrow}>
                <Pressable style={styles.banner}>
                    <Text style={styles.Text}>NBA</Text>
                </Pressable>
                <Pressable style={styles.banner}>
                    <Text style={styles.Text}>KBL</Text>
                </Pressable>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        //padding: 10,
    },
    viewrow: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        marginBottom: -10,
        
    },
    banner: {
        flex: 1,
        borderColor: "whitesmoke",
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        borderRadius: 10,
        backgroundColor: "white",
        marginRight: 5
    },
    BodyImage: {
        //width: CATEGORY_SCREEN_WIDTH-20,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
        marginRight: 2,
    },
    Text: {
        color: "black",
        fontSize: 20,
    }
});