
import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Home from './home'


const Createaddscreen = ({navigation}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [year, setYear] = useState('')
    const [phone, setPhone] = useState('')
    const [image,setImage] = useState("")
    const [progress,setProgress] = useState(false)

    const OpenCamera = () =>{

        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            compressImageQuality:1,
            cropping: true
            
          }).then(fileobj => {

            // console.log(fileobj)
            setProgress(true)
            const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.path) 
            uploadTask.on('state_changed', 
            (snapshot) => {
                
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
            }, 
            (error) => {
               alert(error)
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                
                uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    setImage(downloadURL)
                    setProgress(false)
                });
               
            }
            );
           })
       }

     const PostData = async() =>{
        if(!title || !description || !price || !year || !phone || !phone>5){
            alert('Please fill all field')
            return
        }
     try {
        await firestore().collection('ads').add({
            title,
            description,
            price,
            year,
            phone,
            image,
            uid:auth().currentUser.uid
        })
        Keyboard.dismiss();
        setTitle('');
        setDescription('');
        setPrice('');
        setYear('');
        setPhone('');
        alert('Congratulations !! Your ad is Posted Refresh for view your ad')
        navigation.navigate('Home')
     } catch (error) {
         alert(error)
     } 
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.container}>

                <Text style={{marginTop:'2%', fontSize:20}}>Post Your Ad Here</Text>
                    
                    <TextInput placeholder='Enter Title'
                        style={styles.textInput}
                        onChangeText={(title) => setTitle(title)}
                        keyboardType="default"
                        value={title}
                    ></TextInput>

                    <TextInput placeholder='Enter Description'
                        style={styles.textInput}
                        onChangeText={(description) => setDescription(description)}
                        value={description}
                        keyboardType="default"
                    ></TextInput>

                    <TextInput placeholder='Enter Price'
                        style={styles.textInput}
                        onChangeText={(price) => setPrice(price)}
                        value={price}
                        keyboardType='number-pad'
                    ></TextInput>

                    <TextInput placeholder='Enter Year'
                        style={styles.textInput}
                        onChangeText={(year) => setYear(year)}
                        value={year}
                        keyboardType='number-pad'
                        ke
                    ></TextInput>

                    <TextInput placeholder='Enter Mobile Number'
                        style={styles.textInput}
                        onChangeText={(phone) => setPhone(phone)}
                        keyboardType='number-pad'
                        maxLength={10}
                        value={phone}
                    ></TextInput>

                    <TouchableOpacity onPress={() => OpenCamera()} style={styles.btn}>
                        <View style={{flexDirection:'row', alignSelf:'center'}}>
                        {
                    progress ? (
                        <ActivityIndicator 
                            size={28}
                            color={"black"}
                        />
                    ):(
                        <Text style={styles.btnText}>Upload</Text>
                    )
                }
                        <FontAwesome5 style={{alignSelf:'center', padding:'2%'}} name={'camera'} size={25} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={image?false:true} mode="contained" onPress={() => PostData()} style={styles.btn}>
                    <View style={{flexDirection:'row', alignSelf:'center'}}>
                        <Text style={styles.btnText}>Post Your Add</Text>
                        <FontAwesome5 style={{alignSelf:'center', padding:'2%'}} name={'thumbs-up'} size={25} />
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center'
    },

    textInput: {
        borderBottomWidth: 2,
        height: 50,
        width: '80%',
        marginTop: '8%',
        borderColor: '#0AE1F6',

    },

    btn: {
        marginTop: '5%',
        backgroundColor: '#0AE1F6',
        height: 50,
        width: '90%',
        borderRadius: 30,
        marginLeft: '5%'
    },

    btnText: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10
    }

})

export default Createaddscreen;
