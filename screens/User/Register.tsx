import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { SignupProps } from "../../navigation/Navigator";
import {
  FormInput,
  PasswordInput,
} from "../../components/textInputs/TextInputs";

const SignupScreen: React.FC<SignupProps> = ({ navigation }) => {
  const [submit, isSubmit] = useState(false);
  const [message, setMessage] = useState()

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignup = (values: typeof initialValues) => {
    const baseIP = "https://977b-102-176-65-188.ngrok-free.app/user/signup";
    // Perform signup logic here
    axios
      .post(baseIP, {
        name: values.name,
        email: values.email,
        password: values.password
      })
      .then((response) => {
        setMessage(response?.data?.message)
        if (response?.data?.status === "SUCCESS") {
          navigation.navigate("Signin")
        }
      })
      .catch((e) => console.log(e));

  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={{ alignItems: "center" }}>
            {message && <Text style={[styles.errorText, { fontSize: 12 }]}>{message}</Text>}
            <FormInput
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              icon={"person-outline"}
            />

            {submit && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <FormInput
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              keyboardType="email-address"
              icon={"mail-outline"}
            />
            {submit && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <PasswordInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              secureTextEntry
              icon={"key-outline"}
            />
            {submit && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <PasswordInput
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              secureTextEntry
              icon={"key-outline"}
            />
            {submit && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity
              onPress={() => {
                isSubmit(true);
                handleSubmit();
              }}
              style={styles.button}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={() => navigation.navigate("Signin", {})}>
        <Text style={styles.signInLink}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorText: {
    fontSize: 10,
    color: "red",
    marginBottom: 5,
  },
  signInLink: {
    marginTop: 16,
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    height: 35,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default SignupScreen;
