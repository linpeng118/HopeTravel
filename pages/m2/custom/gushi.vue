<template>
  <div>

    <template v-if="gushi==1">
      <div class="banner1">
        <a class="return"
          @click="back()"
          href="javascript:;"></a>
        <span class="title">旅行故事</span>
        <span class="site">目的地：欧洲</span>
      </div>
      <div class="ct">
        <h5 class="ct_h5">
          一路向北 · 退役空姐的欧洲之旅
        </h5>
        <p class="paragraph">
          <strong>第一站：神秘的阿拉伯国家——阿联酋·迪拜</strong>

          心仪的地方很多，不过选择中东作为这次出行的第一站，是因为从中东转机去往欧洲会非常方便，缩短了从大陆直飞欧洲的
          时间，很符合我想要慢下来的节奏。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story1/1@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          下了飞机，开车前往预定好的酒店Bab Al Shams Desert Resort & Spa（巴卜阿尔沙姆斯沙漠度假村），大部分人一想到迪
          拜酒店，立刻连接到七星级的帆船酒店或者是建于海底的亚特兰蒂斯酒店，足够奢华，但却少了些许迪拜应有的异域特色。
          而mark帮我选的这家度假酒店，传统的阿拉伯风格建筑坐落于沙漠之中，庭院内郁郁葱葱的花园，尤其是伴随着落日的余
          晖，格外美丽。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story1/2@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          日本的感觉和国内真的对比特别明显，感觉所有的人都在尽力保证不去做一些打扰到别人的举动，尤其是搭乘公共交通的时候，打电话是极其不礼貌的举动，所以我都有默默把手机调整成静音。
        </p>
        <p class="paragraph">
          路上熙熙攘攘的上班族，超级干净的马路，配上现代化的建筑，彬彬有礼的服务体验，让你瞬间融入这种环境。
        </p>
        <div>
          <img style="width:100%;margin-top:.2rem;"
            src="../assets/img/custom/story1/3@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          逃离城市，来到酒店躲进这个充满阿拉伯气息的“隐世之地”，酒店清幽的风拂过面庞，扫去沙漠中的热气，整个人都放松下
          来。<br>
          天色渐渐暗了，灯火若隐若现，躺在沙发上抬着头看着天空，有一种陌生又熟悉的感觉，可能是太多次的俯看大地，都快忘
          记抬头仰视这片纯净的星空了。<br>

          <strong>迪拜是一般沙漠一半海水的地方。</strong>

          清晨的沙漠，划过脚背的沙子还有些凉爽，远处的起起伏伏望不到尽头，逐渐与天空贴在一起。
        </p>
        <div>
          <img style="width:100%;margin-top:.2rem;"
            src="../assets/img/custom/story1/4@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          迪拜德拉鱼市场 <br>
          繁华的迪拜是世界的迪拜，与我而言，更愿意追寻真实的迪拜生活。迪拜德拉鱼市场是迪拜很有魅力的文化遗产之一，也是
          我想要记录的回忆之一，据说这个市场要从每天的清晨一直忙碌到深夜，可以说是迪拜最大也是最繁忙的鱼类市场了呢！
          各类新鲜的鱼和蔬菜犹如彩色的万花筒一般有序的成列在喧嚣的市场里。卖鱼的摊主真的非常臭美，又特别喜欢拉人合照，
          熙熙攘攘的市场里，伴随着灵动的各类海鲜、摊主热情的推销，这儿是我见过最有活力的市场，也是最有趣的市场。
        </p>
        <div>
          <img style="width:100%;margin-top:.2rem;"
            src="../assets/img/custom/story1/5@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          迪拜运河<br>
          河水非常清澈的迪拜运河，随处都有海鸥在飞，小船摇摇荡荡就是一圈。河岸两侧分别是新兴的Bur Dubai和象征着迪拜历史
          的旧城区Deira。<br>
          这条河水可以说是迪拜的“母亲河”，迪拜酋长谢赫穆罕默德曾说：“迪拜河塑造了迪拜，成为其经年以来生存、发展和蜕变的
          源泉，它是迪拜的心脏和灵魂。”运河缓缓的流淌，日光铺满两边的建筑，仿佛感受着迪拜的历史脉搏。
        </p>
        <!--<div>-->
        <!--<img style="width:100%;margin-top:.2rem;" src="../assets/img/custom/story1/6@2x.png" alt="">-->
        <!--</div>-->
        <p class="paragraph">
          <strong>第二站：迷幻的派对天堂——西班牙·ibiza</strong>
          西班牙是个很神奇的国度，总会让你来了又想来。这次西班牙之行被种草Ibiza小岛，一直听闻这是一个很美的岛屿，全球最
          浪的岛屿，因为这里有着7*24小时的派对，很像我的管家Mark基本上7*24小时的一直守护我的行程。
        </p>
        <!--<div>-->
        <!--<img style="width:100%;margin-top:.2rem;" src="../assets/img/custom/story1/p7@2x.png" alt="">-->
        <!--</div>-->
        <p class="paragraph">
          Ibiza岛的老城区，保留着西方独有的风情，整个古城都是石砖路和暖黄色的城墙，就好像豆腐块状一样，似乎能够让你触摸
          到它往日的辉煌。如今老城里的房间大多已多是商用，聚集了工艺品店、画廊、珠宝店、服装店、咖啡屋等等，抬头看得见
          阳台种植的小花，特色的店面，独具一格的手工艺品，让老城散发出更迷人的艺术气息，非常值得一逛！
        </p>
        <div>
          <img style="width:100%;margin-top:.2rem;"
            src="../assets/img/custom/story1/p8@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          而这座迷人的老城，也是电音爱好者的圣地。热情洋溢的西班牙永远不缺欢声笑语，而我也相信爱笑的女孩运气一定不会
          差，这里或许缺少繁华和先进，但是这儿满满溢出来的幸福感超越了全世界！
        </p>
        <div>
          <img style="width:100%;margin-top:.2rem;"
            src="../assets/img/custom/story1/p9@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          Ibiza小岛不大，却让我遇见了很多有趣的小伙伴，四处走走，全是颜值爆表身材火辣的帅哥美女，在这儿我只想用力的去享受这种自由的感觉，在这样的海边，尽情的听音乐喝酒，尽情的放纵，什么不去想！
        </p>
        <div>
          <img style="width:100%;margin-top:.2rem;"
            src="../assets/img/custom/story1/p10@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          这个小岛拥有着西班牙人独有的性感狂野，却也清新质朴的让人沉迷。被种草是因为派对王国，被圈粉却也是因为这是一座生机勃勃的古老城市。这样的反差感，让我为之迷恋
        </p>
        <div>
          <img style="width:100%;margin-top:.2rem;"
            src="../assets/img/custom/story1/p11@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          <strong>第三站：浪漫的法兰西——法国·巴黎</strong>

          作为法兰西的心脏和灵魂，巴黎是一座浪漫的城市。塞纳河从城中流过，流过左岸的雅致流过右岸的繁华，徜徉在卢浮宫徘
          徊在凡尔赛，你会有一千种喜欢巴黎的理由。<br>
          海明威说：“如果你年轻时有幸停留巴黎，那么你的余生无论去往哪里，巴黎永远会与你在一起，因为它是一席流动的盛宴”
        </p>
        <div>
          <img style="width:100%;margin-top:.2rem;"
            src="../assets/img/custom/story1/p12@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          第三站：浪漫的法兰西——法国·巴黎 <br>
          老爷车观光之旅<br>
          这一次来巴黎，大部分的时间，想要亲自触碰这个优雅又悠久的城市。我想，没有什么能够比乘坐一款灵活的老爷车穿梭在巴黎的街道，身旁还有一位幽默风趣又绅士的司机小哥，更能体会法国的浪漫风情了。
        </p>
        <div>
          <img style="width:100%;margin-top:.2rem;"
            src="../assets/img/custom/story1/p13@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          这是一个慢节奏的城市，最适合漫步街头，看着人们在铁塔下亲吻，在塞纳河畔消磨午后，在每一个街角相遇，在每一个路
          口你侬我侬。你可以在香榭丽舍大街随意找一家咖啡店，点上一杯咖啡配一块少女心爆棚的马卡龙，阳光洒在复古的建筑
          上，扑面而来的人文气息，这便是巴黎。
        </p>
        <p class="paragraph">
          <strong>第四站——荷兰·阿姆斯特丹</strong>
          旅行就被这样的慢节奏感动了，可能是之前的工作的缘故，每天都特别忙碌，根本没有办法停下里好好的看看这个世界的风
          景。<br>
          在阿姆斯特丹的几天，我感觉这个城市没有什么非常特别的景点，但是哪里都很美，都想要记录下来，复古的欧洲建筑，闲
          逛几步就能看见的运河，很美。于是拿起了相机，印象和记忆交织，最后落于一张张照片，成为我眼中的阿姆斯特丹。
        </p>
        <div>
          <img style="width:100%;margin-top:.2rem;"
            src="../assets/img/custom/story1/p14@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          这一路，走的路线完全随了我的心愿，去的地方吃到的美食看到的风景都是独属于我的旅行，未曾想过会遇见这么多美好的事物，遇见一路上可爱有趣的小伙伴，遇见了更好的自己，我想这一切都从遇见稀饭旅行开始。 <br>

          旅行真的是人生中最美好的事情，没有之一。
        </p>
      </div>
    </template>
    <template v-if="gushi==2">
      <div class="banner2">
        <a class="return"
          @click="back()"
          href="javascript:;"></a>
        <span class="title">旅行故事</span>
        <span class="site">目的地：毛里求斯</span>
      </div>
      <div class="ct">
        <h5 class="ct_h5">
          毛里求斯·从人间天堂的世界路过
        </h5>
        <p class="paragraph">
          <strong>一个人，七天五晚的旅程，很爽。</strong>
          成都出发，去往落地签的毛里求斯。从决定说走就走到最后完成旅程，能如此速度的制定出我想要行程又周到贴心帮我安排玩乐项目，特别感谢稀饭旅行。毛里求斯的机场不大，但透过大厅的玻璃向外面望去，感叹这个被誉为“人间的天堂”真的很美。而这趟旅程过后，触动我的不单单是美景，更多的是这个印度洋上安宁和谐的国度带给我的满满的感动。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p1@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          蓝湾和鹿岛基本上是毛里求斯的必去景点。鹿岛位于毛里求斯东海岸，从国家珊瑚公园的蓝湾乘快艇出海沿着东部海岸线一路向北，穿梭在几座小岛之间，风光简直绝美！蓝湾可以说是毛里求斯最易获取的高品质浮潜区，五彩斑斓的珊瑚躺在海底，小黄鱼回游风暴，还有时不时出现的海龟，总是充满惊喜。在这里能和蓝天、白云、碧水、美女有亲密的接触。恐怕别的景点不会给你提供这样的机会。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p2@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          知道灯塔岛是因为孙俪邓超的电影《分手大师》。<br>
          近距离接触，看着斑驳的墙面，400年历史的灯塔，经过大火的洗礼，让这座在战争中遗留下来的小岛显得有些孤寂和沧桑。但往往被世人遗落的地方必有独特的风光，虽远离尘世，却吸引来了无数的海鸟和海洋中星星点点的贝壳海螺，鸟儿在岛上停歇，分享游客偶尔留下的面包。<br>
          <strong>远海北方三岛</strong>
          乘坐双体帆船从北部码头Grand Baie出发，经过1个多小时的航行去往北方三岛。狭长的拖尾沙滩，清澈的海水，感受到了平岛安静的海岸线。我一直觉得这片海滩被当地人藏起来了，他们视乎有意识的避免让太多游客接触，而我幸运的踏上这片海滩，收下这份礼物。
          <strong>这一趟旅程最刺激的两件事就是深海潜水和荒岛夜宿</strong>
          先说深海潜水，海岛北部聚集着大量的潜水爱好者，多数都是欧洲人，船在一座岛屿的海湾停下，世界各地的潜水爱好着迫切的下海一探究竟。潜水中心都设有8岁以上的青少年及成人的初次潜水训练——一般都是下海之前在泳池训练1-2个小时，完成训练以后，就可以下海了。一般，初次潜水者都会配有随行的潜水教练，所以即使你是初次潜水也是很安全的。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p3@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          换装下水——深度：0米 <br>
          入水的那一刻，便打开了另一个魔幻世界的大门，我心里一边默念这个世界的“规则”，一边慢慢的下潜。<br>
          鱼群回游风暴——深度 15米<br>
          面对不请自来的参与这场海底派对，把自己当成一条鱼， 在珊瑚礁上慢慢游过。<br>
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p4@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          深海洞穴沉船遗迹——深度 25米 <br>
          光线慢慢变暗，海底一个个黝黑的洞穴出现在眼前，心脏猛的跳动一下，感觉海水的温度又低了许多。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p5@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          刚刚开始入水会有些不自然，但是当完全潜下去的时候就好像去到了一个和海面完全不同的世界，就好像是另外一个“星球”。鱼群太壮观了，水族馆中隔着厚重玻璃的场景完全不能比。没有人和你交流，那一刻什么都不想去思考，有的是前所未有的宁静和放松。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p6@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          再来说说，夜宿海岛小屋。每个男孩都有一个冒险的梦，定制师Nate和我说起海岛小屋的安排，我激动不已。不是所有人都能尝试在海岛的旅行之中，有机会放弃豪华酒店，跑到无人的海岛上尽情的撒野。 <br>
          到达小岛的时候，天还没黑，我坐在沙滩上纵情拍照。海风吹来，什么样的心情都不需要，也没有什么烦恼。想起美国著名作家马克‧吐温曾在其旅游文学巨著《赤道漫游记》中写下他的感想：“上帝先创造了毛里求斯，再依照毛里求斯的风景创造天堂。”洁白沙滩、湛蓝海水与浓蓝的天空，三条饱和浓郁的色带拉阔出绝美的风景，这样的天堂实至名归。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p7@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          海岛上有些帐篷和小屋，是一个5星酒店建的偶尔用来接待酒店的出海客人，平时没人使用。终于天色暗沉下来，我和一起的小伙伴开始今夜的重头戏活动——捕龙虾。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p8@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          龙虾总是在晚上出没，漆黑的大海不断的吹来海风，换好脚蹼抬头看着天空中的繁星，感受夜晚海水的冰凉，提起精神急忙追着远去的船员。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p9@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          这个夜晚注定终身难忘。 <br>
          夜晚的海水看起来平静却暗流涌动，拿着手电照向海底，零星的几条鱼躲进珊瑚缝隙中睡觉。我们一行4人由船员Gary负责带头，依次下水。下水后才发现每个船员都游的飞快，我根本无暇东张西望，全力向前游，我可不想一个人被丢弃在海里。
          大概游了30分钟才抵达了目的海域，漆黑的海水在夜空下很难看到海底。大家拿出准备好的射鱼枪，准备下潜。而我也开始调整呼吸放慢心跳，让自己冷静下来，随后就看见一群人就这样消失海面上....
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p10@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          水下很黑，即便有手电也很难看到海底，好在向下游了5米后终于看清海底，继在下潜的过程中，我不断的做耳压平衡，差不多下潜到12米的时候，抵达海底的珊瑚礁区，我基本上已经耗尽全身的力气，更别说开枪射击了。多数时间我都扮演着观众的角色，看着Gary和其他船员在海里穿梭，搜索礁石缝隙。不时稳准狠的开枪射出一箭。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story2/p11@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          虽然我几次浮出水面换气，再往返后我连下到海底都越来越困难，好在同行的伙伴收获颇丰，返回小岛后，马不停蹄的就开启了生火烤龙虾，与我而言这是一段非常难忘的记忆，即使大部分时候扮演一个观众经历这一段，我依然觉得特别满足。<br>
          这是我想要的旅行，我切实感受到大自然的无限魅力。
        </p>
      </div>
    </template>
    <template v-if="gushi==3">
      <div class="banner3">
        <a class="return"
          @click="back()"
          href="javascript:;"></a>
        <span class="title">旅行故事</span>
        <span class="site">目的地：日本</span>
      </div>
      <div class="ct">
        <h5 class="ct_h5">
          青春时期做过的梦，<br>
          都在镰仓的海风里实现
        </h5>
        <p class="paragraph">
          一直就非常想去日本，比起东南亚一些国家，日本签证会稍微麻烦一点。不想跟着旅行大团匆匆忙忙的景点拍照，想要真正的踏实的去追寻属于自己的青春记忆。 <br>
          从成都出发，性价比超高的川航成为首选。计划是从双流机场直飞东京的成田，然后在日本境内做新干线到大阪，最后从大阪返回国内。不得不说，去的时候川航飞机上的小吃零食简直太窝心了，好吃到我差点不想下飞机。
          <strong>【东京篇】</strong>
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p1@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          日本的感觉和国内真的对比特别明显，感觉所有的人都在尽力保证不去做一些打扰到别人的举动，尤其是搭乘公共交通的时候，打电话是极其不礼貌的举动，所以我都有默默把手机调整成静音。 <br>
          路上熙熙攘攘的上班族，超级干净的马路，配上现代化的建筑，彬彬有礼的服务体验，让你瞬间融入这种环境。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p2@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          <strong>作为漫迷，来东京最不能错过的一个地方就是——秋叶原。</strong>
          刚到东京的时候，总觉得看着清清冷冷的街道，会让人有点冷淡的感觉，可以进入秋叶原之后，全部都是迎面而来的卡哇伊！浓浓的二次元风在这里炸裂，满大街都是周边、手办，我要羡慕疯了！在这里买的手办，其实也不一定会比线上平台买的便宜，但是重点是这样琳琅满目都是手办的购物感觉，那种一个个鲜活的的手办就在眼前，比网络上冷冰冰的图片来的更让我这个漫迷激动了！
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p3@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          <strong>富士山可以说是日本必去的景点。</strong>
          富士山，东京附近很多地方都能观赏。作为日本国内的最高峰，被日本誉为“圣岳”，所以选择特别接近富士山的河口湖。尤其是清晨的时候，我看着光亮一点点的漫过山顶照亮了山腰，接着全世界都开始苏醒过来，那一刻内心好平静。<br>
          围绕着河口湖，稀饭旅行的SKY特意推荐我们租了一个自行车骑行河口湖，在湖边骑行，微风飘过，看见美景可以随时停下来拍照，特别有一种小清新的感觉，可惜当时樱花未开，不然整个湖边遍地樱花，更是别有一番风味。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p4@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          <strong>富士山可以说是日本必去的景点。</strong>
          富士山，东京附近很多地方都能观赏。作为日本国内的最高峰，被日本誉为“圣岳”，所以选择特别接近富士山的河口湖。尤其是清晨的时候，我看着光亮一点点的漫过山顶照亮了山腰，接着全世界都开始苏醒过来，那一刻内心好平静。<br>
          围绕着河口湖，稀饭旅行的SKY特意推荐我们租了一个自行车骑行河口湖，在湖边骑行，微风飘过，看见美景可以随时停下来拍照，特别有一种小清新的感觉，可惜当时樱花未开，不然整个湖边遍地樱花，更是别有一番风味。
          <strong>【镰仓篇】</strong>
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p5@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          此次最期待的一站——镰仓。镰仓是神奈川的一个普通小城，但对很多人来说这里就是圣地，于我也是意义非凡。前段时间看了电影《镰仓物语》，一下子就被那熟悉的街景戳中，成为了我这次日本之行的动力之一。 <br>
          来到镰仓，最标志性的建筑估计高德院可以排到榜首，无论你是通过怎么样的交通方式抵达镰仓，都会被一尊大佛吸引眼球，这座镰仓大佛是必去的打卡地之一！其实大佛的内部是空心结构呢，所以游客是可以从佛像的背后的底部进入参观的。<br>
          没有人会拒绝镰仓高校前站这个网红打卡地，就像没有人会拒绝《灌篮高手》一样，虽然我们都知道湘北最后并没有获得全国冠军，可是丝毫不能阻止它在我们青春里的位置。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p6@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          不得不说因为《灌篮高手》，这个平凡的小车站变成了我们这有的漫迷的朝圣地，坐着海边行驶的江之电，我耳机里放着《直到世界尽头》，樱木与晴子打招呼的车站，流川枫骑车路过的海岸，还有镰仓高校(湘北高校原型).....远远眺望着海边的风光，总觉得打破了次元壁，被这个恬静的地方治愈了。
          <strong>【奈良篇】</strong>
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p7@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          大部分去日本玩的朋友都会纠结去关东还是关西，幸运的是我的时间允许，小开心一下。远离东京的繁华，进入关西区域就古都韵味厚重很多，我感觉关西才是日本特色最浓郁的地方。 <br>

          一进入奈良公园，就看见了传说中的神鹿。完全不害怕人们的亲近，很多游客和小鹿拍照，公园大马路上都有梅花鹿的影子，车子一般给梅花鹿让行。游客可以购买鹿饼来喂鹿，一捆鹿饼150日元。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p8@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          需要注意的是，小鹿的性格有可能是非常迥异的，千万不要主观意愿的觉得所有的小鹿都是温柔可爱的，有的还会去抢鹿饼吃。如果你手上有鹿饼，一群鹿就会蜂拥而来，围着你要吃的，你要是不给，它们会咬你的衣服，在你衣服上留下黄褐色的口水。当然这里也有很多可爱的小鹿，拍出来的照片也很有灵气，听说整个奈良，大概有1500多头梅花鹿。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p9@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          <strong>【京都篇】</strong>
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p10@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          京都，是我这次去日本感触最深的城市，虽然是奔着镰仓来的，但是没想到京都的美丽与典雅让我为之着迷。在京都，一套和服是很有必要的。女生穿戴好合服后，一定要在做一个盘发的造型，配一点精美的配饰，这样一装扮就可以在这座很有魅力的城市留下你最美的旅行照片了。
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p11@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          走在京都的小巷种，会让你感觉，恐怕再也没有哪座城市像京都一样拥有如此众多幽静的古刹与神社，惊人的古建密度。但京都又有入世的一面，无论在花见小路与盛装的艺伎擦肩而过，或是观看一场歌舞伎表演，都能让你体会京都的世俗风情。

          <strong> 【大阪篇】</strong>
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p12@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          大阪城公园真的是一个超级大的公园，不过来这个公园主要还是想想看天守阁，位于公园的中间了，天公作美阳光明媚，拍出来的照片都非常美，衬托的建筑格外宏伟！
        </p>
        <div>
          <img style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
            src="../assets/img/custom/story3/p13@2x.png"
            alt="">
        </div>
        <p class="paragraph">
          这一次的日本之旅在大阪画上了句号，原本我是奔着镰仓去圆梦，没有想到被一路日本文化触动，从关东到关西这样的打跨度的旅行行程基本上是随了我自己的心意。<br>
          我想，旅行的意义不是逃避，而是去追逐更多想象意外的世界。<br>
          你永远都不知道，你的自以为是多么幼稚。<br>
          所以，不困于眼前去看看世界多么重要，愿以后还能去更多的地方，看更多的风景！
        </p>
      </div>
    </template>
    <div class="btn_container clearfix">
      <a class="btn_online fl"
        data-ajax="false"
        id="qa-wangqiao-btn">
        <img style="widht:.52rem;height:.52rem;"
          src="../assets/img/custom/btn1.png"
          alt="">
        在线咨询
      </a>
      <router-link :to="{path:'/custom/index'}"
        class="btn_custom fl">
        <img style="widht:.48rem;height:.48rem;"
          src="../assets/img/custom/btn2.png"
          alt="">
        立即定制
      </router-link>
    </div>
  </div>

