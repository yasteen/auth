#!/bin/bash

docker compose -f ./start-static.yml -f ./pg.yml -f ./mail.yml up --build --force-recreate
