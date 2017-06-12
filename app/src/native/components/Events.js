import React from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { gql, graphql } from 'react-apollo';

const query = gql`
  query getLatestEvents {
    title
  }
`;

const EventsWithData = graphql(query, { options: {} })(Events);


function Events({ data }) {
  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={data.networkStatus === 4} onRefresh={data.refetch}/>
    }>
      <EventList data={data} />
    </ScrollView>
  )
}


function EventList({ data }) {
  if (data.error) {
    return <Text>Error! {data.error.message}</Text>
  }

  if (!data.events) {
    return <Text>No events found</Text>
  }

  return (
    <View>
      <Text>Events</Text>

      { data.events.map((item) => {
        return <Text>Event: {item.title}</Text>;
      })}
    </View>
  )
}

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
      <EventsWithData/>
    )
  }
}


export default EventsScreen;
