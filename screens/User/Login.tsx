import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Icon } from 'react-native-elements';
import { ScaledSheet, scale } from "react-native-size-matters";

import { SigninScreenProps } from "../../navigation/Navigator";
import { API } from "../../assets/api_urls";
import { Screen } from "../../assets/assets";
import Animation from "../../components/Loader";
import LoadingScreen from "../../components/LoadingScreen";

import {
  FormInput,
  PasswordInput,
} from "../../components/textInputs/TextInputs";




const SignInScreen: React.FC<SigninScreenProps> = ({ navigation, route }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [message, setMessage] = useState();
  const [submit, isSubmit] = useState(false);
  const [loader, setLoader] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignIn = (values: typeof initialValues) => {
    setLoader(true)
    // Perform sign-in logic here
    axios
      .post(API.signin, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        setMessage(response?.data.message);
        if(response?.data.message) setLoader(false)
        if (response?.data?.status === "SUCCESS") {
          navigation.navigate("Profile", { data: response?.data });
          setLoader(false)
        }
      })
      .catch((e) => console.log(e));
  };



  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.w_container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          {({ handleChange, handleSubmit, handleBlur, values, errors }) => (
            <View style={{ justifyContent: "center" }}>
              <View style={styles.centerizedView}>
                <View style={styles.authBox}>
                  <View style={styles.logoBox}>
                    <Icon
                      color='#fff'
                      name='book'
                      type='font-awesome'
                      size={scale(50)}
                    />
                  </View>
                  {/*    LABELS AND INPUTS */}
                  <View style={styles.fieldsandbutton}>
                    {message && (
                      <Text style={[styles.errorText, { fontSize: 12 }]}>{message}</Text>
                    )}
                    <FormInput
                      placeholder="Email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      keyboardType="email-address"
                      icon={"person-outline"}
                    />
                    {submit && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                    <PasswordInput
                      placeholder="Password"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      icon={"key-outline"}
                    />
                    {submit && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        isSubmit(true);
                        handleSubmit();
                      }}
                      style={styles.loginButton}>
                      <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.registerText}>
                      Don't have an account? Register Now
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                  <LoadingScreen visible={loader} />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EF6C33"
  },
  errorText: {
    fontSize: 10,
    color: "red",
    marginBottom: 5,
  },
  fieldsandbutton: {
    alignItems: "center",
    marginTop: 30
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: "20@ms",
    alignSelf: 'center',
    paddingHorizontal: "14@ms",
    paddingBottom: "30@ms",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: "50@ms"
  },
  logoBox: {
    width: "100@ms",
    height: "100@ms",
    backgroundColor: '#0C4A60',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: "-50@ms",
    marginBottom: "-50@ms",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputBox: {
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#0C4A60',
    marginTop: "5@ms",
    paddingVertical: "5@ms",
    borderRadius: "8@ms",
    width: Screen.width * 0.7
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: "18@ms",
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: "20@ms",
    fontSize: "13@ms",
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: "12@ms",
    fontSize: "13@ms",
  },
  w_container: {
    flex: 1,
    position: 'relative',
    justifyContent: "center",
    backgroundColor: "#0C4A60"
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#EF6C33',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#EF6C33',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },

});

export default SignInScreen;
