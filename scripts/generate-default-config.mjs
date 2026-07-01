import { mkdir, writeFile } from 'node:fs/promises'
import { gameData } from '../src/gameData.js'
import { getGameData, supportedLocales } from '../src/i18n.js'

const game = gameData.lastTrain
const localized = Object.fromEntries(supportedLocales.map((locale) => [locale, getGameData(locale).lastTrain]))

const config = {
  version: 1,
  game: {
    id: game.id,
    startNode: game.startNode,
    name: Object.fromEntries(supportedLocales.map((locale) => [locale, localized[locale].name])),
    description: Object.fromEntries(supportedLocales.map((locale) => [locale, localized[locale].description])),
    nodes: Object.fromEntries(Object.entries(game.nodes).map(([nodeId, node]) => [nodeId, {
      type: node.type || 'page',
      content: Object.fromEntries(supportedLocales.map((locale) => {
        const translated = localized[locale].nodes[nodeId]
        return [locale, { title: translated.title, text: translated.text, image: translated.image }]
      })),
      actions: node.actions.map((action, index) => ({
        next: action.next,
        label: Object.fromEntries(supportedLocales.map((locale) => [locale, localized[locale].nodes[nodeId].actions[index].label])),
      })),
    }])),
  },
}

await mkdir(new URL('../public/', import.meta.url), { recursive: true })
await writeFile(new URL('../public/game-config.json', import.meta.url), `${JSON.stringify(config, null, 2)}\n`)
