import React, {Component} from 'react';
import {Linking, FlatList, TouchableOpacity} from 'react-native';

// importing component
import FitBitData from './FitBitData';

class FitBitAuth extends Component {
  render() {
    const {fitBitAuth} = this.props;
    return (
      <FlatList
        data={fitBitAuth}
        keyExtractor={(news) => news.title}
        renderItem={({item}) => {
          if (!item.title || !item.description || !item.url) {
            return;
          }
          return (
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <FitBitData
                title={item.title}
                content={item.description}
                src={{uri: item.image}}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

export default FitBitAuth;
