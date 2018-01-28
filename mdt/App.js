import React from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import store from './src/redux/store';

import LoginScreen from './src/Pages/Login';
import AccountsScreen from './src/Pages/Accounts';

const RootNavigator = StackNavigator(
    {
        Home: {screen: LoginScreen},
        Accounts: {screen: AccountsScreen}
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
