import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View ,Image, Pressable} from 'react-native';
import axios from 'axios';
import { useState } from 'react';


export default function HomePage() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
 
  const url='https://api.openweathermap.org/data/2.5/';
  const key='adee529c8776f2f73f6516b724fdc404';

  const getWeather = async()=>{
    if(!city.trim()){
      alert("Şehir giriniz")
      return
    }
    try {
      const response=await axios.get(`${url}weather?q=${city}&appid=${key}&units=metric&lang=tr`)
      setWeather(response.data)
      const {coord}=response.data
      console.log("Koordinatlar:", coord);
      const forecastResponse=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric&lang=tr`)

      if(forecastResponse.data.list){
        const dailyForecast=forecastResponse.data.list.filter((_,index)=> index% 8 ===0);
        setForecast(dailyForecast);
      }else{
        console.log("5 Günlük Veri alınamadı")
      }

    } catch (error) {
      alert("hatalı giriş")
    }
  }

  return (

      <View style={styles.container}>
       <View style={styles.InputContainer}>
        <TextInput
            style={styles.Input}
            placeholder="Şehir Giriniz"
            placeholderTextColor='lightgray'
            value={city}
            onChangeText={setCity}
          
          />
          <Pressable onPress={getWeather} >
             <Text style={styles.Button}>Hava Durumu Getir</Text>
          </Pressable>
       </View>

        {weather && (
          <View style={styles.TextContainer}>
            <Text style={{color:'white', fontSize:45, fontWeight:'500',padding:10}}>{weather.name}</Text>   
            <Image source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} style={{ width: 200, height: 100 ,marginBottom:10}}></Image>
             <Text style={{color:'white', fontSize:30, fontWeight:'400'}}>{weather.main.temp}°C </Text>
          </View>
        )}

        {forecast && weather && (
          <Text style={{color:'white',textAlign:'center',marginVertical:20,fontSize:25,fontWeight:300}}>5 Günlük Hava Tahmini</Text>
        )}
        {forecast && forecast.length>0 && (
          <View style={styles.forecast}>
            {forecast.map((day,index)=>(
              <View key={index} style={styles.ViewForeacast}>
                <Text style={styles.weekdayStyle}>{new Date(day.dt*1000).toLocaleDateString('tr-Tr',{weekday:'short'})}</Text>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` }} style={{ width: 70, height: 50 }}></Image>
                <Text style={styles.weekdayStyle}>{Math.round(day.main.temp)}°C</Text>
              </View>
            ))}
          </View>
        )}

      </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E192B',
  },
  InputContainer:{
    flex:2,
    justifyContent:'start',
    alignItems:'center',
  },
  Input:{
    borderBottomColor:'white',
    borderBottomWidth:1,
    width:250,
    marginVertical:12,
    marginTop:'100',
    color:'white'
  },
  Button:{
    color:'white',
    backgroundColor:'#312F5E',
    borderRadius:20,
    padding:10,
    marginVertical:10
  },
  TextContainer:{
    flex:2,
    color:'white',
    alignItems:'center'
  },
  forecast:{
    flex:2,
    flexDirection:'row'
  },
  ViewForeacast:{
    flexDirection:'column',
    marginVertical:10,
    backgroundColor:'#312F5E',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'space-between',
    width:74,
    height:200,
    borderRadius:80,
    marginRight:3,
    marginLeft:4
    
  },
  weekdayStyle:{
   color:'white',
   marginVertical:30
  }
});
      
