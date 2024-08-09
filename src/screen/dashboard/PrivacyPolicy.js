import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native'

function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
        This data privacy guarantee statement applies to users of our websites, www.zelo2000.pt / www.zelo2000.com / www.zelomeetings.com and to users of the ZELO service, available through these websites and through mobile applications.
      </Text><Text style={styles.text}>
        The personal data requested, whether for a information request, creation a demo account or service subscription, will be treated in accordance with the rules defined in this Privacy Policy.
      </Text><Text style={styles.text}>
        This privacy notice is intended to inform you about how Zelo 2000 Soluções Informáticas, Lda., legal enterprise with the VAT number 504411667 and headquarter at Rua Marquesa de Alorna Lote 290 in Famões (hereinafter referred to as Zelo 2000), handles the data personal data provided by users of our services.
      </Text><Text style={styles.text}>
        When we ask for your data, our unique objective is to maintain a closer relationship with our users and customers, which is the way we can make our service available or be able to respond commercially or technically to a request.
      </Text><Text style={styles.text}>
        Zelo 2000 guarantees that your data WILL NOT be provided and / or disclosed to any other organizations or companies, whether for promotional and / or commercial purposes, either by email or by telephone.
      </Text><Text style={styles.text}>
        All communications sent by Zelo 2000, occur because they are or have already been our customers, registered users on our platforms, or because at some point there were commercial or technical contacts between the parties. The communications will always be with information related to the solution customers have, or at a certain time expressed interest in it, it may be with information about news, new features, improvements and new software versions that aim to improve the service and experience, or commercial information, that in the past, on our understanding may be relevant and complementary to the customer's solution.
      </Text><Text style={styles.text}>
        The user of our platforms, can choose to receive, or not receive, our communications, which will always be via email and / or phone.
      </Text><Text style={styles.text}>
        The user, in case does not wish to receive the communications mentioned above, can cancel them, through one of our platforms, or simply send an email to marketing@zelo2000.pt with the Subject: Cancel Newsletter.
      </Text><Text style={styles.text}>
        Customers and users, through our website or through our mobile application, or by any other form of contact, will always have access to their personal data and the possibility to remove or update them.
      </Text><Text style={styles.text}>
        If you have any questions regarding this commitment, do not hesitate to contact us
      </Text><Text style={styles.text}>
        Zelo 2000 reserves the right to change this Privacy Policy, while respecting all its rights, in particular the right to be informed about such changes.
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginBottom: 10
  },
  text: {
    marginBottom: 15
  }
})

export default PrivacyPolicy