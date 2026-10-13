import {
  Fira_Code as FontMono,
  Inter as FontSans,
  JetBrains_Mono as FontCode,
  Plus_Jakarta_Sans as FontBrand
} from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono'
})

/** The landing: headings and text. Close to Satoshi, which the brand names. */
export const fontBrand = FontBrand({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-brand'
})

/** The landing: code, JSON and data labels */
export const fontCode = FontCode({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-code'
})
