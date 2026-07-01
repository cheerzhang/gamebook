import { useEffect, useState } from 'react'
import { loadDefaultConfig, validateExternalConfig } from './configLoader.js'
import { localeNames, supportedLocales } from './i18n.js'
import { NODE_TYPES } from './gameConfig.js'
import './Admin.css'

const clone = (value) => structuredClone(value)

function downloadConfig(config) {
  const blob = new Blob([`${JSON.stringify(config, null, 2)}\n`], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'game-config.json'
  link.click()
  URL.revokeObjectURL(url)
}

export default function Admin() {
  const [config, setConfig] = useState(null)
  const [selectedNode, setSelectedNode] = useState('start')
  const [message, setMessage] = useState('')

  useEffect(() => { loadDefaultConfig().then(setConfig).catch((error) => setMessage(error.message)) }, [])

  const update = (mutate) => {
    setConfig((current) => {
      const next = clone(current)
      mutate(next.game)
      return next
    })
    setMessage('有尚未导出的修改')
  }

  const importFile = async (event) => {
    try {
      const next = validateExternalConfig(JSON.parse(await event.target.files[0].text()))
      setConfig(next)
      setSelectedNode(next.game.startNode)
      setMessage('配置已导入')
    } catch (error) {
      setMessage(`导入失败：${error.message}`)
    } finally {
      event.target.value = ''
    }
  }

  const exportFile = () => {
    try {
      validateExternalConfig(config)
      downloadConfig(config)
      setMessage('配置已导出')
    } catch (error) {
      setMessage(`无法导出：${error.message}`)
    }
  }

  if (!config) return <main className="admin-shell"><p>{message || '正在加载配置…'}</p></main>
  const { game } = config
  const node = game.nodes[selectedNode]

  const addNode = () => {
    let index = Object.keys(game.nodes).length + 1
    while (game.nodes[`page${index}`]) index += 1
    const id = `page${index}`
    update((draft) => {
      draft.nodes[id] = {
        type: NODE_TYPES.PAGE,
        content: Object.fromEntries(supportedLocales.map((locale) => [locale, { title: id, text: '', image: '' }])),
        actions: [{ next: draft.startNode, label: { zh: '继续', en: 'Continue', nl: 'Verder' } }],
      }
    })
    setSelectedNode(id)
  }

  const deleteNode = () => {
    if (selectedNode === game.startNode) return setMessage('不能删除游戏第一页')
    const usedBy = Object.entries(game.nodes).find(([, value]) => value.actions.some((action) => action.next === selectedNode))
    if (usedBy) return setMessage(`不能删除：节点 ${usedBy[0]} 仍然跳转到这里`)
    update((draft) => { delete draft.nodes[selectedNode] })
    setSelectedNode(game.startNode)
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div><p className="eyebrow">Gamebook Studio</p><h1>剧情配置后台</h1><p className="admin-message">{message || '修改后请导出 JSON 文件'}</p></div>
        <div className="admin-actions">
          <a href="./">返回游戏</a>
          <label className="admin-button secondary">导入 JSON<input type="file" accept="application/json" onChange={importFile} /></label>
          <button className="admin-button" onClick={exportFile}>导出配置</button>
        </div>
      </header>

      <section className="game-settings admin-panel">
        <label>起始节点<select value={game.startNode} onChange={(event) => update((draft) => { draft.startNode = event.target.value })}>{Object.keys(game.nodes).map((id) => <option key={id}>{id}</option>)}</select></label>
        {supportedLocales.map((locale) => <div className="locale-fields" key={locale}><strong>{localeNames[locale]}</strong><label>游戏名称<input value={game.name[locale]} onChange={(event) => update((draft) => { draft.name[locale] = event.target.value })} /></label><label>游戏简介<input value={game.description[locale]} onChange={(event) => update((draft) => { draft.description[locale] = event.target.value })} /></label></div>)}
      </section>

      <div className="admin-layout">
        <aside className="node-list admin-panel">
          <div className="panel-title"><h2>节点</h2><button onClick={addNode}>＋ 新增</button></div>
          {Object.entries(game.nodes).map(([id, item]) => <button key={id} className={selectedNode === id ? 'selected' : ''} onClick={() => setSelectedNode(id)}><span>{item.content.zh.title || id}</span><small>{id} · {item.type}</small></button>)}
        </aside>

        <section className="node-editor admin-panel">
          <div className="panel-title"><div><h2>{selectedNode}</h2><small>节点 ID 用于跳转，创建后不可修改</small></div><button className="danger" onClick={deleteNode}>删除节点</button></div>
          <label>节点类型<select value={node.type} onChange={(event) => update((draft) => { const item = draft.nodes[selectedNode]; item.type = event.target.value; item.actions = item.type === NODE_TYPES.PAGE && item.actions.length === 0 ? [{ next: draft.startNode, label: { zh: '继续', en: 'Continue', nl: 'Verder' } }] : item.type === NODE_TYPES.PAGE ? item.actions : [] })}><option value={NODE_TYPES.PAGE}>普通跳转页</option><option value={NODE_TYPES.TRUE_ENDING}>真结局（通关动画）</option><option value={NODE_TYPES.FALSE_ENDING}>假结局（回第一页）</option></select></label>

          {supportedLocales.map((locale) => <fieldset key={locale}><legend>{localeNames[locale]}</legend><label>页面标题<input value={node.content[locale].title} onChange={(event) => update((draft) => { draft.nodes[selectedNode].content[locale].title = event.target.value })} /></label><label>剧情正文<textarea rows="7" value={node.content[locale].text} onChange={(event) => update((draft) => { draft.nodes[selectedNode].content[locale].text = event.target.value })} /></label><label>图片或图片描述<input value={node.content[locale].image} onChange={(event) => update((draft) => { draft.nodes[selectedNode].content[locale].image = event.target.value })} /></label></fieldset>)}

          {node.type === NODE_TYPES.PAGE && <div className="route-editor"><div className="panel-title"><h3>跳转按钮</h3><button onClick={() => update((draft) => { draft.nodes[selectedNode].actions.push({ next: draft.startNode, label: { zh: '新选择', en: 'New choice', nl: 'Nieuwe keuze' } }) })}>＋ 添加按钮</button></div>{node.actions.map((action, actionIndex) => <div className="route-card" key={actionIndex}><label>目标节点<select value={action.next} onChange={(event) => update((draft) => { draft.nodes[selectedNode].actions[actionIndex].next = event.target.value })}>{Object.keys(game.nodes).map((id) => <option key={id}>{id}</option>)}</select></label>{supportedLocales.map((locale) => <label key={locale}>{localeNames[locale]}按钮文字<input value={action.label[locale]} onChange={(event) => update((draft) => { draft.nodes[selectedNode].actions[actionIndex].label[locale] = event.target.value })} /></label>)}<button className="danger" disabled={node.actions.length === 1} onClick={() => update((draft) => { draft.nodes[selectedNode].actions.splice(actionIndex, 1) })}>删除按钮</button></div>)}</div>}
        </section>
      </div>
    </main>
  )
}
