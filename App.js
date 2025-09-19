import { createTheme, ThemeProvider } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RNEHeader from './src/components/layout/Header'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RecipesContainer from './src/components/containers/RecipesContainer'
import AppStack from './src/components/stacks/AppStack'

const theme = createTheme({
  lightColors: {
    primary: 'blue'
  },
  darkColors: {
    primary: 'blue'
  },
  component: {
    Button: {
      raised: true
    }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        {/* <RNEHeader /> */}
        {/* <RecipesContainer /> */}
        <AppStack />
        <StatusBar style='light' />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
