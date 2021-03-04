import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { StatusBar } from "expo-status-bar";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return;
        }
      });
  }, []);

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
        // Other action => Run an HTTP request, Navigate to a different screen and stuffs
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const triggerLocalNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the first local notification we are sending.",
      },
      trigger: {
        seconds: 5,
      },
    });
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Trigger Local Push Notification"
        onPress={triggerLocalNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
