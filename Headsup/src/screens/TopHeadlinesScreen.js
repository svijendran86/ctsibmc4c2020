/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Headline} from 'react-native-paper';

// importing components
import NewsCards from '../components/NewsCards';

// importing common style
import Styles from '../Styles';

// importing hooks
import getTopHeadlines from '../hooks/getTopHeadlines';

const TopHeadlinesScreen = ({style}) => {
  const [fetchTopHeadlines, topHeadlines, err] = getTopHeadlines();

  // for pull down to refresh
  const [refreshing, setRefresh] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await fetchTopHeadlines();
    setRefresh(false);
  }, [fetchTopHeadlines]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        ...style,
      }}>
      <ScrollView
        style={Styles.safeArea}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={Styles.mainHeader}>
          <Headline style={Styles.topHeadLineHeaderText}>Top Headlines</Headline>
        </View>

        {topHeadlines ? (
          <NewsCards topHeadlines={topHeadlines} />
        ) : (
          <ActivityIndicator size="large" color="white" />
        )}
      </ScrollView>
    </View>
  );
};

export default TopHeadlinesScreen;
