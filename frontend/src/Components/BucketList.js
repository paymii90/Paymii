import {Text, StyleSheet, View} from 'react-native'

const BucketList =({number, process, status, backgroundColor, color})=>{
    return <View style={styles.container}>
        <Text style={[styles.number, {backgroundColor}, {color}]}>{number}</Text>
        <Text style={styles.process}>{process}</Text>
        <Text style={styles.status}>{status}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    number: {
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 7,
        paddingVertical: 2,
        height: 24,
        width: 24,
        //alignment
        justifyContent: 'center',
        alignItems: 'center',
        //font styling
        fontSize: 16,
        fontWeight: 'bold' 
    },
    process: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    status: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default BucketList