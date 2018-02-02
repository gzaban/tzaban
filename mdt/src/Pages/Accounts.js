import React from "react";
import { ScrollView , View , StyleSheet, ActivityIndicator} from 'react-native';
import { List, ListItem, Button, SearchBar } from 'react-native-elements'
import {connect} from "react-redux";
import {getAccountsListing} from "../redux/Actions/ListingActions";


const styles = StyleSheet.create({
    page: {
        // flex: 1,
    },
    search:{
        backgroundColor: 'transparent'
    }
});


class AccountsScreen extends React.Component {
    static navigationOptions = {
        title: 'Accounts',
        headerRight: <Button onPress={() => console.log(this)}>1</Button>
    };

    constructor(props){
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.loadAccountsListing();
    }

    loadAccountsListing = () =>{
        this.setState({loading: true});
        this.props.getAccountsListing(0,0,1).then(() => {
            this.setState({loading: false})
        })
    };

    render() {
        const { navigate } = this.props.navigation;
        const {accountsList} = this.props;

        console.log('ACCOUNTS_LIST', accountsList);

        return <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps={'handled'}>
            <SearchBar
                containerStyle={styles.search}
                lightTheme
                onChangeText={() =>{}}
                onClearText={() =>{}}
                icon={{ type: 'font-awesome', name: 'search' }}
                placeholder='Type Here...' />

            {this.state.loading ?
                <ActivityIndicator size="large" color="#0000ff" />
                :
                <List>
                    {
                        accountsList.map((rowData, sectionID) => (
                            <ListItem
                                key={sectionID}
                                title={rowData.name}
                                subtitle={rowData.varName}
                            />
                        ))
                    }
                </List>
            }


        </ScrollView>;
    }
}

const mapStateToProps = (state) => {
    return {
        accountsList: state.listingState.accountsList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAccountsListing: (longitude, latitude ,page) => {
            return dispatch(getAccountsListing(longitude, latitude ,page));
        }
    };
};

AccountsScreen = connect(mapStateToProps, mapDispatchToProps)(AccountsScreen);
export default AccountsScreen;
