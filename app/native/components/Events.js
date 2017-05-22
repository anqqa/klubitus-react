import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class EventsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Events',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="calendar" size={30} color={tintColor} />
    ),
    title: 'Events'
  };

  render() {
    return (
      <ScrollView>
        <Text>
          Events
        </Text>
      </ScrollView>
    )
  }
}


export default EventsScreen;
