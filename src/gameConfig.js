import { gameData } from './gameData.js'

export const NODE_TYPES = {
  PAGE: 'page',
  TRUE_ENDING: 'trueEnding',
  FALSE_ENDING: 'falseEnding',
}

export function getNodeType(node) {
  return node.type || NODE_TYPES.PAGE
}

// Fail early when an edited story contains a broken route or invalid ending.
export function validateGameConfig(game) {
  if (!game.nodes?.[game.startNode]) {
    throw new Error(`[${game.id}] startNode "${game.startNode}" does not exist`)
  }

  Object.entries(game.nodes).forEach(([nodeId, node]) => {
    const type = getNodeType(node)
    if (!Object.values(NODE_TYPES).includes(type)) {
      throw new Error(`[${game.id}/${nodeId}] unknown node type "${type}"`)
    }

    if (type === NODE_TYPES.PAGE && !node.actions?.length) {
      throw new Error(`[${game.id}/${nodeId}] a page needs at least one action`)
    }
    if (type !== NODE_TYPES.PAGE && node.actions?.length) {
      throw new Error(`[${game.id}/${nodeId}] ending nodes cannot have actions`)
    }

    node.actions?.forEach(({ next }) => {
      if (!game.nodes[next]) {
        throw new Error(`[${game.id}/${nodeId}] target node "${next}" does not exist`)
      }
    })
  })

  return game
}

Object.values(gameData).filter((game) => game.nodes).forEach(validateGameConfig)
