import { en } from './en'
import { sp } from './sp'
import { pt } from './pt'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const translation = async () => {
    let lang = await AsyncStorage.getItem('language');
    return lang == 'es' ? sp : lang == 'pt' ? pt : en
}