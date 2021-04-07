import React, {useRef} from "react";
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Formik} from "formik";
import * as yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {styles} from "./styles";
import {onRegisterAction} from "../../../store/actions/authActions";
import Colors from "../../../constants/Colors";
import {ApplicationState} from "../../../store";

const validationSchema = yup.object().shape({
    email: yup.string().required('Please enter your email')
        .min(4, 'Email should have at least 4 characters')
        .email('Please enter a valid email'),
    first_name: yup.string().required('Please enter your First Name'),
    last_name: yup.string().required('Please enter your Last Name'),
    password: yup.string().required('Please enter your password')
        .min(6, 'Password should have at least 6 characters'),
    confirm_password: yup.string().required('Please repeat your password')
        .min(6, 'Password should have at least 6 characters')
        .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
})

const RegisterScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const formikRef = useRef<any>(null)
    const {isRegistering, registerErrors} = useSelector((state: ApplicationState) => state.authReducer)

    const initValues = {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: ''
    }

    const onSubmit = async (values: any) => {
        console.log(values)
        await dispatch(onRegisterAction(values, navigation))
    }
    return (
        <View style={styles.container}>
            <Formik
                innerRef={formikRef}
                initialValues={initValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit
                  }) => (
                    <View style={styles.containerFormik}>
                        <View style={styles.textContainer}>
                            <TextInput
                                placeholder={'Email'}
                                placeholderTextColor={Colors.grey3}
                                value={values.email}
                                style={styles.textInput}
                                returnKeyType={'next'}
                                autoCompleteType={'email'}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                autoCapitalize={'none'}
                            />
                        </View>
                        <View style={styles.center}>
                            {touched.email && errors.email ?
                                <Text style={styles.textError}>{errors.email}</Text> : null}
                        </View>

                        <View style={styles.center}>
                            {registerErrors.length && registerErrors.find((error) => error.param === 'email') ?
                                <Text
                                    style={styles.textError}>{registerErrors.find((error) => error.param === 'email')?.msg || ''}</Text> : null}
                        </View>

                        <View style={styles.textContainer}>
                            <TextInput
                                placeholder={'First Name'}
                                placeholderTextColor={Colors.grey3}
                                value={values.first_name}
                                style={styles.textInput}
                                returnKeyType={'next'}
                                onChangeText={handleChange('first_name')}
                                onBlur={handleBlur('first_name')}
                                autoCapitalize={'words'}
                            />
                        </View>
                        <View style={styles.center}>
                            {touched.first_name && errors.first_name ?
                                <Text style={styles.textError}>{errors.first_name}</Text> : null}
                        </View>

                        <View style={styles.center}>
                            {registerErrors.length && registerErrors.find((error) => error.param === 'first_name') ?
                                <Text
                                    style={styles.textError}>{registerErrors.find((error) => error.param === 'first_name')?.msg || ''}</Text> : null}
                        </View>

                        <View style={styles.textContainer}>
                            <TextInput
                                placeholder={'Last Name'}
                                placeholderTextColor={Colors.grey3}
                                value={values.last_name}
                                style={styles.textInput}
                                returnKeyType={'next'}
                                onChangeText={handleChange('last_name')}
                                onBlur={handleBlur('last_name')}
                                autoCapitalize={'words'}
                            />
                        </View>
                        <View style={styles.center}>
                            {touched.last_name && errors.last_name ?
                                <Text style={styles.textError}>{errors.last_name}</Text> : null}
                        </View>

                        <View style={styles.center}>
                            {registerErrors.length && registerErrors.find((error) => error.param === 'last_name') ?
                                <Text
                                    style={styles.textError}>{registerErrors.find((error) => error.param === 'last_name')?.msg || ''}</Text> : null}
                        </View>

                        <View style={styles.textContainer}>
                            <TextInput
                                placeholder={'Password'}
                                value={values.password}
                                placeholderTextColor={Colors.grey3}
                                style={styles.textInput}
                                returnKeyType={'next'}
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

                        <View style={styles.center}>
                            {registerErrors.length && registerErrors.find((error) => error.param === 'password') ?
                                <Text
                                    style={styles.textError}>{registerErrors.find((error) => error.param === 'password')?.msg || ''}</Text> : null}
                        </View>

                        <View style={styles.textContainer}>
                            <TextInput
                                placeholder={'Repeat Password'}
                                value={values.confirm_password}
                                placeholderTextColor={Colors.grey3}
                                style={styles.textInput}
                                returnKeyType={'next'}
                                onChangeText={handleChange('confirm_password')}
                                onBlur={handleBlur('confirm_password')}
                                autoCapitalize={'none'}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.center}>
                            {touched.confirm_password && errors.confirm_password ?
                                <Text style={styles.textError}>{errors.confirm_password}</Text> : null}
                        </View>

                        <TouchableOpacity style={styles.buttonContainer} disabled={isRegistering}
                                          onPress={() => handleSubmit()}>
                            {isRegistering ?
                                <View style={styles.center}>
                                    <ActivityIndicator color={Colors.marinBlue} size={'large'}/>
                                </View> :
                                <Text style={styles.textWhite}>Register</Text>
                            }
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default RegisterScreen
