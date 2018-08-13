#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
docker images --format '{{.Repository}}:{{.Tag}}' | grep easy-notes-app | xargs docker rmi -f
(cd .. && docker build -t eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v1 .)
docker run -d --link easy-notes-db:mongo --name=easy-notes-app eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v1 -p 8082:8082