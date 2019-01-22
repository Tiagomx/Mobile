import React from 'react';
import {
  View,
  StyleSheet,
  ListView,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class TotalCartao extends React.Component {
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
      'https://mobile-5367c.firebaseio.com/Vendas_Super_Villa_SomaTotal/1/.json'
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
        <List>
          <FlatList
            style={styles.line}
            data={this.state.relatorio}
            renderItem={({ item }) => (
              <Text style={[styles.cell, styles.content]}>{item}</Text>
            )}
            // keyExtractor={item =>  item}
          />
        </List>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    paddingTop: 100,
    paddingBottom: 3,
    borderWidth: 1,
    borderColor: '#C5C5C5',
  },
  cell: {
    fontSize: 60,
    paddingLeft: 70,
    paddingTop: 70,
    // borderWidth: 1,
  },
});
