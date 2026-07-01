import { useEffect, useMemo, useState } from 'react'
import { detectLocale, getGameData, localeNames, supportedLocales, ui } from './i18n.js'
import { getNodeType, NODE_TYPES } from './gameConfig.js'
import { loadDefaultConfig, localizeExternalGame, validateExternalConfig } from './configLoader.js'
import './App.css'

function LanguageSwitcher({ locale, onChange }) {
  return (
    <div className="language-switcher" role="group" aria-label={ui[locale].language}>
      {supportedLocales.map((code) => (
        <button
          key={code}
          type="button"
          className={locale === code ? 'active' : ''}
          aria-pressed={locale === code}
          onClick={() => onChange(code)}
        >
          {localeNames[code]}
        </button>
      ))}
    </div>
  )
}

function App() {
  const [locale, setLocale] = useState(detectLocale)
  const [currentGame, setCurrentGame] = useState(null)
  const [currentNode, setCurrentNode] = useState('start')
  const [gamePath, setGamePath] = useState([])
  const [gameStartTime, setGameStartTime] = useState(null)
  const [showSummary, setShowSummary] = useState(false)
  const [externalConfig, setExternalConfig] = useState(null)
  const [configError, setConfigError] = useState('')

  const copy = ui[locale]
  const localizedGameData = useMemo(() => {
    const builtIn = getGameData(locale)
    return externalConfig ? { ...builtIn, lastTrain: localizeExternalGame(externalConfig, locale) } : builtIn
  }, [externalConfig, locale])
  const activeNode = currentGame ? localizedGameData[currentGame].nodes[currentNode] : null
  const activeNodeType = activeNode ? getNodeType(activeNode) : null

  useEffect(() => {
    localStorage.setItem('gamebook-locale', locale)
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale
    document.title = locale === 'zh' ? '游戏书' : 'Gamebook'
  }, [locale])

  useEffect(() => {
    loadDefaultConfig().then(setExternalConfig).catch((error) => setConfigError(error.message))
  }, [])

  const importConfig = async (event) => {
    try {
      const imported = validateExternalConfig(JSON.parse(await event.target.files[0].text()))
      goHome()
      setExternalConfig(imported)
      setConfigError('')
    } catch (error) {
      setConfigError(error.message)
    } finally {
      event.target.value = ''
    }
  }

  const goHome = () => {
    setCurrentGame(null)
    setCurrentNode('start')
    setGamePath([])
    setGameStartTime(null)
    setShowSummary(false)
  }

  const startGame = (gameKey) => {
    const startNode = localizedGameData[gameKey].startNode
    setCurrentGame(gameKey)
    setCurrentNode(startNode)
    setGamePath([startNode])
    setGameStartTime(Date.now())
    setShowSummary(false)
  }

  const handleAction = (next) => {
    const nextNode = localizedGameData[currentGame].nodes[next]
    setCurrentNode(next)
    setGamePath((path) => [...path, next])
    if (getNodeType(nextNode) === NODE_TYPES.TRUE_ENDING) setShowSummary(true)
  }

  const restartGame = () => {
    const startNode = localizedGameData[currentGame].startNode
    setCurrentNode(startNode)
    setGamePath([startNode])
    setGameStartTime(Date.now())
  }

  const getGameDuration = () => {
    if (!gameStartTime) return `0${copy.secondUnit}`
    const duration = Math.floor((Date.now() - gameStartTime) / 1000)
    if (duration < 60) return `${duration}${copy.secondUnit}`
    return `${Math.floor(duration / 60)}${copy.minuteUnit} ${duration % 60}${copy.secondUnit}`
  }

  const gameTitle = currentGame ? localizedGameData[currentGame].name : ''

  if (!currentGame) {
    return (
      <div className="app-shell">
        <div className="toolbar home-toolbar">
          <div className="config-tools">
            <label className="config-import">{copy.importConfig}<input type="file" accept="application/json" onChange={importConfig} /></label>
            <a className="admin-link" href="#admin">Gamebook Studio</a>
          </div>
          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>
        {configError && <p className="config-error">{copy.configError}: {configError}</p>}
        <header className="hero-banner">
          <div>
            <p className="eyebrow">Gamebook</p>
            <h1>{copy.welcome}</h1>
            <p>{copy.intro}</p>
          </div>
        </header>

        <main className="game-grid">
          <article className="game-card">
            <h2>{localizedGameData.lastTrain.name}</h2>
            <p>{localizedGameData.lastTrain.description}</p>
            <button className="play-button" onClick={() => startGame('lastTrain')}>{copy.play}</button>
          </article>
          <article className="game-card">
            <h2>{localizedGameData.shadowValley.name}</h2>
            <p>{localizedGameData.shadowValley.description}</p>
            <button className="play-button" disabled>{copy.comingSoon}</button>
          </article>
        </main>
      </div>
    )
  }

  if (showSummary) {
    return (
      <div className="app-shell">
        <div className="toolbar"><LanguageSwitcher locale={locale} onChange={setLocale} /></div>
        <section className="ending-section">
          <div className="success-animation" aria-hidden="true">
            <div className="success-circle"></div><div className="success-text">✓</div>
          </div>
          <h1 className="ending-title">{copy.endingTitle}</h1>
          <p className="ending-subtitle">{copy.completed}</p>
          <div className="summary-card">
            <div className="ending-copy">
              <h2>{activeNode.title}</h2>
              {activeNode.text.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            <h2>{copy.summary}</h2>
            <div className="summary-content">
              <div className="summary-row"><span className="summary-label">{copy.gameName}</span><span className="summary-value">{gameTitle}</span></div>
              <div className="summary-row"><span className="summary-label">{copy.pagesVisited}</span><span className="summary-value">{gamePath.length} {copy.pageUnit}</span></div>
              <div className="summary-row"><span className="summary-label">{copy.duration}</span><span className="summary-value">{getGameDuration()}</span></div>
              <div className="summary-row"><span className="summary-label">{copy.path}</span></div>
              <div className="path-log">
                {gamePath.map((node, index) => <div key={`${node}-${index}`} className="path-item"><span className="path-number">[{index + 1}]</span><span className="path-name">{localizedGameData[currentGame].nodes[node]?.title || node}</span></div>)}
              </div>
            </div>
            <button className="play-again-button" onClick={goHome}>{copy.playAgain}</button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="toolbar story-toolbar">
        <button className="back-button" onClick={goHome}>{copy.back}</button>
        <LanguageSwitcher locale={locale} onChange={setLocale} />
      </div>
      <section className="story-card">
        <div className="story-header"><h1>{activeNode.title}</h1><p>{gameTitle}</p></div>
        <div className="story-body">
          {activeNode.text && activeNode.text.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <div className="story-image">{activeNode.image}</div>
        </div>
        <div className="story-actions">
          {activeNodeType === NODE_TYPES.FALSE_ENDING
            ? <button className="choice-button" onClick={restartGame}>{copy.restart}</button>
            : activeNode.actions.map((action) => <button key={`${action.next}-${action.label}`} className="choice-button" onClick={() => handleAction(action.next)}>{action.label}</button>)}
        </div>
      </section>
    </div>
  )
}

export default App
