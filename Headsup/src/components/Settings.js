import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ChartsListScreen from './screen/ChartsListScreen';

const {width} = Dimensions.get('screen');
const svgWidth = width * 3;

const Settings = ({data, country}) => {
  const [pressedData, setPressedData] = useState({});
  const [animatedOpacity, setAnimatedOpacity] = useState(0);
  let scrollView;
  let widthOfCandle = 10;
  let xWidth = 12;
  let heightScale = 1;
  if (data.length !== 0) {
    const max = data[data.length - 1].cases;
    data = data.filter((d) => d.cases / max > 0.001);
    xWidth = svgWidth / data.length;
    widthOfCandle = xWidth - 1;
    heightScale = width / data[data.length - 1].cases;
  }
  return (
        <ChartsListScreen>
      </ChartsListScreen>
  );
};

const styles = StyleSheet.create({
  countrySection: {
    backgroundColor: '#FFC692',
    marginTop: 0,
    marginBottom: 20,
    paddingVertical: 20,
    paddingTop: 10,
    borderRadius: 16,
  },
  countryHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  countrySectionTitle: {
    textAlign: 'justify',
    color: 'black',
    marginTop: 0,
    fontWeight: 'bold',
    fontFamily: '',
  },
  animatedDataDialog: {
    color: 'black',
    padding: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    left: 20,
    top: 0,
  },
  graphContainer: {
    backgroundColor: '#FFC692',
    padding: 10,
  },
});

export default Settings;
