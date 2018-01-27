import React from "react";
import { Text, View , Button} from 'react-native';

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const { navigate } = this.props.navigation;
        return <View>
                    <Text>Hello, Chat App!</Text>
                    <Button
                        onPress={() => navigate('Guy')}
                        title="Chat with Lucy"
                    />
                </View>;
    }
}

export default LoginScreen;