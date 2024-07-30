import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function Feedback() {
    const schema = yup.object().shape({
        title: yup.string().required('Title is required'),
        description: yup.string().required('Description is required'),
    })

    const { register, formState: { errors }, handleSubmit, reset, control } = useForm({ resolver: yupResolver(schema) });

    const sendFeedback = (data) => {
        console.log(data);
        reset();
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={{ ...styles.label, marginTop: 10 }}>Title</Text>
            <Controller
                name='title'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder='Enter Title'
                        style={styles.inputTitle}
                    />
                )}
            />
            {/* <TextInput {...register('title')} placeholder='Enter Title' style={styles.inputTitle} /> */}
            <Text style={styles.error}>{errors.title?.message}</Text>

            <Text style={styles.label}>Description</Text>
            <Controller
                name='description'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder='Enter Description'
                        style={styles.inputDescription}
                        multiline
                        numberOfLines={4}
                    />
                )}
            />
            <Text style={styles.error}>{errors.description?.message}</Text>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(sendFeedback)}>
                <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>Send</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff'
    },
    label: {
        fontSize: 16,
        marginBottom: 10
    },
    error: {
        color: 'red',
        marginBottom: 10
    },
    inputTitle: {
        borderWidth: 1,
        borderColor: '#797979',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5
    },
    inputDescription: {
        borderWidth: 1,
        borderColor: '#797979',
        borderRadius: 5,
        textAlignVertical: 'top',
        padding: 10,
        marginBottom: 5
    },
    button: {
        margin: 10,
        padding: 8,
        width: 100,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: '#035676'
    }
})

export default Feedback