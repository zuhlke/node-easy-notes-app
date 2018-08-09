#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
kubectl delete statefulset mongo
kubectl delete svc mongo
kubectl delete pvc -l role=mongo