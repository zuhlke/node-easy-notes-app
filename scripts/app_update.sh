#!/usr/bin/env bash

cd "${0%/*}"

(cd .. && docker build -t eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v5 .)
gcloud docker -- push eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v5
kubectl edit deployment easy-notes-app
kubectl get deployments