import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import LanguageSelector from '../Components/LanguageSelector';


export default function Header(): JSX.Element {

    return(
        <>
        <View style={{ marginBottom: -15, top: -7, left: 10, }}>
                     <Image
                      source={{ uri: 'https://www.magichotelsandresorts.com/assets/images/png/logo.png',}}
                      style={{ width: 100, height: 60, resizeMode: 'contain' }}
                      />
        </View>
        <LanguageSelector />
        </>
    );
}
