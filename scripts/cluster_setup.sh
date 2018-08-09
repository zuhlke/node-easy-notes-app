#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
kubectl create clusterrolebinding yue_wang_iris-cluster-admin-binding --clusterrole=cluster-admin --user=Yue.wang.iris@gmail.com
gcloud container clusters create easy-notes
