import * as React from 'react';

import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import DinheiroView from './components/Dinheiro';
import CartaoView from './components/Cartao';
import PrazoView from './components/Prazo';
import TotalGeralView from './components/TotalGeral';
import { Card } from 'react-native-paper';
import Expo from 'expo';

const RotaTab1 = () => (
  <View style={[styles.container, { backgroundColor: '#ffff' }]}>
    <DinheiroView />
  </View>
);
const RotaTab2 = () => (
  <View style={[styles.container, { backgroundColor: '#ffff' }]}>
    <CartaoView />
  </View>
);
const RotaTab3 = () => (
  <View style={[styles.container, { backgroundColor: '#ffff' }]}>
    <PrazoView />
  </View>
);

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'tab1', title:'DINHEIRO'},
      { key: 'tab2', title:'CARTÃO' },
      { key: 'tab3', title:'PRAZO' },
    ],
  };

  render() {
    return (
      <View style={[styles.container]}>
        <TotalGeralView styles={[styles.paragraph]} />
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            tab1: RotaTab1,
            tab2: RotaTab2,
            tab3: RotaTab3,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
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
