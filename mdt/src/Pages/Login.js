import React from "react";
import {connect} from 'react-redux';
import { ScrollView , View , StyleSheet, Image} from 'react-native';
import {Field, reduxForm, Form} from 'redux-form';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import Config from '../utils/config';
import {getToken} from '../redux/Actions/AuthActions';

const styles = StyleSheet.create({
    page: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    stretch: {
        resizeMode: 'contain',
        width: 200,
        height: 100
    }
});


class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor (props){
        super(props);
        this.state = {
            HiddenPanel: false,
            ApiURL: Config.apiUrl,
            logoClicks: 0,
            grant_type: "password",
            client_id: Config.client_id,
            client_secret: Config.client_secret,
            username: '',
            password: '',
            loading: true
        };
    }

    renderField = ({ input, meta, ...inputProps }) =>{
        return (
            <View>
                <FormLabel>{inputProps.label}</FormLabel>
                <FormInput {...input} />
                <FormValidationMessage>Error message</FormValidationMessage>
            </View>
        );
    };

    onSubmit = (values) => {
        this.setState({loading: true});
        const { navigate } = this.props.navigation;

        let user = {
            grant_type: this.state.grant_type,
            client_id: this.state.client_id,
            client_secret: this.state.client_secret,
            username: values.username,
            password: values.password
        };

        //console.log(user);

        this.props.getToken(user).then(() =>{
            console.log('LOGINS OK');

            // navigate('Accounts');
        });


    };

    render() {
        console.log(this.props);
        return <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps={'handled'}>
                    <Image
                        style={styles.stretch}
                        source={require('../../assets/logo.png')}
                    />

                    <Field
                        label='Email'
                        name="username"
                        component={this.renderField}
                    />
                    <Field
                        label='Password'
                        name="password"
                        component={this.renderField}
                    />
                    <Button
                        onPress={this.props.handleSubmit(this.onSubmit)}
                        raised
                        rightIcon={{name: 'key', type: 'octicon'}}
                        title='LOGIN' />
                </ScrollView>;
    }
}

LoginScreen =  reduxForm({
    form: 'login',
    enableReinitialize: true,
})(LoginScreen);

const mapStateToProps = (state, props) => {
    return {
        initialValues: {
            username: 'guy@panpwr.com',
            password: 'Mylindab12'
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getToken: (user) => {
            console.log('mapDispatchToProps');
            return dispatch(getToken(user));
        }
    };
};

LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default LoginScreen;