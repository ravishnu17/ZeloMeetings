import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const Table = ({ cols, rows, handleCancelAcceptClick, handleEdit, menuIndex, setMenuIndex, loading }) => {
  return (
    <>
      {/* Table Header */}
      <View style={styles.row}>
        {cols.map((col, index) =>
          <Text style={{ ...styles.cell, ...styles.rowContainer, fontSize: 13, fontWeight: 'bold', marginRight: cols.length - 1 === index ? 10 : 0 }} key={index}>{col}</Text>)}
      </View>

      {/* Table Rows */}
      {
        rows?.length > 0 ?
          rows?.map((row, index) =>
            <View key={index} style={styles.rowContainer}>
              <TouchableOpacity style={styles.row} onPress={() => setMenuIndex(pre => pre === index ? null : index)}>
                {
                  Object.keys(row).map((cell, index1) =>
                    !['id', 'isEnded'].includes(cell) && <Text style={{ ...styles.cell, fontSize: 12 }} key={index1}>{row[cell]}</Text>
                  )}
                <Text style={{ alignSelf: 'center', fontSize: 12, marginLeft: 0 }}>
                  <Icon name={menuIndex === index ? 'caret-up' : 'caret-down'} type='font-awesome' size={20} color='#1cbdfd' />
                </Text>
              </TouchableOpacity>
              {
                menuIndex === index &&
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'flex-end', columnGap: 10 }}>
                  <Button title='Edit'
                    buttonStyle={{ backgroundColor: '#1cbdfd' }}
                    titleStyle={styles.menuText}
                    onPress={() => { handleEdit(row?.id) }}
                  />
                  <Button title='Cancel'
                    buttonStyle={{ backgroundColor: '#fd1c4d' }}
                    titleStyle={styles.menuText}
                    onPress={() => { handleCancelAcceptClick(row?.id, false) }}
                  />
                  <Button title='Accept'
                    buttonStyle={{ backgroundColor: 'green' }}
                    titleStyle={styles.menuText}
                    onPress={() => { handleCancelAcceptClick(row?.id, true) }}
                  />
                  <View style={{ position: 'absolute', top: 15, right: 0 }}>
                    <Icon source='close' size={20} onPress={() => setMenuIndex()} />
                  </View>
                </View>
              }
            </View>)
          :
          <Text style={styles.nodata}>{loading ? '' : 'Data Not Found!'}</Text>
      }
    </>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    flex: 1,
    padding: 0,
    marginTop: 12,
    textAlign: 'center',
    marginBottom: 3
  },
  menuText: {
    fontSize: 12,
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  nodata: {
    marginTop: '20%',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default Table;
