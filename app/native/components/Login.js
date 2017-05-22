import React from 'react';
import { ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class LoginScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Forum',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="comments" size={30} color={tintColor} />
    ),
    title: 'Forum'
  };

  render() {
    return (
      <ScrollView>
        <Text>
          Login
        </Text>
      </ScrollView>
    )
  }
}


export default LoginScreen;
