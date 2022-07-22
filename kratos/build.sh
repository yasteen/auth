#!/bin/bash

docker compose -f ./start.yml -f ./fe.yml -f ./pg.yml -f ./mail.yml up --build --force-recreate
