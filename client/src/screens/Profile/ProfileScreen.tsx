import React, {useRef} from "react";
import {View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
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

        const pickerResult = await ImagePicker.launchImageLibraryAsync();


        if (!pickerResult.cancelled) {
            const file = await ImageManipulator.manipulateAsync(
                pickerResult.uri,
                [{resize: {width: 2000}}],
                {compress: 1, format: ImageManipulator.SaveFormat.JPEG}
            );
            setImage('thumbnail', file);
            // formikRef.current.handleSubmit()
        }
    }

    const onSubmit = (values: any) => {
        // console.log(values)
        dispatch(onEditProfile(values))
    }
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
                      handleSubmit
                  }) => (
                    <View style={styles.formikContainer}>
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
                                    style={styles.textInput}
                                />
                            </View>

                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder={'Last Name'}
                                    value={values.last_name}
                                    style={styles.textInput}
                                />
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
                    </View>
                )}

            </Formik>
        </View>
    )
}

export default ProfileScreen
