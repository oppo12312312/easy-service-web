###
 # @Description: 
 # @Author: zhongshuai
 # @Date: 2019-06-11 22:08:20
 # @LastEditors: zhongshuai
 # @LastEditTime: 2019-06-11 22:15:22
###
docker stop design

docker rm design

docker rmi design:v1

docker build -t design:v1 .

docker run -d -p 1114:1114 --name design design:v1