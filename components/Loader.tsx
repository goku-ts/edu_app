import React, { FC } from 'react';
import Lottie from 'lottie-react-native';


type AnimationType={
    autoplay : boolean
    loop : boolean
}
const Animation : FC<AnimationType>=({autoplay=false,loop=false})=>{
  return (
    <Lottie source={require('../assets/loading2.json')} autoPlay={autoplay} loop={loop}  />
  );
}

export default Animation