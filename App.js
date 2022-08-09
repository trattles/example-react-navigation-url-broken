import {
  NavigationContainer,
  useNavigationContainerRef,
  useRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const linking = {
  prefixes: [],
  config: {
    screens: {
      TestHome: "",
      TestHomeParams: {
        initialRouteName: "Deep",
        path: "deep/under",
        screens: {
          Deep: "",
          DeepPartTwo: "partTwo/:params",
        },
      },
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <View>
        <Text>hi there</Text>
      </View>
      <BaseNavigator />
    </NavigationContainer>
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

const Stack = createStackNavigator();
const BaseNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TestHome">
      <Stack.Screen
        name={"TestHome"}
        component={FakeScreenComponent}
        options={{ headerShown: false, title: "Whoosh" }}
      />
      <Stack.Screen
        name={"TestHomeParams"}
        component={NestedNavigator}
        options={{ headerShown: false, title: "Whoosh" }}
      />
    </Stack.Navigator>
  );
};

const Stack2 = createStackNavigator();
const NestedNavigator = () => {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (!state) {
      setState(state);
    }
  }, [state, setState]);
  return (
    <Stack2.Navigator initialRouteName="Deep">
      <Stack2.Screen
        name={"Deep"}
        component={FakeScreenComponent}
        options={{ headerShown: false, title: "Whoosh" }}
      />
      {state && (
        <Stack2.Screen
          name={"DeepPartTwo"}
          component={FakeScreenComponent}
          options={{ headerShown: false, title: "Whoosh" }}
        />
      )}
    </Stack2.Navigator>
  );
};

const FakeScreenComponent = () => {
  const route = useRoute();
  return (
    <View>
      <Text>Screen Component - {route.name}</Text>
    </View>
  );
};
