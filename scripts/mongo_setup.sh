set -x

gcloud config set project zuhlke-kubernetes-codelab
gcloud config set compute/zone europe-west2-c
kubectl apply -f ../resources/googlecloud_ssd.yaml
kubectl apply -f ../resources/mongo-statefulset.yaml