import React from 'react';
import {
  StyleSheet,
  ListView,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Expo from 'expo';

export default class Dinheiro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: true,
      relatorio: [],
    };
  }

  componentDidMount() {
    return fetch(
      'https://mobile-5367c.firebaseio.com/VENDA_SUPER_VILLA/7/.json'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            refreshing: false,
            relatorio: responseJson,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading || this.state.refreshing) {
      return (
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </ScrollView>
      );
    }

    return (
      <ScrollView
        style={{ flex: 1, paddingTop: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            componentDidMount={this.componentDidMount()}
          />
        }>
         <FlatList
            data={this.state.relatorio}
            renderItem={({ item }) => (
              <ListItem        
                hideChevron
                title={`Caixa: ${item.CAIXA} `}
                titleStyle={{color: 'black',fontSize: 15,}}
                rightTitle={` R$ ${item.TOTAL_MOVIMENTAÇÃO} `}
                rightTitleStyle={{
                  fontSize: 15,
                  color: '#B3B6B7',
                }}                 
              />
            )}
            keyExtractor={item => item.CAIXA}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
