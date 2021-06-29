
import React, { useState, useContext } from 'react';
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
import { AuthContext } from '../Navigation/AuthProvider';
import { Card } from 'react-native-elements'
import Login from './login'
import auth from '@react-native-firebase/auth';

const Registration = ({ navigation }) => {

    const { register } = useContext(AuthContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCalculating, setCalculating] = useState(false);

    const SignUP = async () => {
        if (!email || !password) {
            alert('Please fill all field')
            return
        }
        try {
            setCalculating(true);
           await register(email, password)
        } catch (error) {
            alert(error)
        }
    }



    return (
        <ImageBackground style={{ height: '100%', resizeMode: "cover", }} source={require('../Images/background.jpg')}>
            <ScrollView style={{ height: '100%', width: '100%' }}>
                <View style={styles.container}>

                    <Card containerStyle={{ width: '95%', marginTop: '28%', borderRadius: 45, backgroundColor: '#F2F3F4' }}>
                        <Text style={styles.mainContent}>Please Register Yourself</Text>
                        <Text style={styles.mainContentSecond}>for Continue..</Text>



                        <TextInput placeholder='Email'
                            style={styles.textInput}
                            onChangeText={(email) => setEmail(email)}
                            value={email}
                            keyboardType='email-address'
                            autoCapitalize='none'
                        ></TextInput>

                        <TextInput placeholder='Password'
                            style={styles.textInput}
                            onChangeText={(password) => setPassword(password)}
                            value={password}
                            secureTextEntry={true}
                        ></TextInput>

                        <TouchableOpacity onPress={() => SignUP()} style={styles.btn}>
                        {
                    isCalculating ? (
                        <ActivityIndicator 
                            size={28}
                            color={"black"}
                        />
                    ):(
                        <Text style={styles.btnText}>SignUP</Text>
                    )
                }
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                            <Text style={{ marginTop: '5%', textAlign: 'center', fontWeight: 'bold' }}>Already have an account Login here !!</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {

        width: '100%',
        alignItems: 'center',

    },

    mainContent: {
        fontSize: 21,
        marginTop: '8%',
        fontFamily: 'Rubik',
        fontWeight: 'bold',
        marginLeft: '5%'
    },

    mainContentSecond: {
        fontSize: 21,
        fontFamily: 'Rubik',
        fontWeight: 'bold',
        marginTop: 2,
        marginLeft: '5%'
    },

    textInput: {
        borderBottomWidth: 2,
        height: 50,
        width: '90%',
        marginTop: '8%',
        borderColor: '#0AE1F6',
        marginLeft: '5%'
    },

    btn: {
        marginTop: '10%',
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

export default Registration;
