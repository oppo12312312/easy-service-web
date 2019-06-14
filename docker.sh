###
 # @Description: 
 # @Author: zhongshuai
 # @Date: 2019-06-11 22:08:20
 # @LastEditors: zhongshuai
 # @LastEditTime: 2019-06-14 10:07:07
###
git pull
echo stop design
docker stop design

echo rm ps design
docker rm design

echo rm image design
docker rmi design:v1

echo build design
docker build -t design:v1 .

echo start
docker run -d -p 1114:1114 -v /home/security/zhongshuai/upload:/home/www/express/upload  --restart=always --name design design:v1 