import React, {useRef} from "react";
import {View, Text, ActivityIndicator, TextInput, TouchableOpacity} from "react-native";
import {useDispatch,useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {Formik} from "formik";
import * as yup from 'yup';
import {styles} from "./styles";
import {FontAwesome5} from '@expo/vector-icons';
import Colors from "../../../constants/Colors";
import {authLoginAction} from "../../../store/actions/authActions";
import {ApplicationState} from "../../../store";


const validationSchema = yup.object().shape({
    email: yup.string().required('Please enter your email')
        .min(4, 'Email should have at least 4 characters')
        .email('Please enter a valid email'),
    password: yup.string().required('Please enter your password')
        .min(6, 'Password should have at least 6 characters')
})

const LoginScreen = () => {
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state:ApplicationState)=>state.authReducer)
    const navigation = useNavigation()
    const formikRef = useRef<any>(null)

    const submit = async (values: any) => {
        dispatch(authLoginAction(values))
    }

    const initFormValue = {
        email: '',
        password: '',
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
                      isSubmitting,
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

                        <TouchableOpacity style={styles.buttonContainer} disabled={isSubmitting || isLoading}
                                          onPress={() => handleSubmit()}>
                            {isSubmitting || isLoading ?
                                <View style={styles.center}>
                                    <ActivityIndicator color={Colors.marinBlue} size={'large'}/>
                                </View> :
                                <Text style={styles.textWhite}>Login</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.facebookContainer} disabled={isSubmitting || isLoading}>
                            {isSubmitting || isLoading ?
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

                        <TouchableOpacity style={styles.googleContainer} disabled={isSubmitting || isLoading}>
                            {isSubmitting  || isLoading?
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
