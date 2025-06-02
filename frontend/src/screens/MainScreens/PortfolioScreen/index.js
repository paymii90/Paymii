import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PortfolioScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PortfolioScreen</Text>
    </View>
  )
}

export default PortfolioScreen

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
  },
});