# super ethan simulator

> congrats ur 21 kiddo 🧒
> heh... nothin personel️️
> sorry it was over a week late I didn't have time to code for a while

STATUS: Not started

Ok so uh I made this clicker ✌️ **game** ✌️
If for some reason you want to clone and develop it more this is the github repo to do so.

TODO:

- [ ] Pick a vue theme (element was good)
- [x] Create a README
- [ ] Upload to github

Some light documentation (this is mostly for myself):

- There are a few components
  - Clicker(s?)
  - Main UI, profile pic
  - Study/Main action
  - Available things to buy
  - Main menu
  - Maybe the battle scenes?
  - Trophies
- Tracking is done through vue events. Using an event bus (maybe switch to vuex?)
  - Game tick is done for automatic events
  - Clickers set off their own events
  - Other events?
- Currently supporting:
  - Nothing
- Wanting to support:
  - Lose state:
    - Old age?
    - Death?
  - Stats:
    - Like normal RPG stats
    - Silly stats
  - Phases (triggered by stats?):
    - Student -> University -> New York -> God?
    - Study -> Something -> Baking (restaurant) -> Galaxy conquering
  - Battles (Need some way to justify this):
    - Anime characters
      - Death Note Ryuk
      - Death Note Light
      - Devilman Satan
      - Devilman Lower level demons
      - FMAB alchemists
      - FMAB TRUTH (final boss?)
    - Weapons:
      - Related to YFC or traits in some way
      - Elucidator
    - Party members:
      - Cyrus
      - Darren
      - Other YFC
  - Pictures and main states
    - Different progressions like doom guy
    - Different stats get you new ethans (ability to chose? Just change source right?)
- Save states, locally hosted
  - Accessible through my github
- META:
  - Ability to change source code in game?
  - Toke-lang interpreter in-game?
- Wishlist:
  - Webgl graphics sections (like the game-game on ng)
  - WASM elements (I'm learning rust anyways, right?)

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```
