import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import theme from '../theme';
import ScreenHeader from '../components/Header';
import Tournaments from '../screens/Tournaments';
import TournamentDetails from '../screens/TournamentDetails';
import { ScreenName } from '../types/screenTypes/ScreenName';

const Stack = createStackNavigator();

const headerOptions = {
  headerTitle: () => <ScreenHeader />,
};

const tDetailsOptions = { title: 'Tournament Details' };

function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ScreenName.Tournaments}
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.palette.background.body,
            },
            headerShadowVisible: false,
            headerTintColor: theme.palette.primary.main,
          }}
        >
          <Stack.Screen
            name={ScreenName.Tournaments}
            component={Tournaments}
            options={headerOptions}
          />
          <Stack.Screen
            name={ScreenName.TournamentDetails}
            component={TournamentDetails}
            options={tDetailsOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppNavigator;
