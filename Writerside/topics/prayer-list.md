# Prayer List

The Prayer List lets you save personal prayer intentions that appear automatically during the Prayers & Thanksgivings section of each Daily Office.

## Adding intentions

1. Open the hamburger menu and tap **Prayer List**.
2. Tap **Add** in the top-right corner.
3. Type your intention and tap **Add** (or press Enter).

## Removing intentions

Hover or long-press any item to reveal the **×** remove button.

## How they appear in the office

During Prayers & Thanksgivings, your prayer list items are rendered inline as a personal intercessions section. They are inserted automatically — no action required beyond saving them.

## Storage

Prayer list items are stored in IndexedDB (via the `idb` library) in the `commonprayer` database, `prayer-items` object store. They persist across sessions and survive app updates. They are never synced to a server.

## Limits

There is no enforced limit on the number of items, but very long lists may make the Prayers section unwieldy.
