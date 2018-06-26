# express-vue 开发模板

## 目录说明
A. bin - 服务启动入口  
B. interface - 业务接口实现   
C. fontend - 前端代码  
D. lib - 公共类库  
E. pubilc - 静态资源  
F. routes - 服务路由  
G. view - 视图 
H. script - 脚本  

# 数据库部署说明
1. 新建数据库`db`（以`config.json`内配置的数据库为准）；  
2. 修改`model`中的`config.json`的数据库链接信息；  
3. 执行`npm run initdb`；
4. 若需要重置某个表，如：重置`account`表，则执行`npm run initdb -- account`。

# 调试说明
1. 执行`npm install`;
2. 前端执行`npm run dev`，后端使用 Visual Studio Code 运行调试（直接按下`F5`即可）。

## 部署说明
服务器需安装`nodejs`和`npm`。部署执行如下脚本：
```bash
npm install
```

编译前端代码：  
```bash
npm run build
```

启动服务：
```bash
npm start
```

以守护进程方式，启动服务：
```bash
forever start ./bin/www
```

## 端口号
- 6789 （可在`config.json`配置）
