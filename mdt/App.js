import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View , Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import store from './src/redux/store';
import LoginScreen from './src/Pages/Login';

class GuyScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome'
    };
    render() {
        return <Text>Hello, Navigation!</Text>;
    }
}

const RootNavigator = StackNavigator(
    {
        Home: {screen: LoginScreen},
        Guy: {screen: GuyScreen}
    },
    {headerMode: 'screen'}
);

export default class App extends React.Component {
    render() {
        return  <Provider store={store}>
            <RootNavigator/>
        </Provider>;
    }
}
