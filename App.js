
import { StyleSheet, Dimensions, View, ScrollView, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from "react-native-status-bar-height";


import { Header } from './components/header';
import { HeaderTab } from './components/tab';
import { Category } from './components/category';
//import { MainImage } from './components/mainImage';
import { MainImage } from './components/mainImage';
import { OrderCombo } from './components/orderCombo';
import { BodyMain } from './components/bodyMain';
import { Footer } from './components/footer';
import { NoticeBanner } from './components/noticeBanner';
import { MainBanner } from './components/mainBanner';

const { width:CATEGORY_SCREEN_WIDTH } = Dimensions.get("window")

export default function App() {
  const arrayJson = [
    {
      member_id: 1,
      member_name: "육계장",
      member_company: "대항병원",
      category_name: "블라블라",
      last_update: "1일전",
      board_key: 1,
      board_title: "새차사고싶다 내차가 젤 못생긴듯",
      board_text: "suv도 간지나는거많아 bmw x5 x7 이런애들봐. 넘 간지나지않냐 물론 카이엔은 넘 못생겼엉 줘도 타"
    },
    {
      member_id: 2,
      member_name: "거꾸로해도신유신",
      member_company: "만렙백수",
      category_name: "썸.연애",
      last_update: "2일전",
      board_key: 2,
      board_title: "KG모빌리티짱",
      board_text: "난 무조건 KG모빌리티만 본다. 현대기아는 타지않아 과독점은 발전에 독이될 뿐이야."
    },
    {
      member_id: 3,
      member_name: "세상아덤벼라",
      member_company: "신한DS",
      category_name: "부동산",
      last_update: "3일전",
      board_key: 3,
      board_title: "집값 무조건 오릅니다",
      board_text: "올라야해 제발 영끌올인박았어 살려줘.."
    },
  ];
  useEffect(() => {
    
  }, []);
  return (
    <KeyboardAwareScrollView 
      //style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true} // 안드로이드에서 키보드 자동 조정 활성화
      extraScrollHeight={20} // 추가로 스크롤할 높이
    >
      {/* <StatusBar style="light" /> */}
      <StatusBar barStyle="light-content" backgroundColor="black" style='light'/>
      <View style={styles.ViewMain}>
        <Header style={styles.BodyBetween}></Header>
          {/* <ScrollView contentContainerStyle={styles.BodyMain}>
            <NoticeBanner></NoticeBanner>
            <MainBanner></MainBanner>
            <OrderCombo></OrderCombo>
            {
              arrayJson.map((string, index) => (
                <BodyMain key={string.board_key} message={string}></BodyMain>
              ))
            }
          </ScrollView> */}
          <Footer style={styles.BodyBetween}></Footer>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: 'whitesmoke',
    paddingTop: getStatusBarHeight(),
  },
  ViewMain: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  BodyBetween: {
    flex: 1,
    //justifyContent: "space-between"
  },
  BodyMain:{
    //flex: 1,
    //backgroundColor: "red",
    width: CATEGORY_SCREEN_WIDTH,
    
  }
});