</template>

<script>
  import "../assets/style/base.css";
//   import $ from 'jquery';

  export default {
    name: "",
    data() {
      return {
        gushi: this.$route.query.gushi,
      };
    },
    created() {
    },
    mounted() {
      //首次渲染钩子
      var this_ = this;
      // $(function(){
      //     var _hmt = _hmt || [];
      //     (function() {
      //         var hm = document.createElement("script");
      //         hm.type = "text/javascript";
      //         hm.charset = "utf-8";
      //         hm.src = "https://hm.baidu.com/hm.js?9bfbbc9f24159633a14d3b4f37db769b";
      //         var s = document.getElementsByTagName("script")[0];
      //         s.parentNode.insertBefore(hm, s);
      //     })();
      //     setTimeout(function () {
      //         $('#qa-wangqiao-btn').on('click', function() {
      //             $('#nb_invite_ok').trigger('click')
      //         })
      //     },500)
      // })
    },
    activated() {
      //缓存页面访问钩子
      //debugger
      this.$store.commit("com_dialogSelect", {
        show: false //关闭弹窗
      });
    },
    methods: {
      back() {
        this.$router.go(-1);//返回上一层
      }

    }
  };
</script>

<style scoped>
  body {
    margin: 0;
    color: #404040;
  }
  .ct img {
    width: 100% !important;
    height: auto !important;
  }
  .banner1 {
    background: url("../assets/img/custom/story1/banner.png") no-repeat center
      center/7.5rem 7.08rem;
    width: 7.5rem;
    height: 7.08rem;
    position: relative;
  }
  .banner2 {
    background: url("../assets/img/custom/story2/banner.png") no-repeat center
      center/7.5rem 7.08rem;
    width: 7.5rem;
    height: 7.08rem;
    position: relative;
  }
  .banner3 {
    background: url("../assets/img/custom/story3/banner.png") no-repeat center
      center/7.5rem 7.08rem;
    width: 7.5rem;
    height: 7.08rem;
    position: relative;
  }
  .return {
    position: absolute;
    top: 0.2rem;
    left: 0rem;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url("../assets/img/custom/back.png") no-repeat center
      center/0.24rem 0.41rem;
  }
  .title {
    position: absolute;
    top: 0.85rem;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    font: 0.34rem/.36rem "";
    color: #fff;
  }
  .site {
    position: absolute;
    bottom: 0.23rem;
    left: 0.3rem;
    display: inline-block;
    width: 2.02rem;
    height: 0.5rem;
    background: #fff;
    opacity: 0.8;
    border-radius: 5px;
    text-align: center;
    font: 0.3rem/.5rem "";
    color: #000;
  }
  .ct {
    padding: 0.14rem 0.32rem;
    position: relative;
    padding-bottom: 1.2rem;
    background: #fff;
  }
  .ct_h5 {
    font: 0.36rem/.46rem "";
    color: #356371;
  }
  .paragraph {
    font: 0.26rem/.4rem "";
    color: #484848;
    margin: 0.1rem 0;
    text-align: justify;
    margin: 0.2rem 0;
  }
  .btn_container {
    width: 7.5rem;
    height: 1rem;
    position: fixed;
    bottom: 0;
    background: #fff;
  }
  .btn_container a {
    width: 3.75rem;
    display: inline-block;
    height: 1rem;
    box-sizing: border-box;
    text-align: center;
  }
  .btn_online {
    color: #5e5e5e !important;
    background: rgb(243, 243, 243);
    font: 0.32rem/1rem "";
  }
  .btn_custom {
    background: #ef9a1a;
    color: #fff !important;
    font: 0.32rem/1rem "";
  }
  .btn_custom img,
  .btn_online img {
    vertical-align: middle !important;
  }
  strong {
    color: #000;
    font-size: 0.28rem;
    margin: 0.2rem 0 0.1rem;
    display: block;
  }
</style>