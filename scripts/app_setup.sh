#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
docker images --format '{{.Repository}}:{{.Tag}}' | grep easy-notes-app | xargs docker rmi -f
(cd .. && docker build -t eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v6 .)
gcloud docker -- push eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v6
kubectl run easy-notes-app --image=eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v6 --port=8082
kubectl get deployments
kubectl get pods
kubectl cluster-info
kubectl expose deployment easy-notes-app --type="LoadBalancer"