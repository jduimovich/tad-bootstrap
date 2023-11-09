# http-ab
    A standard HTTP application consisting of a deployment, service and route.
    The route maintains an A/B test config using alternativeBackend: 

## Day 2 edit/update operations supported:
    set/get image
    set/get replicas 

## A/B operations supported:
### Set service maps for A and B. 
    set/get service-a 
    set/get service-b

### Setting weights for each service.
    set/get weight-a        
    set/get weight-b 
