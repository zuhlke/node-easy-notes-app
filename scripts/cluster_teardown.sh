#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
gcloud container clusters delete easy-notes