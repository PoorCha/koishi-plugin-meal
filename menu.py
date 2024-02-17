import json

def insertDish():
    # 读取 JSON 数据
    with open("menu.json", "r", encoding="utf-8") as file:
        menu = json.load(file)
    
    while True:
        # 显示菜品种类选项
        print("请输入你要插入的菜品种类：")
        print("1. 主食")
        print("2. 荤菜")
        print("3. 素菜")
        print("4. 小吃与甜品")
        print("5. 汤与饮品")
        print("0. 返回上一级")
        
        # 获取用户输入的菜品种类
        category = input("请输入数字选择菜品种类: ")
        
        if category == "0":
            break
        
        if category == "1":
            # 主食种类选择
            while True:
                print("请选择主食种类：")
                print("1. 米饭")
                print("2. 粉面")
                print("3. 馒头")
                print("4. 汉堡")
                print("5. 三明治")
                print("6. 披萨")
                print("7. 水饺")
                print("8. 包子")
                print("9. 饼类")
                print("0. 返回上一级")
                
                # 获取用户输入的主食种类
                staple_type = input("请输入数字选择主食种类: ")
                
                if staple_type == "0":
                    break
                
                # 转换主食种类为对应的键
                if staple_type == "1":
                    category_key = "rice"
                elif staple_type == "2":
                    category_key = "noodles"
                elif staple_type == "3":
                    category_key = "steamed_bun"
                elif staple_type == "4":
                    category_key = "hamburger"
                elif staple_type == "5":
                    category_key = "sandwich"
                elif staple_type == "6":
                    category_key = "pizza"
                elif staple_type == "7":
                    category_key = "dumpling"
                elif staple_type == "8":
                    category_key = "steamed_stuffed_bun"
                elif staple_type == "9":
                    category_key = "pie"  # 新增的饼类主食
                else:
                    print("无效的输入！")
                    continue
                
                dish_names = input("请输入由逗号隔开的菜品名: ")
                
                # 去重并插入菜名
                dish_list = list(set(dish_names.split(",")))  # 去重菜名
                dish_objects = [{"name": dish} for dish in dish_list]  # 构建菜名对象
    
                # 插入菜名到对应分类
                menu["staples"][category_key]["dishes"].extend(dish_objects)
    
                # 输出成功插入的菜品名与被去重的菜品名
                print("成功插入的菜品名：", dish_list)
                print("被去重的菜品名：", list(set(dish_names.split(",")) - set(dish_list)))
                print()
        
        elif category == "2":
            category_key = "meat_dishes"
            dish_names = input("请输入由逗号隔开的菜品名: ")
            dish_list = list(set(dish_names.split(",")))  # 去重菜名
            dish_objects = [{"name": dish} for dish in dish_list]  # 构建菜名对象
            menu[category_key].extend(dish_objects)
            print("成功插入的菜品名：", dish_list)
            print("被去重的菜品名：", list(set(dish_names.split(",")) - set(dish_list)))
            print()
        
        elif category == "3":
            category_key = "vegetarian_dishes"
            dish_names = input("请输入由逗号隔开的菜品名: ")
            dish_list = list(set(dish_names.split(",")))  # 去重菜名
            dish_objects = [{"name": dish} for dish in dish_list]  # 构建菜名对象
            menu[category_key].extend(dish_objects)
            print("成功插入的菜品名：", dish_list)
            print("被去重的菜品名：", list(set(dish_names.split(",")) - set(dish_list)))
            print()
        
        elif category == "4":
            category_key = "snacks_and_desserts"
            dish_names = input("请输入由逗号隔开的菜品名: ")
            dish_list = list(set(dish_names.split(",")))  # 去重菜名
            dish_objects = [{"name": dish} for dish in dish_list]  # 构建菜名对象
            menu[category_key].extend(dish_objects)
            print("成功插入的菜品名：", dish_list)
            print("被去重的菜品名：", list(set(dish_names.split(",")) - set(dish_list)))
            print()
        
        elif category == "5":
            category_key = "soups_and_drinks"
            dish_names = input("请输入由逗号隔开的菜品名: ")
            dish_list = list(set(dish_names.split(",")))  # 去重菜名
            dish_objects = [{"name": dish} for dish in dish_list]  # 构建菜名对象
            menu[category_key].extend(dish_objects)
            print("成功插入的菜品名：", dish_list)
            print("被去重的菜品名：", list(set(dish_names.split(",")) - set(dish_list)))
            print()
        
        else:
            print("无效的输入！")
        
        # 更新 JSON 数据
        with open("menu.json", "w", encoding="utf-8") as file:
            json.dump(menu, file, indent=4, ensure_ascii=False)

insertDish()
input("按下任意键继续...")