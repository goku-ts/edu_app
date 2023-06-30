import { View, TextInput, StyleSheet, KeyboardTypeOptions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FC, useState } from "react";
import { scale, ScaledSheet } from "react-native-size-matters";

import { Screen } from "../../assets/assets";
type FormInputType = {
  placeholder: string
  value: any
  onChangeText: any
  onBlur?: any
  keyboardType?: KeyboardTypeOptions
  icon?: any
  secureTextEntry?: boolean
}

export const FormInput: FC<FormInputType> = ({ placeholder, value, onChangeText, onBlur, keyboardType, icon }) => {
  return (
    <View style={styles.input}>
      <View style={styles.icon}>
        <Ionicons name={icon} size={scale(15)} />
      </View>
      <TextInput
        style={[styles.textInput ,{ width: Screen.width * 0.57 }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={keyboardType}
      />
    </View>
  )
}

export const PasswordInput: FC<FormInputType> = ({ placeholder, value, onChangeText, onBlur, icon }) => {

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };



  return (
    <View style={styles.passwordContainer}>
      <View style={styles.icon}>
        <Ionicons name={icon} size={scale(15)} />
      </View>
      <View style={styles.passwordandtoggle}>
        <View>
          <TextInput
            style={[styles.textInput,{ width: Screen.width * 0.5,}]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            secureTextEntry={!isPasswordVisible}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <View style={styles.icon}>
                <Ionicons name="eye-outline" size={scale(15)} />
              </View>
            ) : (
              <View style={styles.icon}>
                <Ionicons name="eye-off-outline" size={scale(15)} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  input: {
    width: Screen.width * 0.7,
    height: "40@ms",
    borderColor: "black",
    borderWidth: 0,
    borderRadius: "15@ms",
    marginBottom: "8@ms",
    paddingHorizontal: "8@ms",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#dfe4ea',
  },
  icon: {
    marginRight: "10@ms",
  },
  passwordContainer: {
    width: Screen.width * 0.7,
    height: "40@ms",
    borderColor: "black",
    borderWidth: 0,
    borderRadius: "15@ms",
    marginBottom: "8@ms",
    paddingHorizontal: "8@ms",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#dfe4ea',
  },
  passwordandtoggle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput:{ 
    fontSize:"13@ms",
    height: "40@ms",
   }
});