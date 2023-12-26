import { Context, Schema, h } from 'koishi'
import menu from '../menu.json'

export const name = 'meal'

export interface Config {

}

export const Config = Schema.object({})

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
