import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Dimensions, ActivityIndicator, Text, TouchableOpacity, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { width:CATEGORY_SCREEN_WIDTH } = Dimensions.get("window");
const GOOGLE_PLACES_API_KEY = 'AIzaSyCiP64B8lfsCRHNDa94JRJJ0JI1qd8kXuQ';

export function MainImage(){
    const [basketballCourts, setBasketballCourts] = useState([]);
    const [selectedCourt, setSelectedCourt] = useState(null); // 선택된 농구장 정보 저장
    const [imageUrl, setImageUrl] = useState(null); //농구장 이미지 정보 저장
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [markerClicked, setMarkerClicked] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

    // Agenda에 필요한 형식의 데이터 준비
    const loadItems = () => {
        const newItems = {};
        newItems[todayString] = [
        { name: '오늘 일정', height: 80 },
        ];
        setItems(newItems);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // 날짜 선택 후 호출되는 함수
        setSelectedDate(date);
        hideDatePicker();
    };

    // 지도 위치가 변경될 때마다 이벤트 발생
    const onRegionChangeComplete = (newRegion) => {
        if (!markerClicked) { // Marker를 클릭하지 않은 경우에만 실행
            setRegion(newRegion);
            fetchBasketballCourts(newRegion); // 위치 변경 후 새로운 농구장 조회
          } else {
            setMarkerClicked(false); // Marker 클릭 상태 초기화
          }
    };

    const calculateRadius = (region) => {
        const { latitudeDelta } = region;
        // 지도에서의 latitudeDelta 값으로 대략적인 반경(m)을 계산 (1도 ≈ 111km)
        const radius = latitudeDelta * 111 * 1000 / 2; // 반경은 화면의 절반 크기
        return Math.floor(radius); // 미터 단위로 변환
    };

    const fetchBasketballCourts = async(newRegion) => {
        setLoading(true);
        const radius = calculateRadius(newRegion); // 새로운 radius 계산

        try {
            const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${newRegion.latitude},${newRegion.longitude}&radius=${radius}&type=park&keyword=basketball&key=${GOOGLE_PLACES_API_KEY}`
            );
            setBasketballCourts(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    // Marker 클릭 시 호출되는 함수
    const handleMarkerPress = (court) => {
        //console.log(court);
        setMarkerClicked(true); // Marker 클릭 상태로 변경
        setSelectedCourt(court); // 클릭한 농구장 정보를 상태에 저장
        const photoReference = court.photos[0]?.photo_reference;
        if (photoReference) {
            const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
            setImageUrl(url); // 이미지 URL 설정
          }
    };

    //Cancel버튼 클릭 시 팝업 닫음
    const handleCancelPress = () => {
        setSelectedCourt(null);
    }

    const moveToCurrentLocation = async () => {
        // 위치 권한 요청
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('위치 권한이 거부되었습니다.');
            return;
        }

        // 현재 위치 가져오기
        let location = await Location.getCurrentPositionAsync({});

        setRegion(prevRegion => ({
            ...prevRegion, // 기존 region 값 복사
            latitude: location.coords.latitude,  // 새로운 latitude 값
            longitude: location.coords.longitude, // 새로운 longitude 값
          }));
    }

    useEffect(() => {
        (async () => {
            moveToCurrentLocation();
        })();
        
    }, []);

    useEffect(() => {
        console.log(selectedCourt);
    }, [selectedCourt]);
    
    // region이 변경될 때 fetchBasketballCourts 호출
    useEffect(() => {
        if (region.latitude && region.longitude) {
            fetchBasketballCourts(region);
        }
    }, [region]);
    return(
        <View style={styles.Advertising}>
        {loading ? (
            <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="white" />
            </View>
            ) : (
                <MapView
                style={styles.map}
                initialRegion={region}
                //region={region}
                onRegionChangeComplete={onRegionChangeComplete}
                pointerEvents={loading ? 'none' : 'auto'} // 로딩 중일 때 지도 상호작용 비활성화
            >
                {basketballCourts.map((court, index) => (
                    <Marker
                    key={court.place_id}
                    coordinate={{
                        latitude: court.geometry.location.lat,
                        longitude: court.geometry.location.lng,
                    }}
                    title={court.name}
                    description={court.vicinity}
                    onPress={() => handleMarkerPress(court)} // Marker 클릭 시 이벤트 처리
                    />
            ))}
            </MapView>
        )}
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={moveToCurrentLocation}>
                <MaterialIcons name="my-location" size={24} color="#FFD73C" />
            </TouchableOpacity>
        </View>

        {selectedCourt && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'whitesmoke', padding: 5 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                {/* { imageUrl && (
                    <Image source={{ uri: imageUrl}} style={styles.courtImage}/> 
                )} */}
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", padding: 5}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{selectedCourt.name}</Text>
                    <View style={{ }}>
                        <TouchableOpacity onPress={handleCancelPress}>
                            <MaterialIcons style={{}} name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    
                    {/* <Text style={{ fontSize: 12, fontWeight: 'bold', flex: 1 }}>{selectedCourt.vicinity}</Text> */}
                </View>    
            </View>
            <View style={{ flex: 1, top: 0, flexDirection: "row" }}>
                <View style={{backgroundColor: "#1478CD", padding: 10, borderRadius: 5, marginRight: 5}}>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={{fontSize: 12, color: "white"}}>{selectedDate.toLocaleDateString('ko-KR',{year: 'numeric'})}</Text>
                        <Text style={styles.dateText}>
                            {selectedDate.toLocaleDateString('ko-KR',{month: 'long'})}
                            {" " + selectedDate.toLocaleDateString('ko-KR',{day: 'numeric'})}
                            {"(" + selectedDate.toLocaleDateString('ko-KR',{weekday: 'short'}) + ")"}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"  // 'time' 또는 'datetime'으로 변경 가능
                        date={selectedDate}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View >
                <View style={{backgroundColor: "white", padding: 10, flex: 1, borderRadius: 5}}>
                    <View style={{flexDirection: "row", marginBottom: 10, flex: 1}}>
                        <Text style={{}}>[19:00] 3대3 초보분들 모집해요.</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={styles.textAttention}>초보</Text>
                        <Text style={styles.textAttention}>3 VS 3</Text>
                        <Text style={styles.textAttention}>참여인원 : 5</Text>
                    </View>
                </View>    
            </View>    
        </View>
      )}
        </View>
    );
}

const styles = StyleSheet.create({
    Advertising: {
        flex: 1,
        //backgroundColor: "red",
        height: "100%",
    },
    AdvertisingImage: {
        width: CATEGORY_SCREEN_WIDTH,
        height: "100%",
    },
    map: {
        width: '100%',
        height: '100%',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject, // 전체 화면을 덮는 스타일
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // 반투명 배경
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        top: 20,
        left: 10,
        borderRadius: 30,
        marginRight: 2,
        padding: 8,
        backgroundColor: "white"
    },
    courtImage: {
        flex: 1, 
        width: "100%", 
        height: 120,
        borderRadius: 10,
        marginRight: 10
    },
    dateText: {
        fontSize: 18,
        color: "white"
    },
    textAttention: {
        backgroundColor: "#FFD73C", 
        padding: 1, 
        borderRadius: 5, 
        paddingLeft: 10, 
        paddingRight: 10
    }
});