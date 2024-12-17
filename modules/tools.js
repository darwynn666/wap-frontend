import { Linking } from "react-native"

const callNumber = (phoneNumber) => {
    const callUrl = `tel:${phoneNumber}`
    Linking.canOpenURL(callUrl).then((supported) => {
        if (!supported) { Alert.alert('Erreur', 'Ce numéro ne peut pas être composé.') }
        else { return Linking.openURL(callUrl) }
    })
        .catch((err) => console.error(err))
}

const smsNumber = (phoneNumber) => {
    const smsUrl = `sms:${phoneNumber}`
    Linking.canOpenURL(smsUrl).then((supported) => {
        if (!supported) { Alert.alert('Erreur', 'Ce numéro ne peut pas être composé.') }
        else { return Linking.openURL(smsUrl) }
    })
        .catch((err) => console.error(err))
}

const sendEmail = (email) => {
    const emailUrl = `mailto:${email}?subject=${encodeURIComponent('Contact depuis Wap')}`
    Linking.canOpenURL(emailUrl).then((supported) => {
        if (!supported) { Alert.alert('Erreur', 'Impossible d\'ouvrir l\'application d\'email') }
        else { return Linking.openURL(emailUrl) }
    })
        .catch((err) => console.error(err))
}

module.exports = {callNumber,smsNumber,sendEmail}