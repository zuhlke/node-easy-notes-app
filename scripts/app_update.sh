#!/usr/bin/env bash

cd "${0%/*}"

(cd .. && docker build -t eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v6 .)
gcloud docker -- push eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v6
#kubectl edit deployment easy-notes-app
kubectl set image deployment/easy-notes-app easy-notes-app=eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-app:v6
kubectl get deployments