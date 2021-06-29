
import React, {useState, useContext} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import { Card } from 'react-native-elements'
import { AuthContext } from '../Navigation/AuthProvider';

const Login = ({navigation}) => {

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCalculating, setCalculating] = useState(false);

    const LoginHandle = async() =>{
        if(!email || !password){
            alert('Please fill all field')
            return
        }
        try {
            setCalculating(true);
           await login(email, password)
        } catch (err) {
            alert(somethig)
        }
    }

    return (
        <ImageBackground style={{height:'100%', resizeMode: "cover",}} source={require('../Images/loginbackground.jpg')}>
        <ScrollView style={{height:'100%', width:'100%'}}>
        <View style={styles.container}>
        
        <Card containerStyle={{width:'95%', marginTop:'25%', borderRadius:50, backgroundColor:'#F4F6F7'}}> 
            <Text style={styles.mainContent}>Please Login Yourself</Text>
            <Text style={styles.mainContentSecond}>for Continue Again..</Text>
            
            

<TextInput placeholder='Email'
                style={styles.textInput}
                onChangeText={(email) => setEmail(email)}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
            ></TextInput>

<TextInput placeholder='Password'
                style={styles.textInput}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
                value={password}
            ></TextInput>

        
            <TouchableOpacity onPress={() => LoginHandle()} style={styles.btn}>
            {
                    isCalculating ? (
                        <ActivityIndicator 
                            size={28}
                            color={"black"}
                        />
                    ):(
                        <Text style={styles.btnText}>Login</Text>
                    )
                }
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.goBack()} >
            <Text style={{marginTop:'5%', textAlign:'center', fontWeight:'bold'}}>Don't have an account SignUp here !!</Text>
            </TouchableOpacity>

            
            </Card>
        </View>
        </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
       
        width:'100%',
        alignItems: 'center',
        
    },

    mainContent: {
        fontSize: 25,
        marginTop: '10%',
        fontFamily: 'Rubik',
        fontWeight: 'bold',
        marginLeft:'5%'
    },

    mainContentSecond:{
        fontSize: 21,
        fontFamily: 'Rubik',
        fontWeight: 'bold',
        marginTop:5,
        marginLeft:'5%'
    },
   
    textInput: {
        borderBottomWidth: 2,
        height: 50,
        width:'90%',
        marginTop: '8%',
        borderColor:'#0AE1F6',
        marginLeft:'5%'
    },

    btn:{
        marginTop:'10%',
        backgroundColor:'#0AE1F6',
        height:50,
        width:'90%',
        borderRadius:30,
        marginLeft:'5%'
    },

    btnText:{
        textAlign:'center',
        fontSize:20,
        padding:10
    }
   
})

export default Login;
