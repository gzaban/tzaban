import React from "react";
import { ScrollView , View , StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';


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

    renderField = ({ input, meta, ...inputProps }) =>{
        return (
            <View>
                <FormLabel>{inputProps.label}</FormLabel>
                <FormInput {...input} />
                <FormValidationMessage>Error message</FormValidationMessage>
            </View>
        );
    };

    render() {
        const { navigate } = this.props.navigation;
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
                        raised
                        rightIcon={{name: 'key', type: 'octicon'}}
                        title='LOGIN' />
                </ScrollView>;
    }
}

export default reduxForm({
    form: 'login'
})(LoginScreen);
