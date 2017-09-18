// @flow
import React from 'react';
import { gql, graphql } from 'react-apollo';
import type { OperationComponent, QueryProps } from 'react-apollo/index.js.flow';
import { Button, RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const PAGE_SIZE = 20;

const ALL_EVENTS_QUERY = gql`
  query GetAllEvents($cursor: Cursor, $pageSize: Int!) { 
    allEvents(last: $pageSize, before: $cursor) {
      pageInfo {
        hasPreviousPage,
        startCursor
      }
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
  loadMore: () => any;
}

type InputProps = {
  limit: number;
}

type Props = Response & QueryProps;


const withEvents: OperationComponent<Response, InputProps, Props> = graphql(ALL_EVENTS_QUERY, {
  options: () => ({
    variables: { pageSize: PAGE_SIZE },
  }),
  props: ({ data }: { data: Props }) => ({
    ...data,
    loadMore: () => {
      return data.fetchMore({
        query: ALL_EVENTS_QUERY,

        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newNodes = fetchMoreResult.allEvents.nodes;
          const pageInfo = fetchMoreResult.allEvents.pageInfo;

          return {
            allEvents: {
              nodes: [...previousResult.allEvents.nodes, ...newNodes],
              pageInfo,
            },
          };
        },

        variables: {
          cursor:   data.allEvents.pageInfo.startCursor,
          pageSize: PAGE_SIZE,
        },
      });
    },
  }),
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
        return <Text key={`EVENT-${item.id}`}>Event: #{item.id} {item.title}</Text>;
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
    const { allEvents, error, loadMore, networkStatus, refetch } = this.props;

    return (
      <ScrollView refreshControl={
        <RefreshControl refreshing={networkStatus === 4} onRefresh={refetch} />
      }>
        <EventList error={error} events={allEvents} />
        <Button onPress={() => loadMore()} title="Load more" />
      </ScrollView>
    );
  }
}


export default withEvents(EventsScreen);
