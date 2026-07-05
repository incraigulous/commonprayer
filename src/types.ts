// Core LDF-aligned types for the Common Prayer app.
// Mirrors @venite/ldf structure without importing the full package at runtime
// since we bundle content as plain JSON.

export type LiturgicalVersion = 'rite-ii' | 'rite-i' | 'eow' | 'daily-devotions'

export type DocType =
  | 'liturgy'
  | 'text'
  | 'rubric'
  | 'responsive'
  | 'psalm'
  | 'bible-reading'
  | 'option'
  | 'heading'
  | 'spacer'

export type TextStyle =
  | 'prayer'
  | 'collect'
  | 'verse'
  | 'creed'
  | 'canticle'
  | 'section'
  | 'response'
  | 'liturgy'

export interface LiturgicalDocument {
  type: DocType
  label?: string
  style?: string
  version?: string
  citation?: string
  hidden?: boolean
  dropCap?: boolean
  value?: unknown
  metadata?: Record<string, unknown>
}

export interface TextDoc extends LiturgicalDocument {
  type: 'text'
  style?: TextStyle
  value: string[]
  response?: string
}

export interface RubricDoc extends LiturgicalDocument {
  type: 'rubric'
  value: string[]
}

export interface HeadingDoc extends LiturgicalDocument {
  type: 'heading'
  value: string[]
}

export interface ResponsiveLine {
  label?: string
  text: string
  bold?: boolean
}

export interface ResponsiveDoc extends LiturgicalDocument {
  type: 'responsive'
  style?: 'responsive' | 'preces' | 'litany' | 'antiphon'
  value: ResponsiveLine[]
}

export interface PsalmVerse {
  number: number
  verse: string
  halfverse?: string
}

export interface PsalmSection {
  label?: string
  localname?: string
  number?: number
  value: PsalmVerse[]
}

export interface PsalmDoc extends LiturgicalDocument {
  type: 'psalm'
  value: PsalmSection[]
}

export interface BibleReadingDoc extends LiturgicalDocument {
  type: 'bible-reading'
  citation: string
  value?: string[]
}

export interface OptionDoc extends LiturgicalDocument {
  type: 'option'
  value: LiturgicalDocument[]
  metadata: { selected: number; label?: string[] }
}

export interface LiturgyDoc extends LiturgicalDocument {
  type: 'liturgy'
  value: LiturgicalDocument[]
}

export type AnyDoc =
  | TextDoc
  | RubricDoc
  | HeadingDoc
  | ResponsiveDoc
  | PsalmDoc
  | BibleReadingDoc
  | OptionDoc
  | LiturgyDoc
  | LiturgicalDocument

// Liturgical calendar types

export type LiturgicalSeason =
  | 'advent'
  | 'christmas'
  | 'epiphany'
  | 'lent'
  | 'holyweek'
  | 'easter'
  | 'pentecost'

export interface LiturgicalDay {
  date: Date
  season: LiturgicalSeason
  weekOfYear: number
  proper?: number          // Proper 1–29 (Pentecost season)
  sundayLectionaryYear: 'A' | 'B' | 'C'
  dailyLectionaryYear: 'one' | 'two'
  holy?: string            // Feast name if a holy day
  displayName: string      // e.g. "The Sixth Sunday after Pentecost"
  subtitle?: string        // e.g. "Proper 9"
}

export interface DailyReadings {
  morning: { psalms: string[]; ot: string; nt: string }
  evening: { psalms: string[]; ot: string; nt: string }
}

export interface Settings {
  version: LiturgicalVersion
  vigil: boolean
  angelus: 'none' | 'morning' | 'noon' | 'evening' | 'all'
  gloriaPatri: boolean
  minorFeastCollects: boolean
  hasCompletedOnboarding: boolean
}

export interface PrayerItem {
  id: string
  text: string
  createdAt: number
}

export interface Favorite {
  id: string
  liturgy: string
  section: string
  text: string
  createdAt: number
}
