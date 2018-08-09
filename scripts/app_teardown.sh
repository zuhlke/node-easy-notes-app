#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
docker build -t eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v1 .
gcloud docker -- push eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v1
kubectl run easy-notes --image=eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v1 --port=8080
kubectl get deployments
kubectl get pods
kubectl cluster-info