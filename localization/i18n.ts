import {FallbackLng} from "./../node_modules/i18next/typescript/options.d";
import i18n, {Module, ModuleType} from "i18next";
import {initReactI18next} from "react-i18next";
import {en, id} from "./translation";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const languageDetect = {
//     type: "languageDetector",
//     async: true,
//     init: () => {},
//     detect: async function (callback: (lang: string) => void) {
//         try {
//             await AsyncStorage.getItem("userLanguage").then((language) => {
//                 if (language) {
//                     return callback(language);
//                 } else {
//                     return callback("en");
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     cacheUserLanguage: async function (language: string) {
//         try {
//             await AsyncStorage.setItem("userLanguage", language);
//         } catch (error) {
//             console.log("Failed to store yout preference language!", error);
//         }
//     },
// };

const resources = {
    id: {
        translation: id,
    },
    en: {
        translation: en,
    },
};

class LanguageDetectorModule implements Module {
    type: ModuleType = "languageDetector";
    async: boolean = true;
    init: () => void = () => {};
    detect: (callback: (lang: string) => void) => Promise<void> = async (callback) => {
        try {
            await AsyncStorage.getItem("userLanguage").then((language) => {
                if (language) {
                    return callback(language);
                } else {
                    return callback("en");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    cacheUserLanguage: (language: string) => Promise<void> = async (language) => {
        try {
            await AsyncStorage.setItem("userLanguage", language);
        } catch (error) {
            console.log("Failed to store your preference language!", error);
        }
    };
}

const languageDetectorModule = new LanguageDetectorModule();

i18n.use(initReactI18next)
    .use(languageDetectorModule)
    .init({
        resources,
        compatibilityJSON: "v3",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
