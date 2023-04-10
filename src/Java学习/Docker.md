---
author: 白米粥
category: ["Java","Docker"]
star: true
---

<!-- more -->

# Docker学习笔记

## 相关网站

[Docker中文官方网站](http://docker.p2hp.com/)

[Docker仓库](https://hub.docker.com/)

[尚硅谷Docker教学](https://www.bilibili.com/video/BV1gr4y1U7CY/)

[CentOS安装DockerEngine](https://docs.docker.com/engine/install/centos/)

[阿里云镜像加速器](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)



## 简介

Docker是基于Go语言实现的云开源项目，能实现只需要一次配置环境，换到别的机子上就可以一键部署好，大大的简化了操作。也就是**一次镜像，处处运行**。

解决了运行环境和配置问题的软件容器，方便做持续集成并有助于整体发布的容器虚拟化技术。

### 基本组成

1. 镜像：类似于java中的类；是一个只读模版，用来常见Docker容器，一个镜像可以创建多个容器。
2. 容器：类似于java中的对象；容器是用镜像创建的运行实例，每个容器都是相互隔离的、保证安全的。
3. 仓库：类似于java中的maven仓库；存储docker镜像的地方，仓库分为共有和私有。

## 安装

### 卸载旧版本

```
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

### 安装 yum-util并设置仓库地址

```
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 更新yum软件包索引
yum makecache fast(centos8 没有fast参数，去掉即可)
yum makecache
```

### 安装Docker Engine

安装最新版本

```shell
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

安装指定版本

```
yum list docker-ce --showduplicates | sort -r
 
sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io docker-buildx-plugin docker-compose-plugin
```

### 启动Docker

```
sudo systemctl start docker
```

### 验证Docker安装成功

```
sudo docker version
sudo docker run hello-world
```

## 卸载

### 卸载Docker

```
sudo systemctl stop docker
yum remove docker-ce docker-ce-cli containerd.io
```

### 删除资源

```
rm -rf /var/lib/docker
rm -rf /var/lib/containerd
```

## 镜像加速器配置(阿里云)

[阿里云镜像加速配置](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

<img src="./Docker.assets/image-20230410110901256.png" alt="阿里云镜像加速" style="zoom:50%;" />

## 常用命令

### 帮助启动类命令

|          功能          |           命令           |
| :--------------------: | :----------------------: |
|       启动Docker       |  systemctl start docker  |
|       停止Docker       |  systemctl stop docker   |
|       重启Docker       | systemctl restart docker |
|     查看Docker状态     | systemctl status docker  |
|        开机启动        | systemctl enable docker  |
|   查看Docker概要信息   |       docker info        |
| 查看Docker总体帮助文档 |      docker --help       |
| 查看Docker命令帮助文档 |  docker 具体命令 --help  |

### 镜像命令

|         功能         |         命令         |
| :------------------: | :------------------: |
| 查看本地主机上的镜像 | docker images  -a*(列出本地所有镜像，包含历史镜像)* -q*(只显示镜像ID)* |
| 搜索镜像 | docker search [镜像名称] --limit [数量] *(展示条数)* |
| 拉取镜像 | docker pull [镜像名字[:TAG]] *(不加tag就是拉取最新的)* |
| 查看镜像/容器/数据卷所占的空间 | docker system df |
| 删除某个镜像 |                      |
|                      |                      |



### 容器命令
