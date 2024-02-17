import { Context, Schema, h, Logger} from 'koishi'

export const name = 'meal'

export interface Config {
  //json_url: string
}

export const Config: Schema<Config> = Schema.object({
  //json_url: Schema.string().default('https://raw.githubusercontent.com/PoorCha/koishi-plugin-meal/master/menu.json'),
})

//const axios = require('axios');
//const https = require('https');
export const logger = new Logger('meal');

export async function apply(ctx: Context, config: Config) {
  registerCommand(ctx, config);
}

function getStaple(menu) {
  // 抽取主食，这里先抽大类
  const stapleKeys = Object.keys(menu.staples); // 获取大类
  const randomStapleKey = stapleKeys[Math.floor(Math.random() * stapleKeys.length)]; // 抽取一个大类
  const stapleCategory = menu.staples[randomStapleKey];

  // 再抽主食菜品名
  const stapleDishes = stapleCategory.dishes;
  //const randomStapleDish = stapleDishes[Math.floor(Math.random() * stapleDishes.length)].name;

  return stapleDishes[Math.floor(Math.random() * stapleDishes.length)].name;
}

function getMeatDish(menu) {
  // 抽取荤菜
  return menu.meat_dishes[Math.floor(Math.random() * menu.meat_dishes.length)].name;;
}

function getVegetarianDish(menu) {
  // 抽取素菜
  return menu.vegetarian_dishes[Math.floor(Math.random() * menu.vegetarian_dishes.length)].name;
}

function getSnackAndDessert(menu) {
  // 抽取小吃与甜品
  return menu.snacks_and_desserts[Math.floor(Math.random() * menu.snacks_and_desserts.length)].name;
}

function getSoupAndDrink(menu) {
  // 抽取汤与饮品
  return menu.soups_and_drinks[Math.floor(Math.random() * menu.soups_and_drinks.length)].name;
}

