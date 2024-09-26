import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';

const {width, height} = Dimensions.get('screen')

interface QuizePhoto {
    id: string;
    src: string;
  }
  
  interface QuizePhotosProps {
    quizePhotos: QuizePhoto[];
  }
const Slider = ({ quizePhotos }: QuizePhotosProps)=> {
   
  return (
  <View>
    <FlatList data={quizePhotos} horizontal pagingEnabled snapToAlignment='center'
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id} renderItem={({item})=> 
        <View style={[styles.container, { height: height / 3.5 }]}>
      <Image source={item.src} className='w-full h-full'/>
    </View>}>

    </FlatList>
  </View>
  )
}

export default Slider;
const styles = StyleSheet.create({
    container:{
        width,
        alignItems:'center',

    }
})