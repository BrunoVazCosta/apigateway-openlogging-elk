## Create a release

### 1. Merge develop into master
  - make sure no .only or debugger instruction is still in the code

### 2. Update Helm dependencies
- helm repo update 
- helm dep update

### 3. Bump version number
- helm/values.yaml
  - Set the `"imageTag": "v3.0.0",` for APIBuilder4Elastic
- helm/Chart.yaml
  - Set the Helm-Chart `"version": "v3.0.0",`
  - Set the App `"appVersion": "v3.0.0",` to the same version number
- helm/README.md
  - Replace previous version with new version
  - For example:
  - `helm install -n apim-e .... teway-openlogging-elk/releases/download/v3.0.0/helm-chart-apim4elastic-v3.0.0.tgz`
- docker-compose.yml
  - `image: cwiechmann/apibuilder4elastic:v2.0.0`
- apibuilder4elastic/package.json
  - `"version": "v2.0.0",`
- UPDATE.md
  - `"version": "v2.0.0",`
  - Adjust/Verify version table
- README.md
  - `"version": "v2.0.0",`

### 4. Modify the CHANGELOG.md
- Add/Verify recent changes
- Set the release version and date

### 5. Create the release
- Create a new release on Github with the tag name: e.g. v2.0.2

### 6. Merge back master to developer for next development iteration

## Export Kibana Dashboards

In Kibana --> Stack Management --> Saved Objects

Select the tags `apis` to export the API-Overview dashboard into file: `Axway-api-overview.ndjson`
Select the tags `kpis` to export the API-Overview dashboard into file: `Axway-api-management-kpis.ndjson`

Make sure: __Include related objects__ is selected and overwrite the existing file.

Take care about the following error: _Your file is downloading in the background. Some related objects could not be found. Please see the last line in the exported file for a list of missing objects._  
Open the exported file and check the missingRefCount & missingReferences. If everything looks okay you may fix the problem manually and try to reimport it.

## Run tests

### Run Integration-Tests

Clone the project
change the elasticsearch/docker-compose.es01.yml --> - xpack.security.enabled=true to - xpack.security.enabled=false
docker-compose -f elasticsearch/docker-compose.es01.yml -f elasticsearch/docker-compose.es01init.yml up -d
cd apibuilder4elastic
npm install 
npm test

To run only individual tests you may set `it.only(.....)`

## Create the shipped certificates

To generate the sample keys and certificates we are using the Elasticsearch cert-util: 
https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html

Within a running Elasticsearch instance docker container:  
`docker exec -it elasticsearch1 sh`

Create an instances.yml in the Elasticsearch home directory:  
```yml
instances:
  - name: "elasticsearch1"
    dns:
      - "elasticsearch1"
      - "localhost"
      - "api-env"
      - "*.ec2.internal"
      - "*.compute-1.amazonaws.com"
      - "*.cloudapp.azure.com"
  - name: "kibana"
    dns:
      - "kibana"
      - "localhost"
      - "api-env"
      - "*.ec2.internal"
      - "*.compute-1.amazonaws.com"
      - "*.cloudapp.azure.com"
  - name: "apibuilder4elastic"
    dns:
      - "apibuilder4elastic"
      - "localhost"
      - "api-env"
      - "*.ec2.internal"
      - "*.compute-1.amazonaws.com"
      - "*.cloudapp.azure.com"
  - name: "apm-server"
    dns:
      - "apm-server"
      - "localhost"
      - "api-env"
      - "*.ec2.internal"
      - "*.compute-1.amazonaws.com"
      - "*.cloudapp.azure.com"
```

Run elasticsearch-certutil:  
`bin/elasticsearch-certutil cert --silent --in instances.yml --out sample-certificates.zip --pem --keep-ca-key`

Copy the ZIP-File:  
`docker cp elasticsearch1:/usr/share/elasticsearch/sample-certificates.zip .`

Store the certificates in the config/certificates folder

## Elastic commands 

Run if Shards are not assigned to see the reason:  
`GET /_cluster/allocation/explain`

Assign the entire index to a specific Node as it is needed to shrink:  
```
PUT /apigw-traffic-details-eu-000001/_settings
{
  "settings": {
    "index.routing.allocation.require._name": "Elasticsearch1", 
    "index.blocks.write": true                                    
  }
}
```

Go to a specific ILM-Step:
```
POST _ilm/move/apigw-traffic-details-eu-000001
{
  "current_step": { 
    "phase": "warm",
    "action": "shrink",
    "name": "shrunk-shards-allocated"
  },
  "next_step": { 
    "phase": "warm",
    "action": "shrink",
    "name": "shrink"
  }
}
```

Retry an ILM-Step:
```
POST /apigw-traffic-details-eu-000001/_ilm/retry
```

mount failed: exit status 32 when use EBS volume at Kubernetesbe

https://stackoverflow.com/questions/66090226/mount-failed-exit-status-32-when-use-ebs-volume-at-kubernetes

At the end, all we need to do is were add the flag --cloud-provider=aws in the /var/lib/kubelet/kubeadm-flags.env in all nodes + master.