// utils/notifyUtils.js
import * as Notifications from "expo-notifications";

export const sendLocalNotification = async ({ title, body }) => {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: "default" },
    trigger: null, // send immediately
  });
};
