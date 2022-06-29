import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Animated from "react-native-reanimated";

import { McText, McImage } from "../../Components";
import { Images } from "../../Constants";
import {
  Accounts,
  Help,
  Home,
  Profile,
  Settings,
  Stats,
  Transactions,
} from "../../Screens";

const Drawer = createDrawerNavigator();

const MENUs = [
  { name: "Home", label: "Home" },
  { name: "Profile", label: "Profile" },
  { name: "Accounts", label: "Accounts" },
  { name: "Transactions", label: "Transactions" },
  { name: "Stats", label: "Stats" },
  { name: "Settings", label: "Settings" },
  { name: "Help", label: "Help" },
];

const DrawerMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const theme = useTheme();

  // we do 3 animations here
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  });

  const rotate = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: ["0deg", "-10deg"],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 30],
  });

  const animatedStyle = {
    borderRadius,
    transform: [{ scale, rotateZ: rotate }],
  };

  const CustomDrawerContent = ({ navigation }) => {
    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            width: 210,
            height: 107,
            borderBottomEndRadius: 107 / 2,
            backgroundColor: theme.colors.background,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: theme.colors.boxBackground,
                marginRight: 10,
              }}
            >
              <Image
                style={{ width: 45, height: 45, borderRadius: 30 }}
                source={require("../../../assets/user.png")}
              />
            </View>
            <View>
              <McText semi size={16} color={theme.colors.text1}>
                Farhantsyh
              </McText>
              <McText medium size={10} color={theme.colors.text3}>
                Silicon Valley, USA
              </McText>
            </View>
          </View>
        </View>

        {/* DrawerItems */}
        <DrawerContentScrollView
          scrollEnabled={false}
          contentContainerStyle={{}}
          style={{
            marginLeft: -18,
          }}
        >
          {MENUs?.map((menu, index) => {
            return (
              <DrawerItem
                focused={activeIndex === index}
                key={index}
                onPress={() => {
                  setActiveIndex(index);
                  navigation.navigate(menu.name);
                }}
                activeTintColor={theme.colors.boxBackground}
                label={({ focused }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: 4,
                          height: 33,
                          marginRight: 26,
                          backgroundColor: focused
                            ? theme.colors.primary
                            : "transparent",
                        }}
                      ></View>
                      <McText
                        bold={focused}
                        size={16}
                        color={theme.colors.text1}
                      >
                        {menu.label}
                      </McText>
                    </View>
                  );
                }}
              ></DrawerItem>
            );
          })}
        </DrawerContentScrollView>

        {/* Footer */}
        <View style={{ marginBottom: 27, marginLeft: 30 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate("SignIn");
            }}
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <McImage
              source={Images.logout}
              style={{ tintColor: theme.colors.text2, marginRight: 8 }}
            />
            <McText bold size={16} color={theme.colors.text2}>
              Logout
            </McText>
          </TouchableOpacity>
          <View style={{ marginTop: 62 }}>
            <McText medium size={10} color={theme.colors.text2}>
              Version 2.0.1
            </McText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.boxBackground,
      }}
    >
      <Drawer.Navigator
        hideStatusBar={true}
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={{
          flex: 1,
          width: "60%",
          backgroundColor: "tranparent",
        }}
        sceneContainerStyle={{
          backgroundColor: "transparent",
        }}
        initialRouteName="Home"
        drawerContent={(props) => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);

          return (
            <CustomDrawerContent navigation={props.navigation} theme={theme} />
          );
        }}
      >
        <Drawer.Screen name="Home">
          {(props) => <Home {...props} animatedStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="Profile">
          {(props) => <Profile {...props} animatedStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="Accounts">
          {(props) => <Accounts {...props} animatedStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="Transactions">
          {(props) => <Transactions {...props} animatedStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="Stats">
          {(props) => <Stats {...props} animatedStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="Settings">
          {(props) => <Settings {...props} animatedStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="Help">
          {(props) => <Help {...props} animatedStyle={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({});
