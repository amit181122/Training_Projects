var redis = require('redis');

const redisConnection =   redis.createClient({
       host : 'redis-18157.c305.ap-south-1-1.ec2.cloud.redislabs.com',
       port: 6379,

   });


module.exports = redisConnection