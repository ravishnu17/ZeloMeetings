import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Table = ({cols, rows}) => {
  return (
    <>
      {/* Table Header */}
      <View style={styles.row}>
        {cols.map((col, index) => 
          <Text style={styles.cell} key={index}>{col}</Text>)}
      </View>

      {/* Table Rows */}
      {
        rows?.length > 0 ?
        rows.map((row, index) => 
          <View style={styles.row} key={index}>
            {row.map((cell, index) => 
              <Text style={styles.cell} key={index}>{cell}</Text>)}
          </View>)
          :
          <Text style={styles.nodata}>Data Not Found!</Text>
      }
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
    padding: 5,
    marginTop: 15,
    textAlign: 'center',
  },
  nodata: {
    marginTop: '20%',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default Table;
