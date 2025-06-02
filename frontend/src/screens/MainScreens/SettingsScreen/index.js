import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Button, View } from "react-native";


const SettingsScreen = ({navigation}) => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}> 
     <Button title="Logout" onPress={logout} />
    </View>
  );
}

export default SettingsScreen;





