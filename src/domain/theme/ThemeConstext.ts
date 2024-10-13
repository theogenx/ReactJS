import { createContext } from 'react'
import { Theme } from './Theme'

// TODO: Aus Folie nicht nachvollziehbar
// funktioniert nicht: React.createContext({
export const ThemeContext = createContext<Theme>({
    primaryColor: 'stealblue',
    setPrimaryColor: () => {}
})