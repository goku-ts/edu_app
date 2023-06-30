import React, { FC } from 'react';
import { View, Modal, StyleSheet } from 'react-native';

import Animation from './Loader';
import { StatusBar } from 'expo-status-bar';

type LSType ={
    visible : boolean
}
const LoadingScreen : FC<LSType> =({visible=false})=>{
  return (
    <>
    <StatusBar backgroundColor={ visible? "rgba(0, 0, 0, 0.5)" : undefined}/>
     <Modal transparent visible={visible}>
        <View style={styles.container}>
          <Animation loop={true} autoplay={true}/>
        </View>
     </Modal>
     </>
  );
}

export default LoadingScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(0, 0, 0, 0.5)"
    }
})