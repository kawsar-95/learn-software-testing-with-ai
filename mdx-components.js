import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'

const themeComponents = getThemeComponents()
const customComponents = {}

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...customComponents,
    ...components,
  }
}
