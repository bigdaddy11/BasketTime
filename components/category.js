import { StyleSheet, Pressable, Text, ScrollView, Image } from 'react-native';

export function Category(){
    const textSample = ["블라블라","주식.투자","썸.연애","암호화폐","부동산","셀소.미팅","엄청긴거도들어가나"];

    return(
        <ScrollView 
            contentContainerStyle={styles.categoryView} 
            horizontal={true}
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
        >
        {
            textSample.map((text, index) => (
            <Pressable style={styles.category} key={text.id || index}>
                <Image
                source={{ uri: 'https://picsum.photos/20/20' }} // 가로 200, 세로 300 크기의 랜덤 이미지
                style={styles.categoryImage}
                />
                <Text>{text}</Text>
            </Pressable>
            ))
        }
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    categoryView: {
        flexDirection: "row",
        backgroundColor: "black",
        padding: 20,
        paddingLeft: 10,
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBlockColor: "white",
    },
      category: {
        flexDirection: "row",
        padding: 5,
        paddingRight: 10,
        marginRight: 5,
        borderRadius: 30,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    categoryImage: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
        borderRadius: 30,
        marginRight: 2,
    },
});