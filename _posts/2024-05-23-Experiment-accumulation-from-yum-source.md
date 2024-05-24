---
layout: post
title: "Experimence accumulation from yum source"
date: 2024-05-23 12:11:20
author: Kidlo-th
categories: Technical
enable_math: "enable"
---
Record of errors and solutions for the yum source. Due to the inability to directly access the external network within the company, Yum source machines were established within the company to access the internal machines through software packages.

# **问题：Redhat主机使用CentOS  Yum源**

## **问题描述**

在Redhat主机上使用CentOS Yum源(其Yum源为内网搭建)时，`yum clean all`时报错，如下所示：

```shell
......
http://192.168.33.128/centos/7Server/os/x86_64/latest/repodata/repomd.xml: [Errno 14] HTTP Error 404 - Not Found
......
```

## **排查过程**

1、检查网络是否互通 - 互通；
2、检查repo文件是否有错误 - 未发现错误；
3、根据报错信息发现URL中`$releaserver`变量获取的值为`7Server`，而正常应该为`7`，所以URL拼写错误导致`Not Found`。

## **解决方法**

重新编辑`xxxx.repo`文件，使用`%s/$releaserver/7/g`将其中的`$releaserver`变量修改为常量，重新`yum clean all && yum makecache`。

## **衍生**

在处理以上问题是，发现了另一个问题。
现象1：redhat主机`/etc/yum.repo.d`下有个`redhat.repo`的文件无法被修改，每次被修改后都会恢复原有内容。
现象2：每次`yum clean all`时都会报一个以下所示的错误

```shell
This system is not registered with an entitlement server. You can use subscription-manager to register.
此系统未向授权服务器注册。您可以使用订阅管理器进行注册。
```

在网上搜索之后发现原因：
	redhat自带的插件`subscription-manager`。这个插件的作用就是`Red Hat Subscription Manager`订阅管理器，它会一直将提示你register，而且会更新或者重置`redhat.repo`文件，但是不影响yum使用，如果不想看到提示，就需要手动关闭

```shell
vim /etc/yum/pluginconf.d/subscription-manager.conf

[main]
# enabled=1 
# 除以上注释掉，还可以修改为enabled=0
```

# 问题：报错Error：rpmdb open failed

## **问题描述**

在centos机器上安装`net-tools`时，卡在搜索包进程，强制kill掉yum进程之后，再次尝试则报以下报错`Error: rpmdb open failed`

```shell
[root@localhost excalidraw]# yum -y install net-tools
Failed to set locale, defaulting to C
error: rpmdb: BDB0113 Thread/process 114309/139749749523712 failed: BDB1507 Thread died in Berkeley DB library
error: db5 error(-30973) from dbenv->failchk: BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
error: cannot open Packages index using db5 -  (-30973)
error: cannot open Packages database in /var/lib/rpm
CRITICAL:yum.main:

Error: rpmdb open failed
```

## **排查过程**

首先了解一下rpmdb是什么，rpmdb是记录系统中已安装的所有RPM包信息的本地数据库，可以通过rpmdb来查询、管理软件包。在CentOS，通常报错`Error: rpmdb open failed`就是rpmdb数据崩溃了，无法正常使用。

RPMDB数据库的位置一般在`/var/lib/rpm/`下(即__db.*)

```shell
[root@localhost rpm]# pwd
/var/lib/rpm
[root@localhost rpm]# ls
Basenames     Dirnames  Installtid  Obsoletename  Providename  Sha1header  Triggername  __db.002
Conflictname  Group     Name        Packages      Requirename  Sigmd5      __db.001     __db.003
```

## **解决办法**

当碰到这种报错的时候，可以删除旧的RPMDB里的数据库，然后重建

```shell
# 进入RPMDB数据库所在目录
[root@localhost ~]# cd /var/lib/rpm
# 删除旧数据库
[root@localhost rpm]# rm -rf __db.*
# 重建RPMDB数据库
[root@localhost rpm]# rpm --rebuilddb
# 清除Yum缓存
[root@localhost rpm]# yum clean all
Failed to set locale, defaulting to C
??????fastestmirror
正在清理软件源： base centos-sclo-rh centos-sclo-sclo epel extras galaxy4-rhel7 mongodb-org updates
Cleaning up list of fastest mirrors
```


