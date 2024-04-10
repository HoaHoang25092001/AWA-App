import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native'

const { width, height } = Dimensions.get("window")
import { LinearGradient } from 'expo-linear-gradient'

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient)

const SkeletonComponent = () => {
    const animatedValue = new Animated.Value(0)

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear.inOut,
                useNativeDriver: true
            })
        ).start();
    })

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width]
    })
    return (
        <View style={{
            backgroundColor: 'white',
            borderColor: '#b0b0b0',
            height: height,
            width: width
        }}>
            <View style={{
                backgroundColor: '#a9a9a9',
                borderColor: '#b0b0b0',
                height: 40,
                width: width,
                flexDirection: 'row',
                justifyContent: 'flex-start'
            }}>
                <AnimatedLG
                    colors={["#a0a0a0", '#b0b0b0', '#b0b0b0', '#a0a0a0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }]
                    }}
                />
            </View>
        </View>
    )
}

export default SkeletonComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
