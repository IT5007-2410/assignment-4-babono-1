/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import IssueList from './IssueList.js';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.header}>
            📝 Issue Tracker
          </Text>
          <Text style={styles.subheader}>
            Made for IT5007 Assignment 4 by Muhammad Nurul Akbar (A0310016A)
          </Text>
          <ScrollView style={styles.content}>
            <IssueList />
          </ScrollView>
          <Text style={styles.footer}>
            Copyright &copy; 2024. All rights reserved.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subheader: {
    fontSize: 11,
    color: '#000',
    backgroundColor: '#d7d7d7',
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  footer: {
    fontSize: 10,
    color: '#000',
    backgroundColor: '#F6CC47',
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
