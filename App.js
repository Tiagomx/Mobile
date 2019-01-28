import * as React from 'react';

import { Text, Animated, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import {TabViewAnimated, TabView, TabBar, SceneMap } from 'react-native-tab-view';
import DinheiroView from './components/Dinheiro';
import CartaoView from './components/Cartao';
import PrazoView from './components/Prazo';
import TotalGeralView from './components/TotalGeral';
import TotalDinheiroView from './components/TotalDinheiro';
import TotalCartaoView from './components/TotalCartao';
import TotalPrazoView from './components/TotalPrazo';
import DataHoraView from './components/DataHora';
import EmpresaView from './components/Empresa';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Constants } from 'expo';




const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const RotaTab1 = () => (
  <View style={[styles.container, styles.FirstRouteStyle]}>
    <DinheiroView />
    <TotalDinheiroView/>
  </View>
);
const RotaTab2 = () => (
  <View style={[styles.container, styles.SecondRouteStyle]}>
    <CartaoView />
    <TotalCartaoView />
  </View>
);
const RotaTab3 = () => (
  <View style={[styles.container, styles.ThirdRouteStyle]}>
    <PrazoView />
    <TotalPrazoView/>
  </View>
);

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'tab1', title:'Dinheiro', tabStyle: { backgroundColor: 'white' } },
      { key: 'tab2', title:'Cartão' , tabStyle: { backgroundColor: 'white' } },
      { key: 'tab3', title:'Prazo'  , tabStyle: { backgroundColor: 'white' } },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = () => {
      return <TabBar renderLabel={this._renderLabel} />
    }

  _renderTabBar = props => {
      const inputRange = props.navigationState.routes.map((x, i) => i);
  
      return (
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const color = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map(
                inputIndex => (inputIndex === i ? '#FFF' : '#222')
              ),
            });
            return (
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => this.setState({ index: i })}>
                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };
    

    _renderScene = SceneMap({
      tab1: RotaTab1,
      tab2: RotaTab2,
      tab3: RotaTab3,
    });

  render() {
    return (
      
      <View style={[styles.container, styles.content]}>
        <EmpresaView styles={[styles]} />
        <DataHoraView styles={[styles.paragraph]} />                      
        <TotalGeralView/>
        <TabView 
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#32326a'
  },
});