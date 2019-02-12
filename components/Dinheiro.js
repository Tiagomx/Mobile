import React from 'react';
import {
  StyleSheet,
  ListView,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {AccordionList} from "accordion-collapse-react-native";
import { Container, Header, Content, Accordion,Separator  } from "native-base";

import * as Font from 'expo-font';

this.state={
  list:[
      {
        title: 'Getting Started',
        body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content'
      },
      {
        title: 'Components',
        body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
      }
      ],
}

export default class Dinheiro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: true,
      relatorio: [],
      //collapsed:false,
    };
  }



  


  _head(item){
    return(
        <Separator bordered style={{alignItems:'center'}}>
          <Text>{item.title}</Text>
        </Separator>
    );
}

_body(item){
    return (
        <View style={{padding:10}}>
          <Text style={{textAlign:'center'}}>{item.body}</Text>
        </View>
    );
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
     <AccordionList
            list={this.state.relatorio}
            header={this._head}
            body={this._body}
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
