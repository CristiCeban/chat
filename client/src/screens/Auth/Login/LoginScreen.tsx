import React, {useRef} from "react";
import {View, Text, ActivityIndicator, TextInput, TouchableOpacity, Alert} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {Formik} from "formik";
import * as yup from 'yup';
import {FontAwesome5} from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import {styles} from "./styles";
import Colors from "../../../constants/Colors";
import {authLoginAction, onFacebookLogin, onGoogleLogin} from "../../../store/actions/authActions";
import {ApplicationState} from "../../../store";
import * as Google from 'expo-google-app-auth';


const validationSchema = yup.object().shape({
    email: yup.string().required('Please enter your email')
        .min(4, 'Email should have at least 4 characters')
        .email('Please enter a valid email'),
    password: yup.string().required('Please enter your password')
        .min(6, 'Password should have at least 6 characters')
})

const LoginScreen = () => {
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state: ApplicationState) => state.authReducer)
    const navigation = useNavigation()
    const formikRef = useRef<any>(null)

    const submit = async (values: any) => {
        dispatch(authLoginAction(values))
    }

    const initFormValue = {
        email: '',
        password: '',
    }

    const onFacebook = async () => {
        try {
            await Facebook.initializeAsync({appId: '853523668839746', appName: 'chat'})
            const {token, type} = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile', 'email']
                },
            );
            if (type === 'success') {
                console.log(token)
                dispatch(onFacebookLogin(token))
            }
        } catch (e) {
            console.warn(e)
            alert(`Facebook Login Error: ${e.message}`);
        }
    }

    const onGoogle = async () => {
        try {
            const {type, accessToken, user} = await Google.logInAsync({
                androidClientId: '861519663334-rc4ta1tvoi3voep835n0m2sofkcmqjl3.apps.googleusercontent.com',
                iosClientId: '861519663334-ekns07bj4dpad21pd31ob6dadhj2md44.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
            if(type==='success')
                dispatch(onGoogleLogin(accessToken, user))
                // console.log(user)
        } catch (e) {
            console.warn(e)
            alert(`Google Login Error: ${e.message}`);
        }
    }

    return (
        <View style={styles.container}>
            <Formik
                innerRef={formikRef}
                initialValues={initFormValue}
                validationSchema={validationSchema}
                onSubmit={submit}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      touched,
                      errors
                  }) => (
                    <View style={styles.containerFormik}>
                        <View style={styles.textContainer}>
                            <TextInput
                                placeholder={'Email'}
                                placeholderTextColor={Colors.grey3}
                                value={values.email}
                                style={styles.textInput}
                                returnKeyType={'next'}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                autoCapitalize={'none'}
                            />
                        </View>
                        <View style={styles.center}>
                            {touched.email && errors.email ?
                                <Text style={styles.textError}>{errors.email}</Text> : null}
                        </View>

                        <View style={styles.textContainer}>
                            <TextInput
                                placeholder={'Password'}
                                value={values.password}
                                placeholderTextColor={Colors.grey3}
                                style={styles.textInput}
                                returnKeyType={'send'}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                autoCapitalize={'none'}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.center}>
                            {touched.password && errors.password ?
                                <Text style={styles.textError}>{errors.password}</Text> : null}
                        </View>

                        <TouchableOpacity style={styles.buttonContainer} disabled={isLoading}
                                          onPress={() => handleSubmit()}>
                            {isLoading ?
                                <View style={styles.center}>
                                    <ActivityIndicator color={Colors.marinBlue} size={'large'}/>
                                </View> :
                                <Text style={styles.textWhite}>Login</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.facebookContainer} onPress={onFacebook}
                                          disabled={isLoading}>
                            {isLoading ?
                                <View style={styles.center}>
                                    <ActivityIndicator color={Colors.marinBlue} size={'large'}/>
                                </View>
                                :
                                <View style={styles.flexRow}>
                                    <FontAwesome5 name={'facebook'} style={styles.icon} color={'white'} size={24}/>
                                    <Text style={styles.textWhite}>Login with Facebook</Text>
                                </View>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.googleContainer} disabled={isLoading}
                                          onPress={onGoogle}>
                            {isLoading ?
                                <View style={styles.center}>
                                    <ActivityIndicator color={Colors.marinBlue} size={'large'}/>
                                </View>
                                :
                                <View style={styles.flexRow}>
                                    <FontAwesome5 name={'google'} style={styles.icon} color={Colors.blue1} size={24}/>
                                    <Text style={styles.textGoogle}>Login with Google</Text>
                                </View>
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.register}>
                            <Text>Don't have an account yet? Register!</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default LoginScreen
