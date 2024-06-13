---
layout: post
title: "ESXI certificate expiration"
date: 2024-06-04 12:11:20
author: Kidlo-th
categories: Technical
enable_math: "enable"
excerpt: The article introduces the problems and solutions caused by the expiration of ESXI certififcate
---

# Biref Introduction

ESXI certificate expired, causing VCenter to be unable to login

![image-20240529170736048](https://only-picture.oss-cn-beijing.aliyuncs.com/images/202405291707111.png)

![image-20240529170709609](https://only-picture.oss-cn-beijing.aliyuncs.com/images/202405291707745.png)

> ***<font color='Gold'>Warnings</font>***  
>
> 1、The article applies to single node ESXI;  
> 2、If you are managing a cluster using VCenter, after following the instructions in this article, you need to re-add the ESXI node on the VCenter cluster.(But this has not been verified);

# General Operating Record

## Create SSL Certificate

### Obtain CSR information

before creating the certificate, We need to obtain the CSR information[^1]. These information can be obtained through the 'IP signature request' on the ESXI Web.

![image-20240604140755162](https://only-picture.oss-cn-beijing.aliyuncs.com/images/202406041407425.png)

![image-20240604140813090](https://only-picture.oss-cn-beijing.aliyuncs.com/images/202406041408164.png)

<img src="https://only-picture.oss-cn-beijing.aliyuncs.com/images/202406041408231.png" alt="image-20240604140830139" style="zoom:67%;" />

We parse CSR content throught an online tool([CSR File Online Verification Tool](https://csr.chinassl.net/decoder-csr.html)), you can obtain the following information.

<img src="https://only-picture.oss-cn-beijing.aliyuncs.com/images/202406041531598.png" alt="image-20240604153106475" style="zoom:67%;" />

### Create SSL certificate through OpenSSL

We create SSL certificate through openssl[^2], So you need prepare the OpenSSL tool in advance. Execute the following command to create a certificate:

```shell
[root@localhost ~]# cd /root
[root@localhost ~]# mkdir certificate
[root@localhost ~]# cd certificate
[root@localhost certificate]# openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout private.key -out cert.crt
Generating a 2048 bit RSA private key
..+++
.............................+++
writing new private key to 'private.key'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [XX]:US
State or Province Name (full name) []:California
Locality Name (eg, city) [Default City]:Palo Alto
Organization Name (eg, company) [Default Company Ltd]:VMware, Inc
Organizational Unit Name (eg, section) []:VMware ESX Server Default Certificate
Common Name (eg, your name or your server's hostname) []:xxxx
Email Address []:ssl-certificates@vmware.com

[root@localhost certificate]# openssl x509 -inform der -in cert.crt -out private.pem
```

After executing `openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout pri_232.key -out cert_232.crt`, you need to fill in according to prompts, and all the information has been obtained in previous section.

After completion, you can see three files under in the `/root/certificate` directory: cert.crt/private.pem

```shell
[root@localhost certificate]# ls
cert.crt  private.key  private.pem
```

## Upload new certificate to ESXI

There are many ways to upload files, and I won't introduct them one by one here. The way I use it is open SSH login on the ESXI Web and upload the files to the `/root/` directory of ESXI using the `scp` command.

```shell
[root@localhost ~]# cd certificate
[root@localhost certificate]# scp cert.crt root@xxx.xxx.xxx.xxx:/root
[root@localhost certificate]# scp private.key root@xxx.xxx.xxx.xxx:/root
```

## Update certificate

> The operations here are all on ESXI node

1、backup old certificates

```shell
[root@localhost:~] cd /etc/vmware/ssl
[root@localhost:/etc/vmware/ssl] cp -a rui.crt rui.crt.240504bak
[root@localhost:/etc/vmware/ssl] cp -a rui.key rui.key.240504bak	
```

2、replace new certificate

```shell
[root@localhost:/etc/vmware/ssl] mv /root/cert.crt rui.crt
[root@localhost:/etc/vmware/ssl] mv /root/private.key rui.key
```

3、restart services

```shell
[root@localhost:/etc/vmware/ssl] /etc/init.d/hostd restart
[root@localhost:/etc/vmware/ssl] /etc/init.d/vpxa restart
```



[^1]:.csr: 证书签名请求(Certificate signing request),包含证书持有人的信息,如:国家、邮件、域名等信息;
[^2]: https://www.openssl.org/












