import {TouchableOpacity,StyleSheet} from "react-native"
import { Colors, fontSize } from "../../assets/assets"
import { FC } from "react"
import { Ionicons } from "@expo/vector-icons"

type addButtonType = {
    name : any
    color? : string
    onPress? : any
}

export const AddButton : FC<addButtonType> = ({color = Colors.white, name, onPress }) =>{
    return(
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
           <Ionicons name ={name} size={30} color={color}/>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
  button:{
    height : 60,
    width : 60,
    backgroundColor : Colors.gray,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:30
  }
})