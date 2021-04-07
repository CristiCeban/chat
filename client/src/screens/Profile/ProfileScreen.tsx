import React, {useRef} from "react";
import {ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {useNavigation} from '@react-navigation/native';
import {Formik} from "formik";
import * as yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import {ApplicationState} from "../../store";
import {styles} from "./styles";
import Avatar from "../../components/general/Avatar/Avatar";
import Colors from "../../constants/Colors";
import {onEditProfile} from "../../store/actions/authActions";

const validationSchema = yup.object().shape({
    first_name: yup.string()
        .required('Please enter your First Name'),
    last_name: yup.string()
        .required('Please enter your Last Name')
})

const ProfileScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {user, isLoading} = useSelector((state: ApplicationState) => state.authReducer)
    const {first_name, last_name} = user
    const formikRef = useRef<any>()

    const initValues = {
        thumbnail: undefined,
        first_name,
        last_name
    }

    const openImagePickerAsync = async (setImage: any) => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                allowsEditing: true,
                aspect: [4, 3],
            }
        );

        if (!pickerResult.cancelled) {
            setImage('thumbnail', pickerResult);
        }
    }

    const onSubmit = async (values: any) => {
        await dispatch(onEditProfile(values))
        navigation.goBack()
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    return (
        <View style={styles.container}>
            <Formik
                innerRef={formikRef}
                initialValues={initValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({
                      values,
                      setFieldValue,
                      handleSubmit,
                      handleBlur,
                      handleChange,
                      touched,
                      errors
                  }) => (
                    <KeyboardAvoidingView style={styles.formikContainer} behavior='position'
                                          keyboardVerticalOffset={keyboardVerticalOffset}>
                        <View style={styles.thumbnailContainer}>
                            <TouchableOpacity onPress={() => openImagePickerAsync(setFieldValue)}>
                                {!values.thumbnail ?
                                    <ProfileAvatar user={user} width={150} height={150} fontSize={75}/>
                                    :
                                    <Avatar width={150} height={150} fontSize={75} profile={{
                                        name: '',
                                        image: (values.thumbnail as any)['uri']
                                    }}/>
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>{first_name + ' ' + last_name}</Text>
                        </View>

                        <View style={styles.dataContainer}>
                            <Text style={styles.textProfileData}>Profile Data</Text>

                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder={'First Name'}
                                    value={values.first_name}
                                    onBlur={handleBlur('first_name')}
                                    onChangeText={handleChange('first_name')}
                                    style={styles.textInput}
                                />
                            </View>

                            <View style={styles.center}>
                                {touched.first_name && errors.first_name ?
                                    <Text style={styles.textError}>{errors.first_name}</Text> : null}
                            </View>

                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder={'Last Name'}
                                    value={values.last_name}
                                    onBlur={handleBlur('last_name')}
                                    onChangeText={handleChange('last_name')}
                                    style={styles.textInput}
                                />
                            </View>

                            <View style={styles.center}>
                                {touched.last_name && errors.last_name ?
                                    <Text style={styles.textError}>{errors.last_name}</Text> : null}
                            </View>
                        </View>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleSubmit()}
                                          disabled={isLoading}>
                            {isLoading ?
                                <ActivityIndicator size={"large"} color={Colors.white1}/>
                                :
                                <Text style={styles.textSave}>Save</Text>
                            }
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                )}

            </Formik>
        </View>
    )
}

export default ProfileScreen
