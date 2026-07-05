# Liturgical Calendar

The app automatically determines the liturgical season, proper, feast days, and lectionary year for any given date. This drives which opening sentences, collects, and readings appear in the office.

## Seasons

| Season | Dates |
|---|---|
| **Advent** | First Sunday of Advent through December 24 |
| **Christmas** | December 25 through January 5 |
| **Epiphany** | January 6 |
| **Season after Epiphany** | January 7 through the day before Ash Wednesday |
| **Lent** | Ash Wednesday through the Saturday before Palm Sunday |
| **Holy Week** | Palm Sunday through Holy Saturday |
| **Easter** | Easter Day through the Day of Pentecost (inclusive) |
| **Season after Pentecost** | The Monday after Pentecost through the day before Advent |

> **Note:** The Day of Pentecost is classified as Easter season, not as the beginning of Pentecost season. The Season after Pentecost begins the following day.

## First Sunday of Advent

Advent begins on the Sunday nearest to November 30 (St. Andrew's Day). This is computed as:

```
offset = (Nov 30 day-of-week <= 3) ? -day-of-week : 7 - day-of-week
Advent 1 = Nov 30 + offset
```

## Easter (Computus)

Easter is computed using the Gregorian Butcher's algorithm, which gives the correct date for all years the BCP calendar covers.

## Propers

During the Season after Pentecost, each Sunday is assigned a Proper number (1–29). Proper 1 corresponds to the Sunday nearest May 11; each subsequent proper is one week later. The proper number determines which collect and scripture readings are used.

## Lectionary years

**Daily Office lectionary** — a two-year cycle:
- Year One: odd civil years (2025, 2027, …)
- Year Two: even civil years (2026, 2028, …)

**Sunday lectionary** — a three-year cycle (Years A, B, C) beginning on the First Sunday of Advent:
- Year A: civil years where `year % 3 === 1` (2026, 2029, …)
- Year B: civil years where `year % 3 === 2`
- Year C: civil years where `year % 3 === 0`

## Fixed feasts

The app recognizes all Principal Feasts and Holy Days from the BCP calendar, including Christmas, Epiphany, All Saints' Day, and the apostles' days. When a fixed feast falls on a given date, its name is used as the `displayName` for that day.

## Implementation

The calendar logic lives in `src/liturgy/calendar.ts` and is fully unit-tested in `src/liturgy/calendar.test.ts`.
