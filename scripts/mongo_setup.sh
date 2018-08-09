#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
kubectl apply -f ../resources/googlecloud_ssd.yaml
kubectl apply -f ../resources/mongo-statefulset.yaml