import {TouchableOpacity,StyleSheet} from "react-native"
import { Colors, fontSize } from "../../assets/assets"
import { FC } from "react"
import { Ionicons } from "@expo/vector-icons"

type buttonType = {
    name : any
    color? : string
    onPress? : any
}

export const IconButton : FC<buttonType> = ({color = Colors.white, name, onPress }) =>{
    return(
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
           <Ionicons name ={name} size={25} color={color}/>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
  button:{
    height : 40,
    width : 40,
    backgroundColor : Colors.gray,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:15
  }
})