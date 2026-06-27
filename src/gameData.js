export const gameData = {
  lastTrain: {
    id: 'lastTrain',
    name: '最后一班列车',
    description: '穿越深夜末班车，揭开车厢里隐藏的秘密。',
    nodes: {
      start: {
        title: '第一页',
        text: '你登上一辆夜晚的列车。\n\n列车广播：\n"预计到站：16小时后。"\n\n刚坐下。\n你发现座位下面。\n有一本黑色的小册子。\n\n封面写着：\n"不要翻开最后一页。"',
        image: '',
        actions: [
          { label: 'A: 打开书', next: 'page2' },
          { label: 'B: 把书交给乘务员', next: 'page12' },
        ],
      },
      carriage: {
        title: '车厢里的低语',
        text: '你坐在靠窗的位置，列车开始行驶。对面座位上的陌生人抬眼看你，嘴角含笑，却没有开口。',
        image: '一名气质神秘的陌生人，昏黄灯光下目光深邃。',
        actions: [
          { label: '与他交谈', next: 'talk' },
          { label: '装作睡觉', next: 'sleep' },
        ],
      },
      leave: {
        title: '选择离开',
        text: '你转身离开车站，夜风吹过，你的脚步越来越孤单。突然远处传来车轮声，末班车消失在黑暗里。',
        image: '空荡的站台，只剩下霓虹与冷风。',
        actions: [
          { label: '后悔回头', next: 'carriage' },
          { label: '继续前行', next: 'endNight' },
        ],
      },
      talk: {
        title: '真相的片段',
        text: '陌生人低语："不要相信窗外的影子，真正的危险在你的身后。"他递给你一张纸条，上面写着一串坐标。',
        image: '手中的纸条在灯光下闪烁，文字隐约可见。',
        actions: [
          { label: '查看纸条', next: 'note' },
          { label: '忽视提醒', next: 'sleep' },
        ],
      },
      sleep: {
        title: '梦魇与轨道',
        text: '你假装睡着，列车的摇晃让你感到恍惚。车厢突然一震，窗外一片黑暗，仿佛有人在观察你。',
        image: '你闭着眼睛，却感觉有人从背后靠近。',
        actions: [
          { label: '猛然睁眼', next: 'find' },
          { label: '继续沉睡', next: 'endNight' },
        ],
      },
      note: {
        title: '隐藏的线索',
        text: '纸条上的坐标指向城市边缘的一座废弃工厂。你心跳加速，意识到这列车比你想象的更加危险。',
        image: '泛黄纸条上的字迹歪斜，像是被刻意隐藏。',
        actions: [
          { label: '继续前进', next: 'find' },
          { label: '下车逃离', next: 'leave' },
        ],
      },
      page2: {
        title: '第二页',
        text: '欢迎回来。\n\n列车灯灭了一秒。\n再亮起时。\n对面多了一个老人。\n\n他笑着说：「你终于来了？」',
        image: '',
        actions: [
          { label: 'A: 回答： 你是谁？', next: 'page3' },
          { label: 'B: 保持沉默', next: 'page5' },
        ],
      },
      page3: {
        title: '第三页',
        text: '老人说：\n"我已经等你很多年。"\n\n他拿出一枚硬币。\n放到你手里。\n"如果你相信我。现在就下车。"\n\n窗外。\n列车正在穿越一片浓雾。\n\n广播：\n"本次列车不停靠任何车站。"',
        image: '',
        actions: [
          { label: 'A: 相信老人。', next: 'page7' },
          { label: 'B: 不相信。', next: 'page4' },
        ],
      },
      page4: {
        title: '第四页',
        text: '老人叹气。\n"那就太迟了。"\n\n他说完。\n整个人消失。\n\n而你的座位上。\n多了一张纸。\n\n写着：\n"不要睡觉。"',
        image: '',
        actions: [
          { label: 'A: 继续看纸。', next: 'page8' },
          { label: 'B: 揉掉。', next: 'page6' },
        ],
      },
      page5: {
        title: '第五页',
        text: '你没有回答。\n老人也没有再说话。\n\n一分钟后。\n他开始慢慢变透明。\n\n最后。\n整个车厢。\n只剩你一个人。\n\n广播：\n"欢迎来到终点站。"\n但是列车还在高速前进。',
        image: '',
        actions: [
          { label: 'A: 查看窗外。', next: 'page9' },
          { label: 'B: 打开黑色小册子。', next: 'page10' },
        ],
      },
      page6: {
        title: '第六页',
        text: '你把纸揉掉。\n\n十分钟后。\n你睡着了。\n\n醒来时。\n你发现。\n自己坐在第1页。',
        image: '',
        actions: [
          { label: '回到第一页', next: 'start' },
        ],
      },
      page7: {
        title: '第七页',
        text: '你冲向车门。\n门居然开了。\n\n外面不是铁轨。\n而是一座月光下的旧车站。\n\n站牌：\n【终点：昨天。】',
        image: '',
        actions: [
          { label: '继续', next: 'page11' },
        ],
      },
      page11: {
        title: '第十一页',
        text: '你终于知道。\n整辆列车。\n\n所有乘客。\n都是曾经的你。\n\n只是不同时间的你。',
        image: '',
        actions: [
          { label: '回到第一页', next: 'start' },
        ],
      },
      page8: {
        title: '第八页',
        text: '纸背面还有一句：\n"不要相信拿着硬币的人。"\n\n你低头。\n你的手里。\n正拿着那枚硬币。\n\n老人已经不见了。',
        image: '',
        actions: [
          { label: '继续', next: 'page13' },
        ],
      },
      page13: {
        title: '第十三页',
        text: '现在你必须决定。\n相信纸。\n\n还是相信老人。\n\n老人已经消失。\n纸不会说话。',
        image: '',
        actions: [
          { label: 'A: 相信纸。', next: 'page15' },
          { label: 'B: 相信老人。', next: 'page7' },
        ],
      },
      page9: {
        title: '第九页',
        text: '窗外。\n所有风景都是静止的。\n只有列车在移动。\n\n你忽然意识到：\n不是列车在前进。\n而是世界在倒退。',
        image: '',
        actions: [
          { label: '继续', next: 'page11' },
        ],
      },
      page12: {
        title: '第十二页',
        text: '乘务员看到黑书。\n脸色瞬间惨白。\n\n他说：\n"你怎么拿到了这个？"\n\n然后。\n列车急刹。\n\n整节车厢。\n消失。',
        image: '',
        actions: [
          { label: '回到第一页', next: 'start' },
        ],
      },
      page10: {
        title: '第十页',
        text: '小黑册子的第二页。\n只有一句。\n\n"第16小时。\n你会想起一切。"',
        image: '',
        actions: [
          { label: '继续', next: 'page14' },
        ],
      },
      page14: {
        title: '第十四页',
        text: '你把硬币扔出窗外。\n整个列车开始震动。\n\n广播：\n"循环已解除。"\n\n列车第一次停下。',
        image: '',
        actions: [
          { label: 'A: 打开纸。', next: 'page16' },
          { label: 'B: 不打开。', next: 'page11' },
        ],
      },
      page15: {
        title: '第十五页',
        text: '你开始想起。\n\n其实。\n这是你第38次坐这班列车。\n\n只是每一次。\n都会失忆。\n\n而最后一页。\n仍然封着。\n\n',
        image: '',
        actions: [
          { label: '查看通关总结', next: 'gameEnd' },
        ],
        isEnding: true,
      },
      page16: {
        title: '第十六页',
        text: '最后一页。\n只有一句。\n\n"下一位读者，就是第一页的你。"',
        image: '',
        actions: [
          { label: '回到第一页，继续寻找列车的秘密', next: 'gameEnd' },
        ],
        isEnding: true,
      },
      find: {
        title: '真相的边缘',
        text: '你决定追寻线索。列车在隧道中穿行，前方闪过一个短暂的身影。你渐渐感觉这不是一场普通的列车旅程。',
        image: '隧道深处，黑影一闪而过。',
        actions: [
          { label: '呼喊那个人', next: 'confront' },
          { label: '保持安静', next: 'endNight' },
        ],
      },
      confront: {
        title: '对峙前夜',
        text: '你冲出车门，发现一个黑影消失在车流之后。你的冒险才刚刚开始。',
        image: '车门外的夜色与列车尾灯交织成红色长线。',
        actions: [
          { label: '前往下一章', next: 'endNight' },
        ],
      },
      endNight: {
        title: '夜之终点',
        text: '列车驶入黎明时分，你的故事暂时落幕。明天，或许还有另一段秘密等待你。',
        image: '远方破晓，车轮继续前行。',
        actions: [
          { label: '返回首页', next: 'home' },
        ],
      },
    },
  },
  shadowValley: {
    id: 'shadowValley',
    name: '影之谷的秘密',
    description: '坍塌的魔矿正等待你的探索与解谜。',
  },
}
