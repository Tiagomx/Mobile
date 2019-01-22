import React from 'react';
import {ListView, FlatList, ActivityIndicator, Text, RefreshControl, ScrollView } from 'react-native';
import {List, ListItem} from 'react-native-elements';

export default class Cartao extends React.Component {

constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: true,
            relatorio:[]
        }
    }

        componentDidMount() {
        return fetch('https://mobile-5367c.firebaseio.com/Vendas_Super_Villa_SomaTotal/4/.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    refreshing: false,
                    relatorio: responseJson,
              
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

  render() {
        if (this.state.isLoading || this.state.refreshing) {
            return (
                <ScrollView style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </ScrollView>
            )
        }

        return (  
                     
            <ScrollView style={{ flex: 1, paddingTop: 20 }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        componentDidMount={this.componentDidMount()} />
                }>
                <List>
                <FlatList
                    data={this.state.relatorio}
                    renderItem={({ item }) => (
                            <ListItem
                hideChevron
                title={`           Caixa: ${item.CAIXA}             -            R$ ${item.TOTAL_MOVIMENTAÇÃO}               `}
                                     
              />                         
                    )}
                    keyExtractor={item =>  item.CAIXA} 
                    />
                </List>
                
            </ScrollView>           
        );
    }
}


