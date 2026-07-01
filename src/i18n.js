import { gameData } from './gameData.js'

export const supportedLocales = ['zh', 'en', 'nl']

export const localeNames = {
  zh: '中文',
  en: 'English',
  nl: 'Nederlands',
}

export const ui = {
  zh: {
    welcome: '欢迎来到游戏书世界',
    intro: '在这里你可以选择两款精彩互动游戏，开启冒险之旅。',
    play: '进入游戏', comingSoon: '敬请期待', back: '← 返回首页',
    endingTitle: '恭喜你成功停下列车，走出轮回！', completed: '游戏已通关', summary: '游戏总结',
    gameName: '游戏名称：', pagesVisited: '访问页数：', duration: '用时：', path: '游戏路径：',
    pageUnit: '页', secondUnit: '秒', minuteUnit: '分', playAgain: '返回首页继续冒险', restart: '回到第一页', language: '语言', importConfig: '导入游戏配置', configError: '配置加载失败',
  },
  en: {
    welcome: 'Welcome to the world of gamebooks', intro: 'Choose an interactive story and set out on an adventure.',
    play: 'Play game', comingSoon: 'Coming soon', back: '← Back to home',
    endingTitle: 'Congratulations! You stopped the train and broke the cycle!', completed: 'Game completed', summary: 'Game summary',
    gameName: 'Game:', pagesVisited: 'Pages visited:', duration: 'Time:', path: 'Path:',
    pageUnit: 'pages', secondUnit: 's', minuteUnit: 'm', playAgain: 'Return home and keep exploring', restart: 'Return to page one', language: 'Language', importConfig: 'Import game config', configError: 'Configuration failed to load',
  },
  nl: {
    welcome: 'Welkom in de wereld van gamebooks', intro: 'Kies een interactief verhaal en begin aan je avontuur.',
    play: 'Spelen', comingSoon: 'Binnenkort', back: '← Terug naar home',
    endingTitle: 'Gefeliciteerd! Je hebt de trein gestopt en de cyclus doorbroken!', completed: 'Spel voltooid', summary: 'Speloverzicht',
    gameName: 'Spel:', pagesVisited: "Bezochte pagina's:", duration: 'Tijd:', path: 'Route:',
    pageUnit: "pagina's", secondUnit: 's', minuteUnit: 'm', playAgain: 'Terug naar home en verder spelen', restart: 'Terug naar pagina één', language: 'Taal', importConfig: 'Spelconfiguratie importeren', configError: 'Configuratie kon niet worden geladen',
  },
}

