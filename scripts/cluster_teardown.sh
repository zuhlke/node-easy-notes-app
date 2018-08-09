set -x

gcloud config set project zuhlke-kubernetes-codelab
gcloud config set compute/zone europe-west2-c
gcloud container clusters delete easy-notes