import { useMemo, useState, useEffect } from 'react'
import { gameData } from './gameData'
import './App.css'

function App() {
  const [currentGame, setCurrentGame] = useState(null)
  const [currentNode, setCurrentNode] = useState('start')
  const [gamePath, setGamePath] = useState([])
  const [gameStartTime, setGameStartTime] = useState(null)
  const [showSummary, setShowSummary] = useState(false)

  const activeNode = useMemo(() => {
    if (!currentGame) return null
    return gameData[currentGame].nodes[currentNode]
  }, [currentGame, currentNode])

  const isGameEnded = currentNode === 'page15' || currentNode === 'gameEnd'

  const goHome = () => {
    setCurrentGame(null)
    setCurrentNode('start')
    setGamePath([])
    setGameStartTime(null)
    setShowSummary(false)
  }

  const startGame = (gameKey) => {
    setCurrentGame(gameKey)
    setCurrentNode('start')
    setGamePath(['start'])
    setGameStartTime(Date.now())
    setShowSummary(false)
  }

  const handleAction = (next) => {
    if (next === 'home') {
      goHome()
      return
    }
    if (next === 'gameEnd') {
      setShowSummary(true)
      return
    }
    setCurrentNode(next)
    setGamePath([...gamePath, next])
  }

  const getGameDuration = () => {
    if (!gameStartTime) return '0秒'
    const duration = Math.floor((Date.now() - gameStartTime) / 1000)
    if (duration < 60) return `${duration}秒`
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}分${seconds}秒`
  }

  const getGameTitle = () => {
    if (!currentGame) return ''
    return gameData[currentGame].name
  }

  if (!currentGame) {
    return (
      <div className="app-shell">
        <header className="hero-banner">
          <div>
            <p className="eyebrow">Gamebook</p>
            <h1>欢迎来到游戏书世界</h1>
            <p>在这里你可以选择两款精彩互动游戏，开启冒险之旅。</p>
          </div>
        </header>

        <main className="game-grid">
          <article className="game-card">
            <h2>{gameData.lastTrain.name}</h2>
            <p>{gameData.lastTrain.description}</p>
            <button className="play-button" onClick={() => startGame('lastTrain')}>
              进入游戏
            </button>
          </article>

          <article className="game-card">
            <h2>{gameData.shadowValley.name}</h2>
            <p>{gameData.shadowValley.description}</p>
            <button className="play-button" disabled>
              敬请期待
            </button>
          </article>
        </main>
      </div>
    )
  }

  if (showSummary) {
    return (
      <div className="app-shell">
        <section className="ending-section">
          <div className="success-animation">
            <div className="success-circle"></div>
            <div className="success-text">✓</div>
          </div>

          <h1 className="ending-title">恭喜你成功停下列车，走出轮回！</h1>
          <p className="ending-subtitle">游戏已通关</p>

          <div className="summary-card">
            <h2>游戏总结</h2>
            <div className="summary-content">
              <div className="summary-row">
                <span className="summary-label">游戏名称：</span>
                <span className="summary-value">{getGameTitle()}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">访问页数：</span>
                <span className="summary-value">{gamePath.length} 页</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">用时：</span>
                <span className="summary-value">{getGameDuration()}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">游戏路径：</span>
              </div>
              <div className="path-log">
                {gamePath.map((node, idx) => (
                  <div key={idx} className="path-item">
                    <span className="path-number">[{idx + 1}]</span>
                    <span className="path-name">{node}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="play-again-button" onClick={goHome}>
              返回首页继续冒险
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <button className="back-button" onClick={goHome}>
        ← 返回首页
      </button>
      <section className="story-card">
        <div className="story-header">
          <h1>{activeNode.title}</h1>
          <p>{getGameTitle()}</p>
        </div>

        <div className="story-body">
          {activeNode.text && activeNode.text.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
          <div className="story-image">{activeNode.image}</div>
        </div>

        <div className="story-actions">
          {activeNode.actions.map((action) => (
            <button
              key={action.label}
              className="choice-button"
              onClick={() => handleAction(action.next)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App

