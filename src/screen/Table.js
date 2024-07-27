import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Table = ({cols}) => {
  return (
    <>
      {/* Table Header */}
      <View style={styles.row}>
        {cols.map((col, index) => 
          <Text style={[styles.cell, styles.header]} key={index}>{col}</Text>)}
      </View>

      {/* Table Rows */}
      <View style={styles.row}>
        <Text style={styles.cell}>Row 1, Cell 1</Text>
        <Text style={styles.cell}>Row 1, Cell 1</Text>
        <Text style={styles.cell}>Row 1, Cell 1</Text>
        <Text style={styles.cell}>Row 1, Cell 2</Text>
        <Text style={styles.cell}>Row 1, Cell 3</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Row 1, Cell 1</Text>
        <Text style={styles.cell}>Row 1, Cell 1</Text>
        <Text style={styles.cell}>Row 2, Cell 1</Text>
        <Text style={styles.cell}>Row 2, Cell 2</Text>
        <Text style={styles.cell}>Row 2, Cell 3</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Row 1, Cell 1</Text>
        <Text style={styles.cell}>Row 1, Cell 1</Text>
        <Text style={styles.cell}>Row 3, Cell 1</Text>
        <Text style={styles.cell}>Row 3, Cell 2</Text>
        <Text style={styles.cell}>Row 3, Cell 3</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 15,
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#fafafa',
  },
});

export default Table;
