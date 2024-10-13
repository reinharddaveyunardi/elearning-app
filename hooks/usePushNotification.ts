import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {useEffect, useRef, useState} from "react";
import Constants from "expo-constants";
import {Platform} from "react-native";
import {colorPalette} from "@/constants/Colors";

export interface PushNotificationState {
    notification?: Notifications.Notification;
    expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotification = (): PushNotificationState => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldShowAlert: true,
            shouldSetBadge: false,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState<
        Notifications.ExpoPushToken | undefined
    >();
    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >();

    const notificationListen = useRef<Notifications.Subscription>();
    const responseListen = useRef<Notifications.Subscription>();

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const {status: existingStatus} =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
            }
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId,
            });

            if (Platform.OS === "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: colorPalette.primary,
                });
            }
            return token;
        } else {
            console.log("This device is not a physical device");
        }
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token);
        });

        notificationListen.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListen.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                }
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListen.current!
            );

            Notifications.removeNotificationSubscription(
                responseListen.current!
            );
        };
    }, []);

    return {
        expoPushToken,
        notification,
    };
};
