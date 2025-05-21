import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import BucketList from '../../Components/BucketList'
import Button from '../../Components/Button'

const Progress1 =()=>{
    return <View style={styles.container}>
<Image style={styles.image} source={require('../../../assets/SecureAccount.png')} />
<Text style={styles.text}>Let's secure your account</Text>
<View style={styles.list}>
    <BucketList backgroundColor='#052644' color='white' number='1' process='Create your account' status='Completed' />
    <BucketList backgroundColor='#052644' color='white' number='2' process='Secure your account' status='1 min' />
    <BucketList backgroundColor='#F3F3F3' color='#111111' number='3' process='Verify your identity' status='5 min' />
</View>
<View style={styles.button}>
<Button  label='Submit' backgroundColor='#052644' color='white' /></View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '5%'
    },
    image: {
        marginTop: '30%',
        alignSelf: 'center'
       
    },
    text: {
        fontWeight: 'bold',
        fontSize: 22,
        marginVertical: '5%'
    },
    list: {
        height: 158,
        marginVertical: '10%'
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: '5%'
    }
})

export default Progress1