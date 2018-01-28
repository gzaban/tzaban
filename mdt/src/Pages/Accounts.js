import React from "react";
import { ScrollView , View , StyleSheet, ListView} from 'react-native';
import { List, ListItem, Avatar, SearchBar } from 'react-native-elements'

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
        title: 'Accounts'
    };

    constructor (props){
        super(props);
        this.state = {
            dataSource: [
                {
                    name: 'Amy Farha',
                    subtitle: 'Vice President'
                },
                {
                    name: 'Chris Jackson',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    subtitle: 'Vice Chairman'
                }
                ]
        }

    }

    render() {
        const { navigate } = this.props.navigation;
        return <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps={'handled'}>
            <SearchBar
                containerStyle={styles.search}
                lightTheme
                onChangeText={() =>{}}
                onClearText={() =>{}}
                icon={{ type: 'font-awesome', name: 'search' }}
                placeholder='Type Here...' />
            <List>
                {
                    this.state.dataSource.map((rowData, sectionID) => (
                        <ListItem
                            avatar={<Avatar
                                rounded
                                source={rowData.avatar_url && {uri: rowData.avatar_url}}
                                title={rowData.name[0]}
                            />}
                            key={sectionID}
                            title={rowData.name}
                            subtitle={rowData.subtitle}
                        />
                    ))
                }
            </List>
        </ScrollView>;
    }
}

export default AccountsScreen