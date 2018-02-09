import React from "react";
import { ScrollView , View ,Text, StyleSheet, ActivityIndicator} from 'react-native';
import { List, ListItem, Button, SearchBar, Icon } from 'react-native-elements'
import {connect} from "react-redux";
import {getAccountsListing} from "../redux/Actions/ListingActions";
import _ from 'lodash'
import moment from "moment";


const styles = StyleSheet.create({
    ScrollView: {
        // flex: 1,
    },

    search:{
        backgroundColor: 'transparent'
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    subtitleViewInner: {
        flexDirection: 'row'
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
            search: '',
            accounts: [],
            filterBy: 'name'
        }
    }

    componentDidMount() {
        this.loadAccountsListing();
    }

    loadAccountsListing = () =>{
        this.setState({loading: true});
        this.props.getAccountsListing(0,0,1).then(() => {
            this.setState({loading: false, accounts: _.sortBy(this.props.accountsList, this.state.filterBy)})
        })
    };

    onSearch = (value) => {
        console.log(value);
        this.setState({search: value, showSearchClear: true});
        let accounts = _(this.props.accountsList)
            .filter(c => (c.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||  (c.varName && c.varName.toLowerCase().indexOf(value.toLowerCase()) !== -1 )))
            .map(c => c)
            .value();


        accounts = _.sortBy(accounts, this.state.filterBy);
        this.setState({accounts: accounts})
    };

    render() {
        const { navigate } = this.props.navigation;

        return <View >
            <SearchBar
                containerStyle={styles.search}
                lightTheme
                onChangeText={(event) => this.onSearch(event)}
                onClearText={() => this.setState({search: '', accounts: this.props.accountsList})}
                icon={{ type: 'font-awesome', name: 'search' }}
                placeholder='Type Here...' />

            {this.state.loading ?
                <ActivityIndicator size="large" color="#0000ff" />
                :
                <ScrollView contentContainerStyle={styles.ScrollView} keyboardShouldPersistTaps={'handled'}>
                    <List>
                        {
                            this.state.accounts.map((rowData, sectionID) => (
                                <ListItem
                                    key={sectionID}
                                    title={rowData.name}
                                    subtitle={
                                        <View style={styles.subtitleView}>
                                            <Text>{rowData.varName} - </Text>
                                            {this.state.filterBy === 'distance' ?
                                                <View style={styles.subtitleViewInner}>
                                                    <Icon
                                                        name='location'
                                                        type='evilicon'
                                                        color='#517fa4'/>
                                                    <Text>{(rowData.distance === null ? '- -' : rowData.distance) + ' ' + rowData.distanceUnitStringKey }></Text>
                                                </View>
                                                :
                                                <View style={styles.subtitleViewInner}>
                                                    <Icon
                                                        name='clock'
                                                        type='evilicon'
                                                        color='#517fa4'/>
                                                    <Text>{moment(rowData.creation).fromNow()}</Text>
                                                </View>
                                            }
                                        </View>
                                    }
                                />
                            ))
                        }
                    </List>
                </ScrollView>
            }
        </View>;
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
