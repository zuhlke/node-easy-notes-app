set -x

gcloud config set project zuhlke-kubernetes-codelab
gcloud config set compute/zone europe-west2-c
kubectl create clusterrolebinding yue_wang_iris-cluster-admin-binding --clusterrole=cluster-admin --user=Yue.wang.iris@gmail.com
gcloud container clusters create easy-notes
