---
author: 白米粥
category: ["nginx"]
---

<!-- more -->

# Nginx学习笔记

## 常用版本

Nginx开源版（官方免费开源版本）
http://nginx.org/

Nginx plus 商业版（付费版，在上版本基础上加了一些功能）
https://www.nginx.com

openresty（nginx+lua完美整合）
http://openresty.org/cn/

Tengine（淘宝网公布发行版本，免费开源）
http://tengine.taobao.org

## Docker安装

先创建挂在目录和复制配置

```sh
docker run --name nginx -d nginx

# 将容器nginx.conf文件复制到宿主机
docker cp nginx:/etc/nginx/nginx.conf /mydata/nginx/conf/nginx.conf
# 将容器conf.d文件夹下内容复制到宿主机
docker cp nginx:/etc/nginx/conf.d /mydata/nginx/conf/conf.d
# 将容器中的html文件夹复制到宿主机
docker cp nginx:/usr/share/nginx/html /mydata/nginx

```

```sh
docker run \
-p 80:80 \
--name nginx \
-v /mydata/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /mydata/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /mydata/nginx/log:/var/log/nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-d nginx:latest
```

## 安装文件目录

- conf

  主要存放nginx的配置文件

- html

  存放一些静态文件

- logs

  存放nginx 的日志

## 工作流程

![nginx工作流程](./assets/image-20230412180754108.png)

## Nginx.conf最小配置

```sh
# nginx启动的时候启动多少个工作进程,基本一个内核对应多少个
worker_processes  auto;

events {
    # 最大连接数
    worker_connections  1024;
}

http {
    # 引入其他配置文件
    include       /etc/nginx/mime.types; # 该文件记录头类型
    # 默认类型，如果不包含在默认的头类型就用这个默认的
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
    # 数据零拷贝: 不通过应用内存发送文件流
    sendfile        on;
    #tcp_nopush     on;
    # 保持长连接的超时时间
    keepalive_timeout  65;

    #gzip  on;
    # 虚拟主机
    server {
        # 监听端口
        listen       80;
        listen  [::]:80;
        # 域名、主机名
        server_name  localhost;
        # uri
        location / {
            # 资源的根目录
            root   /usr/share/nginx/html;
            # 默认页
            index  index.html index.htm;
        }
        # 错误码转发到地址
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
}
```

## 虚拟主机

![浏览器访问页面流程](./assets/image-20230412182552776.png)

### 域名解析

