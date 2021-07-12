import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import { ScreenProvider } from 'responsive-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Home from './pages/Home'
import { ThemeProvider } from './styles'

const App: React.FC = () => (
  <>
    <StatusBar
      hidden
    />
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaProvider>
          <ScreenProvider baseFontSize={16}>
            <Home />
          </ScreenProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </SafeAreaView>
  </>
)

export default App
