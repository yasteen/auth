#!/bin/bash

docker compose -f ./start.yml -f ./pg.yml -f ./mail.yml -f ./fe.yml --env-file ./stack.env up --build --force-recreate
