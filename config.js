// backend
// export const BACKEND_URL = 'https://wap-backend.vercel.app'
// export const BACKEND_URL = 'http://192.168.1.147:3000'
export const BACKEND_URL = 'http://10.1.1.56:3000'


import { faDog } from "@fortawesome/free-solid-svg-icons";

const greenPrimary = "#44CD6F";
const grayPrimary = "#A19D9D";
const grayLight = "#D9D9D9";
const bluePrimary = "#5F9CE1";
const blueLight = "#A9CAEF";
const redPrimary = "#DF4141";

// global style properties
export const globalStyle = {

    h1: 30,
    h2: 20,
    h3: 18,
    h4: 15,
    h5: 12,
    h6: 10,
    backgroundColor: '#fff',
    padding: 20,

    //container
    mainContainerPaddingHor: 30,

    //colors
    greenPrimary: greenPrimary,
    grayPrimary: grayPrimary,
    grayPrimary: grayPrimary,
    grayLight: grayLight,
    bluePrimary: bluePrimary,
    blueLight:blueLight,
    redPrimary: redPrimary,

    // buttons
    buttonPrimaryBackgroundColor: greenPrimary, // background
    buttonPrimaryColor: 'white', // text
    buttonSecondaryYesColor: greenPrimary, // text & border
    buttonSecondaryNoColor: grayPrimary, // text & border

    //icon
    iconSize: 30


}


export const userAvatarUrl = 'https://res.cloudinary.com/dlbepeoff/image/upload/v1734078126/avatar_g55kvf.jpg'
export const dogAvatarUrl = 'https://res.cloudinary.com/dlbepeoff/image/upload/v1734442673/dogavatar_vgjzgu.jpg'
export const defaultPlaceUrl = 'https://res.cloudinary.com/dlbepeoff/image/upload/v1734431989/default_location_images_u2fbv8.jpg'
export const logoHomeUrl = '' // à définir et uploader sur cloudinary



export function formatFrenchPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/[^\d]/g, "") // supp non-numerics
    if (cleaned.length === 10 && /^[06|07]/.test(cleaned)) { // 06 ...
        return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
    }
    if (cleaned.length === 11 && cleaned.startsWith("33")) {
        const localNumber = "0" + cleaned.slice(2); // +336...
        return localNumber.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
    }
    return "";
}