import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { CardGrid } from './components/mdx/CardGrid'
import { InfoCard } from './components/mdx/InfoCard'

const themeComponents = getThemeComponents()
const customComponents = { CardGrid, InfoCard }

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...customComponents,
    ...components,
  }
}
