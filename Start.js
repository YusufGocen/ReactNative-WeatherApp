import { Button, StyleSheet, Text, View ,Pressable,Image} from 'react-native'
import React from 'react'

const Start = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={{flex:2 , marginTop:200}}>
            <Image style={styles.Image} source={require('./Picture/partly_cloudy.png')} />
        </View>

        <View>
            <Text style={styles.title}>Weather App</Text>
        </View>

        <Pressable style={{flex:5}}  onPress={()=>navigation.navigate("HomePage")} >
             <Text style={styles.Button}>Get Starter</Text>
        </Pressable>
    </View>
  )
}

export default Start

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#0E192B'
      },
      Button:{
        color:'#312F5E',
        backgroundColor:'#DDB12F',
        borderRadius:30,
        padding:15,
        width:175,
        marginVertical:10,
        justifyContent:'center',
        alignItems:'center',
        fontSize:30,
        fontWeight:400
      },
      Image:{
        width:220,
        height:150
      },
      title:{
        color:'white',
        fontSize:50,
        marginVertical:20

      }
})