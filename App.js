import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  state = {
    aqi: '--'
  }

  componentDidMount() {
    this.loadAQI();
    this.loadInterval();
  }

  loadInterval() {
    setTimeout(() => {
      this.loadAQI();
      this.loadInterval();
    }, 15 * 60 * 1000);
  }

  loadAQI() {
    fetch('https://api.waqi.info/feed/beijing/?token=323cc85735abe934588c86f66a7bea1ed595fc3f').then((resp) => {
      return resp.json();
    }).then((data) => {
      this.setState({
        aqi: data.data.aqi
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Current AQI of BeiJing:</Text>
        <Text style={styles.aqiText}>{this.state.aqi}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24
  },
  aqiText: {
    fontSize: 24,
    color: 'red',
  }
});
