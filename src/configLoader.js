import { supportedLocales } from './i18n.js'
import { NODE_TYPES } from './gameConfig.js'

export function validateExternalConfig(config) {
  const game = config?.game
  if (config?.version !== 1 || !game?.id || !game?.nodes || !game.nodes[game.startNode]) {
    throw new Error('Invalid game configuration')
  }

  Object.entries(game.nodes).forEach(([nodeId, node]) => {
    if (!Object.values(NODE_TYPES).includes(node.type)) throw new Error(`${nodeId}: invalid node type`)
    supportedLocales.forEach((locale) => {
      if (!node.content?.[locale]?.title) throw new Error(`${nodeId}: missing ${locale} title`)
    })
    if (node.type === NODE_TYPES.PAGE && !node.actions?.length) throw new Error(`${nodeId}: page needs an action`)
    if (node.type !== NODE_TYPES.PAGE && node.actions?.length) throw new Error(`${nodeId}: endings cannot have actions`)
    node.actions?.forEach((action) => {
      if (!game.nodes[action.next]) throw new Error(`${nodeId}: target ${action.next} does not exist`)
      supportedLocales.forEach((locale) => {
        if (!action.label?.[locale]) throw new Error(`${nodeId}: missing ${locale} action label`)
      })
    })
  })
  return config
}

export async function loadDefaultConfig() {
  const response = await fetch(`${import.meta.env.BASE_URL}game-config.json`, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Unable to load game configuration (${response.status})`)
  return validateExternalConfig(await response.json())
}

export function localizeExternalGame(config, locale) {
  const game = config.game
  return {
    id: game.id,
    startNode: game.startNode,
    name: game.name[locale],
    description: game.description[locale],
    nodes: Object.fromEntries(Object.entries(game.nodes).map(([nodeId, node]) => [nodeId, {
      type: node.type,
      ...node.content[locale],
      actions: node.actions.map((action) => ({ next: action.next, label: action.label[locale] })),
    }])),
  }
}
