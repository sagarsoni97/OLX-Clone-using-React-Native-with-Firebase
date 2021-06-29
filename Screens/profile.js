
import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    FlatList
} from 'react-native';
import { Card } from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import Add from './createadscreen'

const Profile = ({navigation}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [year, setYear] = useState('')
    const [phone, setPhone] = useState('')
    const [image,setImage] = useState("")
    const [uid,setUid] = useState("")

    const [items,setItems] = useState([])
    const [loading,setLoading] = useState(false) 

    const getDetails = async ()=>{
      const querySnap = await firestore().collection('ads')
      .where('uid','==',auth().currentUser.uid)
      .get()
      const result = querySnap.docs.map(docSnap=>docSnap.data())
    //   console.log("appointment vala data >>>>>>>>>",result)
      setItems(result)
    }

    
    useEffect(()=>{
        getDetails()
        return ()=>{
          console.log("cleanup")
        }
      },[])

      const renderItem = (item) => {
        return (
            <View style={styles.container}>
                <Card containerStyle={{ marginTop: '5%', backgroundColor: '#F4F6F7', borderRadius:25 }}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                    <Text style={styles.content}>Title: {item.title}</Text>
                    <Text style={styles.content}>Description: {item.description}</Text>
                    <Text style={styles.content}>Price: {item.price}</Text>
                    <Text style={styles.content}>Year: {item.year}</Text>
                    
                </Card>
            </View>
        )
    }

    return (
        
        <View style={styles.container}>
        
        <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:'5%'}}>
       <Text style={{fontSize:17}}>Email: {auth().currentUser.email}</Text>
       <TouchableOpacity onPress={()=>auth().signOut()}>
       <Text style={{fontSize:17, color:'red'}}>Logout</Text>
       
       </TouchableOpacity>
       </View>
       <Text style={{fontSize:17, color:'red', marginLeft:'12%', marginTop:'2%'}}>Created by Sagar Soni</Text>

       <Text style={{fontSize:20, marginTop:'5%', textAlign:'center'}}>Your Ads</Text>
       <FlatList 
            data={items}
            keyExtractor={(item)=>item.phone}
            renderItem={({item})=>renderItem(item)}
            onRefresh={()=>{
                setLoading(true)
                getDetails()
                setLoading(false)
            }}
            refreshing={loading}
            />
        </View>
       
    );
};

const styles = StyleSheet.create({
    container: {
       flex:1,
        width:'100%',
        
        
    },

      image: {
        width: '100%',
        height: 200,
        marginTop: '-4%',
        borderRadius:25
    },

    content: {
        fontSize: 18,
        fontFamily: 'Josefin Sans',
        margin:2
    }
   
})

export default Profile;
