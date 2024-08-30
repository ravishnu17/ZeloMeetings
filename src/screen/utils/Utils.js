import { ActivityIndicator, Text, View } from "react-native";

export const loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
    );
}

// Google 
export const GOOGLE_CLIENT_ID = "245989026495-mk374knehmq7ktu6h3st0g18u1rcbd7s.apps.googleusercontent.com";
export const GOOGLE_OAUTH_APP_GUID = "245989026495-mk374knehmq7ktu6h3st0g18u1rcbd7s";
export const GOOGLE_REDIRECT_URI = `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`;
export const SCOPE = ['openid', 'profile', 'email'];
// ["user.read","mailboxsettings.read","calendars.readwrite","Bookings.Manage.All","Bookings.ReadWrite.All","BookingsAppointment.ReadWrite.All","Calendars.ReadWrite.Shared","openid","profile","offline_access"];

// Microsoft
export const MICROSOFT_CLIENT_ID = 'f6e906f5-82ba-46f2-b3f0-73c4ad692718';
export const MICROSOFT_REDIRECT_URI = Platform.OS === 'android' ? 'msauth://com.zelomeetings/lPZSqV6dsYwY8YGcZxHGS5grkQM%3D' : 'msauth.com.zelomeetings://auth' ;
