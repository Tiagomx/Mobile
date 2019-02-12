import React from 'react';

import { 
    Text, 
    Animated,
    Image, 
    TouchableOpacity, 
    View,
    StyleSheet, 
    Dimensions 
} from 'react-native';

import {
  TabViewAnimated,
   TabView, 
   TabBar, 
   SceneMap 
  } from 'react-native-tab-view';
import DinheiroView from './components/Dinheiro';
import CartaoView from './components/Cartao';
import PrazoView from './components/Prazo';
import TotalGeralView from './components/TotalGeral';
import TotalDinheiroView from './components/TotalDinheiro';
import TotalCartaoView from './components/TotalCartao';
import TotalPrazoView from './components/TotalPrazo';
import DataHoraView from './components/DataHora';
import EmpresaView from './components/Empresa';
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

const iconeDinheiro = require('./assets/images/Dinheiro.png');
const iconeCartao = require('./assets/images/Cartao.png');
const iconePrazo = require('./assets/images/Prazo.png');

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'tab1', title:'Dinheiro'},
      { key: 'tab2', title:'Cartão' },
      { key: 'tab3', title:'Prazo'},
    ],    
  };

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
 
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((key, i) => {
          const color = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(
              inputIndex => (inputIndex === i ? '#13E442' : '#e6f1f1')
            ),            
          });
          return (
            <TouchableOpacity
              style={[styles.tabItem, {backgroundColor: '#FFF' }]}
              onPress={() => this.setState({ index: i })}>
              <Image style={styles.iconTab} source={ key.title === 'Dinheiro' ? 
                                         iconeDinheiro:key.title === 'Cartão' ? 
              iconeCartao:iconePrazo } />
              <Animated.Text style={[{color}]}></Animated.Text>                            
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
        <EmpresaView styles={[styles.paragraph]} />
        <DataHoraView styles={[styles.paragraph]} />
        <TotalGeralView/>     
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={index => this.setState({ index })}
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
    paddingTop: 30,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#32326a',
    borderBottomWidth: 1.5,
    borderBottomColor: '#222',
  },
  iconTab: {
    paddingTop: 16,
    margin: 2,
    width: 32,
    justifyContent: 'center',
    height: 32,
  },
});