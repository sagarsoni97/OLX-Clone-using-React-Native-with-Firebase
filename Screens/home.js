import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Button,
    FlatList,
    Linking,
    Platform
} from 'react-native';
import { Card } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from 'react-native-reanimated';

const Home = () => {

    const [items, setItems] = useState([])
    const [loading,setLoading] = useState(false) 
    
    const getDetails = async() =>{
       const querySnap = await firestore().collection('ads').get()
      const result = querySnap.docs.map(docSnap=>docSnap.data())
      console.log(result)
      setItems(result)
    }

    useEffect(()=>{
        getDetails()
        return()=>{
           console.log('cleanUp')
        }
    },[])

    const openDial = (phone)=>{
        if(Platform.OS ==='android'){
          Linking.openURL(`tel:${phone}`)
        }else{
          Linking.openURL(`telprompt:${phone}`)
        }
    }


    const Refresh = () =>{
            getDetails()
    }

    const renderItem = (item) => {
        return (
            <View >
                
                <Card containerStyle={{  marginBottom:'4%', backgroundColor: '#F4F6F7', borderRadius:25 }}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                    <Text style={styles.content}>Title: {item.title}</Text>
                    <Text style={styles.content}>Description: {item.description}</Text>
                    <Text style={styles.content}>Price: {item.price}</Text>
                    <Text style={styles.content}>Year: {item.year}</Text>
                    <TouchableOpacity onPress={()=>openDial(item.phone)}>
                        <Text style={{ marginLeft: '65%', color: 'red' }}>Contact Seller</Text>
                    </TouchableOpacity>
                </Card>
               
            </View>
        )
    }

    return (


        <View style={styles.container}>

            {/* <View style={styles.headerView}>
                <Text style={{marginTop:'2%'}}>This App is created by Sagar Soni</Text>
            <TouchableOpacity style={{marginTop:'2%'}} onPress={()=>Refresh()}> 
            <FontAwesome5 name="sync-alt" size={20} />
            </TouchableOpacity>
            </View> */}

            <FlatList
                data={items.reverse()}
                keyExtractor={(item) => item.phone}
                renderItem={({ item }) => renderItem(item)}
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
       
        
    },

    headerView:{
        flexDirection:'row', 
        justifyContent:'space-around',
         height:'5%', 
         backgroundColor:'#F4F6F7',
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

export default Home;
