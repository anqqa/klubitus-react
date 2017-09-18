// @flow
import React from 'react';
import { gql, graphql } from 'react-apollo';
import type { OperationComponent, QueryProps } from 'react-apollo/index.js.flow';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const ALL_EVENTS_QUERY = gql`
  query GetAllEvents($limit: Int) { 
    allEvents(last: $limit) {
      nodes {
        id, title
      }
    }
  }
`;

type Event = {
  id: number;
  title: string;
}

type Response = {
  allEvents: {
    nodes: Event[]
  };
}

type InputProps = {
  limit: number;
}

type Props = Response & QueryProps;


const withEvents: OperationComponent<Response, InputProps, Props> = graphql(ALL_EVENTS_QUERY, {
  options: () => ({
    variables: { limit: 10 },
  }),
  props: ({ data }) => ({ ...data }),
});


function EventList({ error, events }: Props) {
  if (error) {
    return <Text>Error! {error.message}</Text>;
  }

  if (!events) {
    return <Text>No events found</Text>;
  }

  return (
    <View>
      <Text>Events</Text>

      { events.nodes.map((item) => {
        return <Text key={`EVENT-${item.id}`}>Event: {item.title}</Text>;
      })}
    </View>
  );
}


class EventsScreen extends React.PureComponent<Props> {

  static navigationOptions = {
    tabBarIcon:  ({ tintColor }) => (
      <Icon name="calendar" size={30} color={tintColor} />
    ),
    tabBarLabel: 'Events',
    title:       'Events',
  };

  props: Props;


  render() {
    const { allEvents, error, networkStatus, refetch } = this.props;

    return (
      <ScrollView refreshControl={
        <RefreshControl refreshing={networkStatus === 4} onRefresh={refetch} />
      }>
        <EventList error={error} events={allEvents} />
      </ScrollView>
    );
  }
}


export default withEvents(EventsScreen);
