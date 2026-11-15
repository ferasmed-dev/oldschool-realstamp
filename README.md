# Old School Pub · Digital stamp card (real version)

Live: https://ferasmed-dev.github.io/oldschool-realstamp/
Owner page: https://ferasmed-dev.github.io/oldschool-realstamp/owner.html

There is no demo mode and no example data: every stamp, customer and number comes from the
Supabase database.

| File | What it is |
|---|---|
| `index.html` | Student card: sign up, "I already have a card", staff stamp/reward with a PIN, install guide |
| `owner.html` | Owner page: visits per night, customers (regulars, inactive 14+ days, reward ready), CSV, monthly report, QR poster, settings, delete a customer |
| `supabase.sql` | The whole database: tables, security and functions. Run it once |
| `config.js` | Supabase URL + anon key |

## Status
Database set up on Supabase project `zslyuvbewbeaxvalqokr` (schema applied and tested, PINs set).
PINs are never stored in this repo.

## Setup (for a new project)
1. Supabase: **New project** (EU region).
2. **SQL Editor →** paste `supabase.sql` → **Run**.
3. Set the PINs (the file starts with random, unusable ones):
   ```sql
   update bars set
     staff_pin_hash = extensions.crypt('NEW_STAFF_PIN', extensions.gen_salt('bf')),
     owner_pin_hash = extensions.crypt('NEW_OWNER_PIN', extensions.gen_salt('bf'))
   where slug = 'old-school';
   ```
4. Put the Project URL and anon key in `config.js` and push.
5. GitHub **Settings → Pages → main / root**.

## How data is kept
- Stamps live in the database. The phone only remembers which card is theirs.
- If a phone loses it (new phone, cleared browser, installed to home screen after signing up),
  "I already have a card" + the same phone/email brings the card back with every stamp.
- 1 stamp = 1 visit. A 3-hour wait stops double stamps on the same night. Each night counts until 6:00.
- 8 wrong PINs in 10 minutes locks PIN entry for 10 minutes.
- Students can't read or change the tables directly; the app only uses its own functions.

## Maintenance
- Monthly backup: Supabase → Table Editor → `cards` and `events` → Export CSV.
- Free Supabase projects pause after a week with no activity (no data is lost; press Restore).
- New bar: copy the `insert into public.bars` line in `supabase.sql` with a new slug, then use
  `index.html?bar=slug` and `owner.html?bar=slug`.