const translations = {
  en: {
    games: {
      lastTrain: ['The Last Train', 'Travel through the last train of the night and uncover the secrets hidden inside.'],
      shadowValley: ['The Secret of Shadow Valley', 'A collapsed magic mine awaits your exploration and puzzles.'],
    },
    nodes: {
      start: ['Page One', 'You board a train late at night.\n\nThe announcement says:\n“Estimated arrival: in 16 hours.”\n\nYou have barely sat down when you notice a small black booklet under your seat.\n\nIts cover reads:\n“Do not open the last page.”', '', ['A: Open the book', 'B: Give the book to the conductor']],
      carriage: ['Whispers in the Carriage', 'You sit by the window as the train starts moving. The stranger opposite looks up at you with a faint smile, but says nothing.', 'A mysterious stranger with deep-set eyes beneath the dim yellow light.', ['Talk to him', 'Pretend to sleep']],
      leave: ['Choosing to Leave', 'You turn away from the station. The night wind blows and your footsteps grow lonelier. In the distance, wheels suddenly rumble as the last train vanishes into the dark.', 'An empty platform with nothing but neon light and cold wind.', ['Turn back', 'Keep walking']],
      talk: ['A Fragment of Truth', 'The stranger whispers, “Do not trust the shadows outside. The real danger is behind you.” He hands you a note bearing a string of coordinates.', 'The note shimmers beneath the light, its writing barely visible.', ['Read the note', 'Ignore the warning']],
      sleep: ['Nightmares and Rails', 'You pretend to sleep, lulled by the swaying train. The carriage suddenly jolts. Beyond the window is pure darkness, as though someone is watching you.', 'Your eyes are closed, but you feel someone approaching from behind.', ['Open your eyes', 'Keep sleeping']],
      note: ['A Hidden Clue', 'The coordinates point to an abandoned factory at the edge of the city. Your heart races as you realise this train is more dangerous than you thought.', 'Crooked writing covers the yellowed note, as if someone tried to conceal it.', ['Press on', 'Get off and escape']],
      page2: ['Page Two', 'Welcome back.\n\nThe lights go out for one second.\nWhen they return, an old man is sitting opposite you.\n\nHe smiles. “You finally came?”', '', ['A: Ask: Who are you?', 'B: Remain silent']],
      page3: ['Page Three', 'The old man says:\n“I have waited for you for many years.”\n\nHe takes out a coin and places it in your hand.\n“If you trust me, get off now.”\n\nOutside, the train passes through thick fog.\n\nAnnouncement:\n“This train will not stop at any station.”', '', ['A: Trust the old man', 'B: Do not trust him']],
      page4: ['Page Four', 'The old man sighs.\n“Then it is too late.”\n\nAs soon as he finishes speaking, he disappears.\n\nA sheet of paper now lies on your seat.\n\nIt reads:\n“Do not fall asleep.”', '', ['A: Keep reading', 'B: Crumple it up']],
      page5: ['Page Five', 'You do not answer. The old man says nothing more.\n\nA minute later, he slowly turns transparent.\n\nAt last, you are alone in the entire carriage.\n\nAnnouncement:\n“Welcome to the final stop.”\nBut the train is still moving at full speed.', '', ['A: Look outside', 'B: Open the black booklet']],
      page6: ['Page Six', 'You crumple up the paper.\n\nTen minutes later, you fall asleep.\n\nWhen you wake, you find yourself sitting on page one.', '', ['Return to page one']],
      page7: ['Page Seven', 'You rush to the door. It actually opens.\n\nOutside there are no tracks, but an old station bathed in moonlight.\n\nThe sign reads:\n【Destination: Yesterday】', '', ['Continue']],
      page11: ['Page Eleven', 'At last you understand.\n\nEvery passenger on the train is you—a version of you from a different point in time.', '', ['Return to page one']],
      page8: ['Page Eight', 'There is another sentence on the back:\n“Do not trust the person holding the coin.”\n\nYou look down. The coin is in your hand.\n\nThe old man is gone.', '', ['Continue']],
      page13: ['Page Thirteen', 'Now you must decide: trust the paper, or trust the old man.\n\nThe old man has disappeared. Paper cannot speak.', '', ['A: Trust the paper', 'B: Trust the old man']],
      page9: ['Page Nine', 'Outside, every part of the landscape is still. Only the train is moving.\n\nThen you realise: the train is not moving forward. The world is moving backward.', '', ['Continue']],
      page12: ['Page Twelve', 'The conductor sees the black book and turns deathly pale.\n\n“How did you get that?”\n\nThen the train brakes sharply.\n\nThe entire carriage disappears.', '', ['Return to page one']],
      page10: ['Page Ten', 'The second page of the black booklet contains only one sentence:\n\n“In the sixteenth hour, you will remember everything.”', '', ['Continue']],
      page14: ['Page Fourteen', 'You throw the coin out of the window. The entire train begins to shake.\n\nAnnouncement:\n“The cycle has been broken.”\n\nFor the first time, the train stops.', '', ['A: Open the paper', 'B: Do not open it']],
      page15: ['Page Fifteen', 'You begin to remember.\n\nThis is actually the 38th time you have taken this train.\n\nEach time, you lose your memory.\n\nAnd the final page is still sealed.', '', ['View game summary']],
      page16: ['Page Sixteen', 'The final page contains only one sentence:\n\n“The next reader is you on page one.”', '', ['Return to page one and keep searching']],
      find: ['On the Edge of Truth', 'You follow the clue. As the train passes through a tunnel, a figure briefly flashes ahead. This is no ordinary train journey.', 'A dark figure flickers deep inside the tunnel.', ['Call out', 'Stay quiet']],
      confront: ['Before the Confrontation', 'You rush through the door and see a shadow vanish beyond the traffic. Your adventure has only just begun.', 'The night and the train’s tail lights form long red streaks.', ['Go to the next chapter']],
      endNight: ['The End of Night', 'The train enters the dawn and your story pauses here. Tomorrow, another secret may be waiting.', 'Dawn breaks in the distance as the wheels roll on.', ['Return home']],
    },
  },
  nl: {
    games: {
      lastTrain: ['De laatste trein', 'Reis mee met de laatste nachttrein en ontrafel de geheimen in de coupés.'],
      shadowValley: ['Het geheim van de Schaduwvallei', 'Een ingestorte magische mijn wacht om verkend te worden.'],
    },
    nodes: {
      start: ['Pagina één', 'Je stapt laat op de avond in een trein.\n\nDe omroep zegt:\n„Verwachte aankomst: over 16 uur.”\n\nJe zit nog maar net als je onder je stoel een klein zwart boekje ziet.\n\nOp de kaft staat:\n„Open de laatste pagina niet.”', '', ['A: Open het boek', 'B: Geef het boek aan de conducteur']],
      carriage: ['Gefluister in de coupé', 'Je zit bij het raam wanneer de trein vertrekt. De vreemdeling tegenover je kijkt glimlachend op, maar zegt niets.', 'Een mysterieuze vreemdeling met een diepe blik in het gedempte gele licht.', ['Praat met hem', 'Doe alsof je slaapt']],
      leave: ['Vertrekken', 'Je keert het station de rug toe. De nachtwind waait en je voetstappen klinken steeds eenzamer. Dan hoor je in de verte wielen en verdwijnt de laatste trein in het donker.', 'Een leeg perron met alleen neonlicht en koude wind.', ['Ga terug', 'Loop verder']],
      talk: ['Een stukje van de waarheid', 'De vreemdeling fluistert: „Vertrouw de schaduwen buiten niet. Het echte gevaar is achter je.” Hij geeft je een briefje met coördinaten.', 'Het briefje glinstert in het licht; de tekst is nauwelijks zichtbaar.', ['Lees het briefje', 'Negeer de waarschuwing']],
      sleep: ['Nachtmerries en rails', 'Je doet alsof je slaapt en raakt versuft door het schommelen. De coupé schokt plotseling. Buiten is alles donker, alsof iemand je bekijkt.', 'Met gesloten ogen voel je iemand van achteren naderen.', ['Open je ogen', 'Blijf slapen']],
      note: ['Een verborgen aanwijzing', 'De coördinaten wijzen naar een verlaten fabriek aan de rand van de stad. Je hart bonst: deze trein is gevaarlijker dan je dacht.', 'Scheve letters staan op het vergeelde briefje, alsof iemand ze wilde verbergen.', ['Ga verder', 'Stap uit en vlucht']],
      page2: ['Pagina twee', 'Welkom terug.\n\nHet licht gaat één seconde uit. Wanneer het weer aangaat, zit er een oude man tegenover je.\n\nHij glimlacht. „Daar ben je eindelijk?”', '', ['A: Vraag: Wie bent u?', 'B: Blijf stil']],
      page3: ['Pagina drie', 'De oude man zegt:\n„Ik wacht al jaren op je.”\n\nHij legt een munt in je hand.\n„Als je me vertrouwt, stap dan nu uit.”\n\nDe trein rijdt door dichte mist.\n\nOmroep:\n„Deze trein stopt op geen enkel station.”', '', ['A: Vertrouw de oude man', 'B: Vertrouw hem niet']],
      page4: ['Pagina vier', 'De oude man zucht.\n„Dan is het te laat.”\n\nZodra hij is uitgesproken, verdwijnt hij.\n\nOp je stoel ligt nu een vel papier.\n\nEr staat:\n„Val niet in slaap.”', '', ['A: Lees verder', 'B: Verfrommel het']],
      page5: ['Pagina vijf', 'Je antwoordt niet. De oude man zegt niets meer.\n\nEen minuut later wordt hij langzaam doorzichtig.\n\nUiteindelijk ben je alleen in de hele coupé.\n\nOmroep:\n„Welkom bij de eindhalte.”\nMaar de trein rijdt nog op volle snelheid.', '', ['A: Kijk naar buiten', 'B: Open het zwarte boekje']],
      page6: ['Pagina zes', 'Je verfrommelt het papier.\n\nTien minuten later val je in slaap.\n\nWanneer je wakker wordt, zit je weer op pagina één.', '', ['Terug naar pagina één']],
      page7: ['Pagina zeven', 'Je rent naar de deur. Hij gaat echt open.\n\nBuiten liggen geen rails, maar staat een oud station in het maanlicht.\n\nOp het bord staat:\n【Bestemming: gisteren】', '', ['Verder']],
      page11: ['Pagina elf', 'Eindelijk begrijp je het.\n\nElke passagier in de trein ben jij—een versie van jou uit een ander moment.', '', ['Terug naar pagina één']],
      page8: ['Pagina acht', 'Op de achterkant staat nog een zin:\n„Vertrouw degene met de munt niet.”\n\nJe kijkt omlaag. De munt ligt in je hand.\n\nDe oude man is verdwenen.', '', ['Verder']],
      page13: ['Pagina dertien', 'Nu moet je kiezen: vertrouw je het papier of de oude man?\n\nDe oude man is verdwenen. Papier kan niet praten.', '', ['A: Vertrouw het papier', 'B: Vertrouw de oude man']],
      page9: ['Pagina negen', 'Buiten staat het hele landschap stil. Alleen de trein beweegt.\n\nDan besef je: de trein gaat niet vooruit. De wereld gaat achteruit.', '', ['Verder']],
      page12: ['Pagina twaalf', 'De conducteur ziet het zwarte boek en wordt lijkbleek.\n\n„Hoe kom je daaraan?”\n\nDan remt de trein abrupt.\n\nDe hele coupé verdwijnt.', '', ['Terug naar pagina één']],
      page10: ['Pagina tien', 'Op de tweede pagina van het zwarte boekje staat maar één zin:\n\n„In het zestiende uur zul je je alles herinneren.”', '', ['Verder']],
      page14: ['Pagina veertien', 'Je gooit de munt uit het raam. De hele trein begint te schudden.\n\nOmroep:\n„De cyclus is doorbroken.”\n\nVoor het eerst stopt de trein.', '', ['A: Open het papier', 'B: Open het niet']],
      page15: ['Pagina vijftien', 'Je begint het je te herinneren.\n\nDit is de 38e keer dat je deze trein neemt.\n\nElke keer verlies je je geheugen.\n\nEn de laatste pagina is nog steeds verzegeld.', '', ['Bekijk het speloverzicht']],
      page16: ['Pagina zestien', 'Op de laatste pagina staat maar één zin:\n\n„De volgende lezer ben jij op pagina één.”', '', ['Terug naar pagina één en verder zoeken']],
      find: ['Op de rand van de waarheid', 'Je volgt de aanwijzing. In een tunnel flitst er even een gestalte voor je. Dit is geen gewone treinreis.', 'Diep in de tunnel flitst een donkere gestalte voorbij.', ['Roep de persoon', 'Blijf stil']],
      confront: ['Voor de confrontatie', 'Je stormt door de deur en ziet een schaduw achter het verkeer verdwijnen. Je avontuur is pas net begonnen.', 'De nacht en de achterlichten vormen lange rode strepen.', ['Naar het volgende hoofdstuk']],
      endNight: ['Het einde van de nacht', 'De trein rijdt de dageraad binnen en je verhaal pauzeert hier. Morgen wacht er misschien een nieuw geheim.', 'In de verte breekt de dag aan terwijl de wielen doordraaien.', ['Terug naar home']],
    },
  },
}

export function detectLocale() {
  const saved = localStorage.getItem('gamebook-locale')
  if (supportedLocales.includes(saved)) return saved
  const browserLocale = navigator.languages?.[0] || navigator.language || 'en'
  const shortLocale = browserLocale.toLowerCase().split('-')[0]
  return supportedLocales.includes(shortLocale) ? shortLocale : 'en'
}

export function getGameData(locale) {
  if (locale === 'zh') return gameData
  const translation = translations[locale]
  return Object.fromEntries(Object.entries(gameData).map(([gameKey, game]) => {
    const [name, description] = translation.games[gameKey]
    if (!game.nodes) return [gameKey, { ...game, name, description }]
    const nodes = Object.fromEntries(Object.entries(game.nodes).map(([nodeKey, node]) => {
      const [title, text, image, labels] = translation.nodes[nodeKey]
      return [nodeKey, {
        ...node, title, text, image,
        actions: node.actions.map((action, index) => ({ ...action, label: labels[index] })),
      }]
    }))
    return [gameKey, { ...game, name, description, nodes }]
  }))
}
