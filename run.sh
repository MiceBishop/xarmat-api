#!/bin/bash
cd /home/ec2-user/xarmat-api
docker-compose build --no-cache
docker-compose up -d