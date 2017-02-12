# How to get your React site online
...and fast

## Our little example site
- Uses Next.js
- The entire site is defined from `pages/` and `components/`
- Comes with its own web-server
- Took 5 minutes (I can do a demo, if we have time)

## Zeit's now.sh
- `npm install -g now`

## Heroku

## Docker
This assumes you have Docker installed.

- See `example/Dockerfile`.
- To build:
    - `cd example`
    - `docker build -t andrioid/example .` (replace andrioid/example with your container name)
- Push to container registry (we use Google)
    - `docker tag andrioid/example gcr.io/andridk-154012/example`
    - `gcloud docker -- push gcr.io/andridk-154012/example`
- Run in terminal and delete on exit: `docker run -ti --rm -p 3000:3000 andrioid/example` (ports are hostport:containerport)

- Note: For production it's nice to split up the Docker builds for faster deployment times.
    1. Base image (e.g. node:6)
    2. Dependencies
    3. Your application 

## Kubernetes (on Google Container/Kubernetes Engine)
For further info, see: https://kubernetes.io/docs/tutorials/stateless-application/hello-minikube/

This assumes you have a running cluster on GKE. See the [documentation](https://cloud.google.com/container-engine/docs/clusters/operations) to make one for yourself.

### Preperations

1. Install the Google Cloud SDK
2. Install the Kubernetes client:
`gcloud components install kubectl`
3. Initialize the SDK: `gcloud init`
4. Connect kubectl with my cluster: `gcloud container clusters get-credentials cluster-1`
5. Ensure kubectl has authorization: `gcloud auth application-default login`

### Service Definitions
Quick glossary:
- Pods: One or more containers on the cluster in a group
- Node: The physical or virtual machine, running the pod
- Service: Connects the pods to other machines. Can be internal, external or both.
- Ingress: (Not covered here) configures load balancers and other advanced ways of connecting to the service. 

#### example.yaml (deployment file)
How to run our example site and how many replicas.

#### example-service.yaml (service file)
Defines how it's possible to connect to the pods.

#### namespace.yaml
I like things tidy, so our little example project gets its own namespace on the cluster.

### Apply the definition files

- `kubectl apply -f namespace.yaml`
- `kubectl apply -f deployment.yaml`
- `kubectl apply -f service.json`
- Go into services for the 'aalborg-react' namespace and notice the external endpoint 
- Scale!