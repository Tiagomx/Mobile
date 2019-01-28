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

export default class DataHora extends React.Component {
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
      'https://mobile-5367c.firebaseio.com/VENDA_SUPER_VILLA/1/.json'
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
        <View style={{ flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View
       // style={{ flex: 1, paddingTop: 0 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            componentDidMount={this.componentDidMount()}
          />
        }>
        <FlatList
          style={styles.line}
          data={this.state.relatorio}
          renderItem={({ item }) => (
            <Text style={[styles.cell, styles.content]}>{item}</Text>
          )}
        />
          
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    //paddingTop: 50,
   // paddingBottom: 0,
    borderWidth: 0,
    borderColor: '#FFFF',
  },
  cell: {
    fontSize: 15,
    paddingLeft: 25,
    paddingTop: 10,
    color: '#B3B6B7',
    // borderWidth: 1,
  },
});