function registerCommand(ctx, config) {
  ctx.command('meal', '抽取一套完整的配餐')
    //.option('', '')
    .option('staple', '-a 抽取主食')
    .option('meat_dish', '-b 抽取荤菜')
    .option('vegetarian_dish', '-c 抽取素菜')
    .option('snack_and_dessert', '-d 抽取小吃或甜品')
    .option('soup_and_drink', '-e 抽取粥汤或饮品')
    .action(async ({ session, options }) => {
      // 读入json文件，从中抽取一套配餐，包括五类：主食、荤菜、素菜、小吃与甜品、粥汤与饮品
      // 主食有九大类：米饭、粉面、馒头、汉堡、三明治、披萨、水饺、包子和饼类

      // 读取 JSON 文件
      //const originJsonUrl = config.json_url.toString();
      //const agent = new https.Agent({ rejectUnauthorized: false });
      //const response = await axios.get(originJsonUrl, { httpsAgent: agent });
      exports.logger.success('Get a meal for ' + session.userId + ' in ' + session.guildId + '.');
      const menuJSON = '{"staples":{"rice":{"name":"米饭","dishes":[{"name":"蛋炒饭"},{"name":"腊肠炒饭"},{"name":"扬州炒饭"},{"name":"肥牛泡菜饭"},{"name":"石锅拌饭"},{"name":"日式鸡肉鸡蛋盖浇饭"},{"name":"咖喱牛肉饭"},{"name":"鲍鱼扇贝烩饭"},{"name":"鱼香肉丝饭"},{"name":"黄金蛋炒饭"},{"name":"牛肉炒饭"},{"name":"台式卤肉饭"},{"name":"烧腊饭"},{"name":"叉烧炒饭"},{"name":"鸡腿饭"},{"name":"海鲜炒饭"},{"name":"烤肉拌饭"},{"name":"煲仔饭"},{"name":"日式茶泡饭"},{"name":"蛋包饭"},{"name":"羊肉抓饭"}]},"noodles":{"name":"粉面","dishes":[{"name":"过桥米线"},{"name":"热干面"},{"name":"兰州牛肉拉面"},{"name":"阳春面"},{"name":"广式炒河粉"},{"name":"意式通心粉"},{"name":"担担面"},{"name":"粿条"},{"name":"炒米粉"},{"name":"过桥米线"},{"name":"日式豚骨拉面"},{"name":"沙茶面"},{"name":"鲜虾云吞"},{"name":"酸菜鱼面"},{"name":"鸡汤米线"},{"name":"酸菜肉丝面"},{"name":"羊肉烩面"},{"name":"芝士千层面"},{"name":"肉酱千层面"},{"name":"干炒牛河"},{"name":"葱油拌面"},{"name":"锡纸花甲粉"},{"name":"螺蛳粉配炸鸡蛋"},{"name":"韩式炸酱面"},{"name":"西红柿鸡蛋面"},{"name":"打卤面"},{"name":"茄汁意大利面"},{"name":"刀削面"},{"name":"香辣牛肉面"},{"name":"老北京炸酱面"},{"name":"鲜虾面"},{"name":"红烧牛肉面"},{"name":"番茄米线"},{"name":"香菇炖鸡面"},{"name":"酸辣粉"},{"name":"韩式炒面"},{"name":"肉酱面"},{"name":"素面"},{"name":"黑松露意大利面"},{"name":"酸菜牛肉面"},{"name":"鸡肉凉面"},{"name":"花生酱拌面"},{"name":"油泼面"},{"name":"乌冬面"},{"name":"荞麦面"},{"name":"牛肉拉面"},{"name":"车仔面"},{"name":"肉末米粉"},{"name":"担担面"},{"name":"高汤鸡丝面"},{"name":"新疆炒米粉"},{"name":"沙茶面"},{"name":"面线糊"},{"name":"肉末通心粉"}]},"steamed_bun":{"name":"馒头","dishes":[{"name":"杂粮面窝头"},{"name":"白面馒头"},{"name":"葱油花卷"},{"name":"炸馒头片"},{"name":"蛋液炸馒头"},{"name":"红糖馒头"},{"name":"烤馕"}]},"hamburger":{"name":"汉堡","dishes":[{"name":"美式牛肉汉堡"},{"name":"烟熏牛肉汉堡"},{"name":"黑椒牛肉汉堡"},{"name":"深海鳕鱼堡"},{"name":"炸鸡汉堡"},{"name":"巨无霸"},{"name":"鲜虾堡"},{"name":"菠萝鸡排汉堡"},{"name":"芝士蘑菇汉堡"},{"name":"鸡蛋汉堡"},{"name":"芝士牛肉汉堡"},{"name":"热狗"},{"name":"猪扒堡"},{"name":"深海鳕鱼堡"},{"name":"板烧鸡腿堡"},{"name":"麦辣鸡腿汉堡"},{"name":"双层吉士汉堡"},{"name":"巨无霸"}]},"sandwich":{"name":"三明治","dishes":[{"name":"培根煎蛋三明治"},{"name":"火鸡肉三明治"},{"name":"烤牛肉三明治"},{"name":"煎蛋培根三明治"},{"name":"火腿培根三明治"},{"name":"三文鱼三明治"},{"name":"蔬菜三明治"},{"name":"煎蛋土豆三明治"},{"name":"烤鸡玉米三明治"}]},"pizza":{"name":"披萨","dishes":[{"name":"超级至尊披萨"},{"name":"薯角芝士披萨"},{"name":"牛肉洋葱披萨"},{"name":"水果芝士披萨"},{"name":"菠萝夏威夷比萨"},{"name":"火腿菠萝披萨"},{"name":"意大利香肠披萨"},{"name":"烤肉披萨"},{"name":"罗勒番茄披萨"},{"name":"蘑菇培根披萨"},{"name":"香肠蘑菇披萨"},{"name":"辣鸡肉披萨"},{"name":"烟熏鲑鱼披萨"},{"name":"BBQ鸡肉披萨"},{"name":"烤鸡玉米披萨"}]},"dumpling":{"name":"水饺","dishes":[{"name":"猪肉大葱水饺"},{"name":"韭菜鸡蛋水饺"},{"name":"三鲜馄饨"},{"name":"虾仁水饺"},{"name":"韭菜鸡蛋水饺"},{"name":"紫菜猪肉馄饨"},{"name":"猪肉白菜水饺"},{"name":"韭菜猪肉水饺"},{"name":"猪肉大葱水饺"},{"name":"虾仁馄饨"},{"name":"东北桌饺"},{"name":"红油抄手"},{"name":"清汤白玉饺"}]},"steamed_stuffed_bun":{"name":"包子","dishes":[{"name":"玉米猪肉包"},{"name":"三鲜锅贴"},{"name":"叉烧包"},{"name":"猪肉韭菜锅贴"},{"name":"蟹黄烧卖"},{"name":"韭菜猪肉煎饺"},{"name":"流沙包"},{"name":"虾仁烧卖"},{"name":"羊肉馅烤包子"},{"name":"鲜肉小笼包"},{"name":"狗不理包子"},{"name":"奶黄包"},{"name":"韭菜猪肉包子"},{"name":"蟹黄生煎"},{"name":"豆沙包"},{"name":"蟹黄汤包"},{"name":"沙县炸馄饨"}]},"pie":{"name":"饼类","dishes":[{"name":"韭菜盒子"},{"name":"酱香饼"},{"name":"手抓饼加烤肠"},{"name":"芝麻烧饼"},{"name":"葱油饼"},{"name":"虾仁蛋饼"},{"name":"煎饼果子"},{"name":"青椒肥瘦肉夹馍"},{"name":"羊肉泡馍"},{"name":"玉米煎饼"},{"name":"墨西哥卷饼"},{"name":"煎蛋饼"},{"name":"炸串夹馍"},{"name":"酥皮腊汁肉夹馍"},{"name":"印度飞饼"},{"name":"驴肉火烧"},{"name":"羊肉焖饼"}]}},"meat_dishes":[{"name":"红烧肉"},{"name":"回锅肉"},{"name":"红烧猪蹄"},{"name":"宫保鸡块"},{"name":"红烧千层肚"},{"name":"炒螺蛳"},{"name":"蜜汁烤鸡腿"},{"name":"海鲜配时蔬"},{"name":"韩式烤肉"},{"name":"麻辣烫"},{"name":"麻辣鸭肫"},{"name":"酸辣鸡丝"},{"name":"葱烧黄鱼"},{"name":"脆皮烤鸭"},{"name":"红烧牛肉"},{"name":"风干鸡"},{"name":"黄焖鸡"},{"name":"酸辣鱼片"},{"name":"咖喱羊肉"},{"name":"笋炒腊肉"},{"name":"油炸小河虾"},{"name":"蟹肉蟹粉豆腐"},{"name":"麻辣香锅"},{"name":"鲜笋炖排骨"},{"name":"韩式部队锅"},{"name":"干炒鸡丁"},{"name":"哈尔滨红肠"},{"name":"老醋蛰头"},{"name":"沸腾鱼"},{"name":"三文鱼沙拉"},{"name":"水煮鱼"},{"name":"葱爆羊肉"},{"name":"蒜泥白肉"},{"name":"千层肚"},{"name":"红烧牛筋"},{"name":"红烧鸡爪"},{"name":"麻辣牛蛙"},{"name":"爆炒虾仁"},{"name":"排骨炖豆芽"},{"name":"干锅牛蛙"},{"name":"酱爆虾球"},{"name":"辣椒炒肉丝"},{"name":"干炸里脊"},{"name":"红烧大排"},{"name":"烧乳鸽"},{"name":"红烧排骨"},{"name":"水煮肉片"},{"name":"油炸鸡架"},{"name":"麻辣小龙虾"},{"name":"虾籽烧鳗"},{"name":"煎鱼"},{"name":"卤鸭头"},{"name":"炸猪排"},{"name":"大盘鸡"},{"name":"木须肉"},{"name":"红烧狮子头"},{"name":"油炸大虾"},{"name":"脆皮烧鹅"},{"name":"清蒸螺蛳"},{"name":"辣炒蛤蜊"},{"name":"酸辣鸡杂"},{"name":"葱爆海螺"},{"name":"糖醋鱼"},{"name":"椒盐鸡翅"},{"name":"海南椰子鸡"},{"name":"夫妻肺片"},{"name":"酸菜鱼片"},{"name":"意式烤鸡"},{"name":"清蒸鲈鱼"},{"name":"烧鳗鱼"},{"name":"炖羊肉"},{"name":"烧鲈鱼"},{"name":"五香鸭脖"},{"name":"剁椒鱼"},{"name":"干锅腰片"},{"name":"烧鸡"},{"name":"辣椒炒肚丝"},{"name":"红烧羊腿"},{"name":"香辣虾仁"},{"name":"烤肉卷"},{"name":"嫩煎鸡排"},{"name":"红焖肋排"},{"name":"烤羊肉串"},{"name":"关东煮"},{"name":"三杯鸡"},{"name":"干锅肥肠"},{"name":"蒜香鱼排"},{"name":"红烧鲫鱼"},{"name":"印度烤鸡"},{"name":"烤肋排"},{"name":"毛氏红烧肉"},{"name":"龙井虾仁"},{"name":"麻辣鸡爪"},{"name":"麻辣干锅鱼"},{"name":"炖牛尾"},{"name":"红焖牛腩"},{"name":"烤羊排"},{"name":"糖醋里脊"},{"name":"红焖鸡翅"},{"name":"麻辣香螺"},{"name":"手打虾滑"},{"name":"辣子鸡"},{"name":"辣炒鸡杂"},{"name":"麻辣口水鸡"},{"name":"酸菜鱼"},{"name":"炸大鸡排"},{"name":"辣椒炒肉片"},{"name":"法式蜗牛"},{"name":"葱爆羊肚"},{"name":"清蒸螃蟹"},{"name":"油炸虾仁"},{"name":"炒田螺"},{"name":"鱼香肉丝"},{"name":"麻辣鸡杂"},{"name":"百花鳝丝"},{"name":"宫保牛肉"},{"name":"蟹粉狮子头"},{"name":"烤鸭"},{"name":"红焖肉"},{"name":"烤羊腿"},{"name":"荷叶烤鸡"},{"name":"京酱肉丝"},{"name":"港式烧腊"},{"name":"清蒸鲈鱼头"},{"name":"泰式柠檬鸡"},{"name":"辣子鸡丁"},{"name":"麻辣牛肉"},{"name":"烤蹄筋"},{"name":"尖椒炒肉"},{"name":"红烧鸡翅中"},{"name":"红烧鸭翅"},{"name":"清蒸黄鱼"},{"name":"香辣蟹"},{"name":"宫保鸡丁"},{"name":"潮汕牛肉丸"},{"name":"马萨拉咖喱鸡"},{"name":"法式鹅肝"},{"name":"糖醋排骨"},{"name":"红烧鱼"},{"name":"清炖鳜鱼"},{"name":"烤牛肉串"},{"name":"红焖鳝鱼"},{"name":"意大利炖肉"},{"name":"泰式酸辣鸡肉"},{"name":"烤串"},{"name":"麻辣火锅"},{"name":"甜辣鸭翅"},{"name":"淄博烧烤"},{"name":"干煸鳝丝"},{"name":"爆炒腰花"},{"name":"小炒牛肉"},{"name":"香煎带鱼"},{"name":"酸辣鸡块"},{"name":"麻辣香肠"},{"name":"卤猪脚"},{"name":"芥末虾球"},{"name":"葱烧鳜鱼"},{"name":"海鲜刺身"},{"name":"剁椒鱼尾"},{"name":"炸鸡腿"},{"name":"金银蒜蒸牛肉"},{"name":"牡丹燕菜"},{"name":"辣椒炒肉"},{"name":"干锅鸡翅"},{"name":"土豆炖牛肉"},{"name":"蒜蓉烤生蚝"},{"name":"甜辣鸭脖"},{"name":"酸辣牛蛙"},{"name":"烤牛板筋"},{"name":"泰式酸辣海鲜"},{"name":"蚝油牛肉"},{"name":"香辣牛肉"},{"name":"干煸牛蛙"},{"name":"法式红酒炖牛肉"},{"name":"烤乳猪"},{"name":"泉水冰煮羊"},{"name":"红焖猪肚"},{"name":"菜花炒腊肉"},{"name":"板栗炒鸡"},{"name":"咖喱鸡"},{"name":"烤鳗鱼"},{"name":"油焖大虾"},{"name":"葱烧海参"},{"name":"南印咖喱鱼"},{"name":"红烧鸡胗"},{"name":"手抓羊肉"},{"name":"干煸黄鳝"},{"name":"白切鸡"},{"name":"糖醋小排"},{"name":"烤牛舌"},{"name":"剁椒鱼头"},{"name":"干烧牛柳"},{"name":"笋干炒肉片"},{"name":"红焖带鱼"},{"name":"烤毛蛋"},{"name":"豉汁蒸排骨"},{"name":"蚵仔煎"},{"name":"烤脆骨"},{"name":"粉蒸肉"},{"name":"黄豆炖猪手"},{"name":"红烧鸡翅根"},{"name":"糖醋鲤鱼"},{"name":"炖猪蹄"},{"name":"麻辣鸭血"},{"name":"红烧带鱼"},{"name":"葱烧黄鳝"},{"name":"番茄牛腩"},{"name":"东坡肉"},{"name":"酸辣肉丝"},{"name":"干炒鸡胗"},{"name":"甜辣鸭锁骨"},{"name":"红烧鲤鱼"},{"name":"烤培根金针菇卷"},{"name":"辣椒炒鳝片"},{"name":"爆炒田螺"},{"name":"蒜蓉粉丝蒸蛏子"},{"name":"干煸牛肉"},{"name":"凤爪"},{"name":"潮汕牛肉火锅"},{"name":"酱鸡腿"},{"name":"盐水鸭"},{"name":"清炖羊肉"},{"name":"脆皮五花肉"},{"name":"涮鹅肠"},{"name":"干煸鸡胗"},{"name":"农家炒鸡"},{"name":"干炸黄鱼"},{"name":"回锅肉"},{"name":"干烧鱼"},{"name":"香辣鸭翅"},{"name":"锅包肉"},{"name":"鸡肉蔬菜沙拉"},{"name":"蚂蚁上树"},{"name":"锅包肉"},{"name":"白灼虾"},{"name":"菠萝咕咾肉"},{"name":"铁板烧"},{"name":"蒲烧鳗鱼"},{"name":"盐煎秋刀鱼"},{"name":"酱牛肉"},{"name":"海南椰子鸡"},{"name":"梅菜扣肉"},{"name":"豉汁蒸排骨"},{"name":"脆皮烤乳猪"},{"name":"干锅排骨鸡"},{"name":"白菜豆腐焖酥肉"},{"name":"红烧狮子头"},{"name":"酱烧大骨"},{"name":"叉烧肥肠"},{"name":"黑椒焗猪手"},{"name":"京酱肉丝"},{"name":"回锅肉"},{"name":"干煸腰花"},{"name":"东坡肉"},{"name":"宫保鸡丁"},{"name":"糖醋里脊"},{"name":"腰果虾仁"},{"name":"口水鸡"},{"name":"毛血旺"},{"name":"沸腾鱼"},{"name":"可乐鸡翅"},{"name":"干烧蒜蓉鸡翅"},{"name":"辣子鸡"},{"name":"杏仁焦糖柠檬鸡翅"},{"name":"奶汁土豆泥焗鸡块"},{"name":"腐乳鸡翅"},{"name":"陈皮兔"},{"name":"酸汤肥牛"},{"name":"夫妻肺片"},{"name":"蜀香牛蛙"},{"name":"小炒肉"},{"name":"东北杀猪菜"},{"name":"溜肉段"},{"name":"猪肉炖粉条"},{"name":"小鸡炖榛蘑"},{"name":"糖醋鲤鱼"},{"name":"西湖醋鱼"},{"name":"葱烧海参"},{"name":"把子肉"},{"name":"锅烧鸭"},{"name":"红烧大虾"},{"name":"上汤焗龙虾"},{"name":"红烧乳鸽"},{"name":"椒盐濑尿虾"},{"name":"盆菜"},{"name":"脆皮烧肉"},{"name":"烤乳猪"},{"name":"沙茶牛肉"},{"name":"潮州牛肉丸"},{"name":"辣子鸡"},{"name":"油爆双脆"},{"name":"木须肉"},{"name":"松鼠桂鱼"},{"name":"响油鳝糊"},{"name":"盐水鸭"},{"name":"烤方"},{"name":"肉酿生麸"},{"name":"樱桃肉"},{"name":"荔枝肉"},{"name":"海蛎煎"},{"name":"白炒鲜竹蛏"},{"name":"荷包鱼池"},{"name":"西湖醋鱼"},{"name":"东坡肉"},{"name":"干菜焖肉"},{"name":"荷叶粉蒸肉"},{"name":"龙井虾仁"},{"name":"金鱼戏莲"},{"name":"三虾豆腐"},{"name":"口水鸡"},{"name":"甜皮鸭"},{"name":"香煎牛扒"},{"name":"烤火鸡腿"},{"name":"黄油鸡卷"},{"name":"笋炖排骨"},{"name":"惠灵顿牛排"},{"name":"烤牛扒"}],"vegetarian_dishes":[{"name":"青椒土豆丝"},{"name":"辣椒炒蛋"},{"name":"家常炒鸡蛋"},{"name":"木耳炒藕片"},{"name":"蟹黄豆腐"},{"name":"陕西凉皮"},{"name":"豆豉鲮鱼油麦菜"},{"name":"百花豆腐"},{"name":"尖椒鸡蛋"},{"name":"葱烧豆腐"},{"name":"鱼香鸡蛋"},{"name":"干煸海带丝"},{"name":"辣子土豆片"},{"name":"墨西哥玉米牛油果沙拉"},{"name":"拍黄瓜"},{"name":"水果沙拉"},{"name":"鱼香茄子"},{"name":"蚝油芥兰"},{"name":"红焖粉条"},{"name":"豉汁菜心"},{"name":"泰式青木瓜沙拉"},{"name":"西红柿炒鸡蛋"},{"name":"清炒菜心"},{"name":"葱炒鸡蛋"},{"name":"蚝油生菜"},{"name":"糖醋土豆条"},{"name":"酸辣藕丝"},{"name":"东北大拉皮"},{"name":"家常豆腐"},{"name":"韩式炒年糕"},{"name":"红烧豆腐"},{"name":"咖喱豆腐"},{"name":"红烧茄子"},{"name":"泰式香辣沙拉"},{"name":"醋溜白菜"},{"name":"蒜蓉西兰花"},{"name":"尖椒炒鸡蛋"},{"name":"干锅花菜"},{"name":"葱爆豆腐"},{"name":"凉拌三丝"},{"name":"干煸豆角"},{"name":"醋溜土豆丝"},{"name":"果仁蔬菜沙拉"},{"name":"麻婆豆腐"},{"name":"蟹黄炒蛋"},{"name":"五香花生米"},{"name":"干炸蘑菇"},{"name":"家乡豆腐"},{"name":"炸白菜卷"},{"name":"凉拌黄瓜"},{"name":"凯撒沙拉"},{"name":"辣椒炒豆角"},{"name":"清炒西兰花"},{"name":"芸豆炒土豆"},{"name":"白菜豆腐炖粉条"},{"name":"酸辣绿豆芽"},{"name":"芸豆炒土豆"},{"name":"白菜豆腐炖粉条"},{"name":"酸辣绿豆芽"},{"name":"清炒空心菜"},{"name":"老醋花生"},{"name":"清炒小油菜"},{"name":"炭烤韭菜"},{"name":"凉拌秋葵"},{"name":"手撕包菜"},{"name":"醋溜白菜"},{"name":"蒜蓉粉丝娃娃菜"},{"name":"金玉满堂"},{"name":"虎皮青椒"},{"name":"红烧茄子"},{"name":"红烧千页豆腐"},{"name":"砂锅豆腐"},{"name":"鱼香茄子"},{"name":"清炒山药木耳"},{"name":"济南炒合菜"},{"name":"香油果子拌菠菜"},{"name":"炭烤金针菇"},{"name":"干锅土豆片"},{"name":"地三鲜"},{"name":"干锅杏鲍菇"},{"name":"油泼豆皮"},{"name":"清炒莴笋"},{"name":"干锅花菜"},{"name":"炝菠菜"},{"name":"韭菜炒香干"},{"name":"蛋黄南瓜"},{"name":"普罗旺斯炖菜"},{"name":"土豆沙拉"},{"name":"奶油炖菜"},{"name":"椒盐茄子丁"},{"name":"白灼时蔬"},{"name":"辣椒炝时蔬"},{"name":"干煸苦瓜"},{"name":"香芹炒藕粒"},{"name":"百合炒南瓜"},{"name":"干贝扒芦笋"},{"name":"红烧芋头"},{"name":"红枣蒸南瓜"},{"name":"开水白菜"},{"name":"普宁豆干"},{"name":"盐水菜心"},{"name":"上汤娃娃菜"},{"name":"油焖春笋"},{"name":"干炸响铃"},{"name":"湘西外婆菜"},{"name":"干煸四季豆"},{"name":"鱼香茄子"},{"name":"英式鸡丁沙拉"}],"snacks_and_desserts":[{"name":"春卷"},{"name":"可乐饼"},{"name":"菠萝包"},{"name":"榛子巧克力棒"},{"name":"炸红薯条"},{"name":"巧克力慕斯"},{"name":"蓝莓松饼"},{"name":"椰汁糕"},{"name":"奶油水果蛋糕"},{"name":"油条"},{"name":"莲蓉月饼"},{"name":"南瓜派"},{"name":"双皮奶"},{"name":"苹果派"},{"name":"鲷鱼烧"},{"name":"油炸臭豆腐"},{"name":"柠檬蛋糕"},{"name":"云腿月饼"},{"name":"花生巧克力糖"},{"name":"焦糖布丁"},{"name":"可丽饼"},{"name":"坚果饼干"},{"name":"烤冷面"},{"name":"吮指原味鸡"},{"name":"牛角包"},{"name":"咸鸭蛋"},{"name":"芝士蛋糕"},{"name":"花生糖"},{"name":"提拉米苏"},{"name":"煎溏心蛋"},{"name":"可颂面包"},{"name":"黄桃蛋挞"},{"name":"紫薯泥月饼"},{"name":"闽南五香条"},{"name":"冰粉"},{"name":"果冻"},{"name":"和果子"},{"name":"柠檬鸡爪"},{"name":"豆腐脑"},{"name":"红枣糯米粽"},{"name":"芝士饼干"},{"name":"奥尔良烤鸡腿"},{"name":"大福"},{"name":"豆沙月饼"},{"name":"芒果慕斯"},{"name":"蛋黄酥"},{"name":"水果塔"},{"name":"糯米肉粽"},{"name":"芝士蛋糕"},{"name":"肇庆裹蒸粽"},{"name":"甜味豆花"},{"name":"糯米糍"},{"name":"奶油夹心饼干"},{"name":"糯米鸡"},{"name":"枣泥月饼"},{"name":"咸蛋黄肉粽"},{"name":"松子核桃饼"},{"name":"韩式炸鸡"},{"name":"糖炒栗子"},{"name":"法式蓝莓塔"},{"name":"美式炸鸡"},{"name":"柠檬慕斯"},{"name":"果仁饼干"},{"name":"红丝绒蛋糕"},{"name":"虾饺"},{"name":"烤杏仁蛋糕"},{"name":"锅巴土豆"},{"name":"蜜三刀"},{"name":"炸淀粉肠"},{"name":"葡萄干饼干"},{"name":"马卡龙"},{"name":"香辣鸡翅"},{"name":"芝麻汤圆"},{"name":"烤果仁布丁"},{"name":"炸香蕉"},{"name":"炸鸡翅尖"},{"name":"鲜肉汤圆"},{"name":"韩式泡菜"},{"name":"奶油蛋糕杯"},{"name":"五仁月饼"},{"name":"巧克力甜甜圈"},{"name":"抹茶蛋糕"},{"name":"奶油曲奇"},{"name":"天妇罗"},{"name":"黑森林蛋糕"},{"name":"香草冰淇淋"},{"name":"烤鸡架"},{"name":"豆沙粽"},{"name":"水蒸蛋"},{"name":"寿司"},{"name":"板栗糕"},{"name":"巧克力曲奇"},{"name":"葡萄干面包"},{"name":"蛋挞"},{"name":"鲜奶布丁"},{"name":"红豆糕"},{"name":"法棍"},{"name":"栗子蛋糕"},{"name":"烤红薯"},{"name":"杏仁巧克力饼干"},{"name":"炸薯饼"},{"name":"咸味豆花"},{"name":"马蹄糕"},{"name":"糖葫芦"},{"name":"黑松露奶油土豆泥"},{"name":"天津大麻花"},{"name":"巧克力奶油棒"},{"name":"香草泡芙"},{"name":"花生酥"},{"name":"肠粉"},{"name":"巧克力蛋白棒"},{"name":"绿豆糕"},{"name":"黄金脆皮鸡"},{"name":"炸薯条"},{"name":"鸡汁土豆泥"},{"name":"酥皮鲜奶包"},{"name":"鲜肉粽"},{"name":"酸奶水果捞"},{"name":"奶油泡芙"},{"name":"炸鱼蛋"},{"name":"果酱蛋糕"},{"name":"花生汤圆"},{"name":"蛋糕卷"},{"name":"唐扬鸡块"},{"name":"抹茶冰淇淋"},{"name":"卤蛋"},{"name":"卤豆干"},{"name":"炒酸奶"},{"name":"冰粥"},{"name":"日式烧鸟"},{"name":"玉子烧"},{"name":"日式渍物"},{"name":"红豆铜锣烧"},{"name":"章鱼小丸子"},{"name":"韩式打糕"},{"name":"老婆饼"},{"name":"沙嗲牛肉干"},{"name":"X.O.炒萝卜糕"},{"name":"陈皮红豆沙"},{"name":"脆炸芋头糕"},{"name":"蜂蜜龟苓膏"},{"name":"泡椒凤爪"},{"name":"菠萝派"},{"name":"蛋黄派"},{"name":"巧克力派"},{"name":"红豆派"},{"name":"香芋派"},{"name":"苹果派"},{"name":"高邮鸭蛋"},{"name":"戚风蛋糕"},{"name":"杨枝甘露"},{"name":"蜂蜜蛋糕"},{"name":"草莓雪媚娘"},{"name":"芒果雪媚娘"},{"name":"皮蛋"},{"name":"酒酿鸡蛋"},{"name":"虎皮鸡蛋"},{"name":"德式图灵根香肠"},{"name":"薄荷糖"},{"name":"芝士焗土豆泥"},{"name":"麦旋风"}],"soups_and_drinks":[{"name":"可乐"},{"name":"奶茶"},{"name":"西红柿鸡蛋汤"},{"name":"柠檬水"},{"name":"珍珠奶茶"},{"name":"俄式红菜汤"},{"name":"四果汤"},{"name":"鲫鱼汤"},{"name":"淮南牛肉汤"},{"name":"紫菜蛋花汤"},{"name":"鸭血粉丝汤"},{"name":"清炖鸡汤"},{"name":"酸辣海鲜汤"},{"name":"鸽子汤"},{"name":"鱼头豆腐汤"},{"name":"冬瓜丸子汤"},{"name":"木耳虫草花羹"},{"name":"竹笙鱼翅羹"},{"name":"海鲜汤"},{"name":"豆腐汤"},{"name":"罗宋汤"},{"name":"牛杂汤"},{"name":"鳕鱼豆腐汤"},{"name":"法式奶油蘑菇汤"},{"name":"鲍鱼花菇羹"},{"name":"花蛤汤"},{"name":"牛骨汤"},{"name":"海鲜豆腐羹"},{"name":"羊肉汤"},{"name":"鸡脯丸子汤"},{"name":"胡辣汤"},{"name":"冬瓜排骨汤"},{"name":"酸辣汤"},{"name":"冬阴功汤"},{"name":"雪菜肉丝汤"},{"name":"皮蛋瘦肉粥"},{"name":"绿豆粥"},{"name":"鳝鱼粥"},{"name":"红枣山药粥"},{"name":"红枣桂圆粥"},{"name":"艇仔粥"},{"name":"香菇鸡肉粥"},{"name":"红薯小米粥"},{"name":"五谷杂粮粥"},{"name":"八宝粥"},{"name":"海鲜粥"},{"name":"紫薯粥"},{"name":"南瓜粥"},{"name":"糯米粥"},{"name":"鲍鱼瑶柱粥"},{"name":"银耳莲子粥"},{"name":"紫米粥"},{"name":"鲜虾粥"},{"name":"青菜鸡肉粥"},{"name":"生滚粥"},{"name":"燕麦粥"},{"name":"蘑菇鸡蛋汤"},{"name":"日式梅酒"},{"name":"人参鸡汤"},{"name":"蜂蜜柚子茶"},{"name":"酥油茶"},{"name":"冰糖银耳炖雪梨"},{"name":"蹄花汤"},{"name":"乌鱼蛋汤"},{"name":"黄鱼豆腐羹"},{"name":"人参乌鸡汤"},{"name":"莼菜银鱼汤"},{"name":"西湖莼菜汤"},{"name":"法式鲜虾浓汤"},{"name":"桂花酸梅汤"},{"name":"红糖姜汤"},{"name":"芝麻糊"}]}';
      const menu = JSON.parse(menuJSON);

      let randomStaple = '';
      let randomMeatDish = '';
      let randomVegetarianDish = '';
      let randomSnackDessert = '';
      let randomSoupDrink = '';

      //console.log(`a=${options.staple} b=${options.meat_dish} c=${options.vegetarian_dish} d=${options.snack_and_dessert} e=${options.soup_and_drink}`);
      //onsole.log(!(options.staple || options.meat_dish || options.vegetarian_dish || options.snack_and_dessert || options.soup_and_drink));

      //如果没有指定选项，则五种餐品各抽一样
      if (!(options.staple || options.meat_dish || options.vegetarian_dish || options.snack_and_dessert || options.soup_and_drink)) {
        randomStaple = getStaple(menu);
        randomMeatDish = getMeatDish(menu);
        randomVegetarianDish = getVegetarianDish(menu);
        randomSnackDessert = getSnackAndDessert(menu);
        randomSoupDrink = getSoupAndDrink(menu);
        await session.sendQueued(h.at(session.userId) + ` 今天的配餐是：\n主食：${randomStaple}\n荤菜：${randomMeatDish}\n素菜：${randomVegetarianDish}\n小食：${randomSnackDessert}\n饮品：${randomSoupDrink}`);
        return;
      } else {
        // 如果指定选项，则只抽被指定的餐品
        let meal = [];
        if (options.staple) {
          meal.push('主食：' + getStaple(menu));
        }
        if (options.meat_dish) {
          meal.push('荤菜：' + getMeatDish(menu));
        }
        if (options.vegetarian_dish) {
          meal.push('素菜：' + getVegetarianDish(menu));
        }
        if (options.snack_and_dessert) {
          meal.push('小食：' + getSnackAndDessert(menu));
        }
        if (options.soup_and_drink) {
          meal.push('饮品：' + getSoupAndDrink(menu));
        }
        await session.sendQueued(h.at(session.userId) + ` 今天的配餐是：\n` + meal.join('\n'));
      }
      
    });
}
