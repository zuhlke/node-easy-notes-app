#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
docker images --format '{{.Repository}}:{{.Tag}}' | grep easy-notes-app | xargs docker rmi
(cd .. && docker build -t eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v1 .)
gcloud docker -- push eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v1
kubectl run easy-notes-app --image=eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v1 --port=8080
kubectl get deployments
kubectl get pods
kubectl cluster-info
kubectl expose deployment easy-notes-app --type="LoadBalancer"