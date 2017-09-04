import React from 'react';
import { gql, graphql } from 'react-apollo';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const query = gql`
  query { allEvents(last: 10) {
    nodes {
      id, title
    }
  } }
`;


function EventList({ data }) {
  console.log(data);

  if (data.error) {
    return <Text>Error! {data.error.message}</Text>
  }

  if (!data.allEvents) {
    return <Text>No events found</Text>
  }

  return (
    <View>
      <Text>Events</Text>

      { data.allEvents.nodes.map((item) => {
        return <Text key={`EVENT-${item.id}`}>Event: {item.title}</Text>;
      })}
    </View>
  )
}


@graphql(query)
class EventsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Events',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="calendar" size={30} color={tintColor} />
    ),
    title: 'Events'
  };

  render() {
    const { data } = this.props;

    return (
      <ScrollView refreshControl={
        <RefreshControl refreshing={data.networkStatus === 4} onRefresh={data.refetch}/>
      }>
        <EventList data={data} />
      </ScrollView>
    )
  }
}


export default EventsScreen;
