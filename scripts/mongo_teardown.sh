set -x

gcloud config set project zuhlke-kubernetes-codelab
gcloud config set compute/zone europe-west2-c
kubectl delete statefulset mongo
kubectl delete svc mongo
kubectl delete pvc -l role=mongo