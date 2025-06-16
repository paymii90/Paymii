import TextRecognition from "react-native-text-recognition";
import { Camera } from "expo-camera";
import { View, StyleSheet, Text } from "react-native";
import { useRef, useState } from "react";

const Scanner = () => {
  const [permission, setPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setCapturedPhoto(photo);
      console.log("Photo URI:", photo.uri);
    }
  };

  if (hasPermission === null)
    return (
      <View>
        <Text>Requesting permission...</Text>
      </View>
    );
  if (hasPermission === false)
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <View style={styles.buttonContainer}>
        <Button title="Capture Photo" onPress={takePicture} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
});

export default Scanner;
