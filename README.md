# tad and tab CLI PoC 


A pair of CLIs which leverage a templates model similar to Backstage to enable authoring of pipelines and gitops bootstrapping.
Content is edited in a format which allows a template process to configure and "fill in the blanks" when creating projects as well as updating author enabled configurations. 

Pipelines are layed out in PaC as well as OpenShift-Pipelines template formats, and can be exported to Backstage format. 
Gitops are layed out in kustomize/overlay format per environment and use ArgoCD Applications to deploy. 

Pipelines and Repositories are layed out in RHTAP formats.

## Gitops

The Resource layout is in kustomize format.

An RHTAP application is represented by this repository 
There are two options for layout
`single`  - A single ArgoCD app is created and components in directories
`multiple` - Each Component is added via its own ArgoCD app.

Gitops default templates can be found in `./templates` and can be extended by adding new types of components.

To create a gitops repo, in any .git repo run `tad init`

The list of current default templates are 

### http 
    - contains a deployment, service and route for an image listening on port 8080
    - this matches the current RHTAP default deployment
    
### service 
    - contains a deployment, service listening on port 8080
    - this is a template which is similar to the http one, however does not expose a route, so an internal service only. 

### http-ab 
    - contains a deployment, service and route listening on port 8080
    - the route  supports A/B load splitting between two components 
    ```  
        tad set c1 service-a  80
        tad set c1 service-b  20 

## route-ab 
    - contains a route  supports A/B load splitting between two components initialized
    ```  
        tad add-component c1 service 
        tad add-component c2 service 
        tab set image c1 quay.io/jduimovich/fib-go
        tab set image c2 quay.io/jduimovich/fib-node
        tad add-component c3 route-ab
        tad set c3 service-a  80
        tad set c3 service-b  20
    ```

# Install
Install the `tad` command on your path, it is is found in the install directory.  You may also use it directly.

# Example usage

## Bootstrap a new gitops repo
``` 
tad bootstrap reponame
cd reponame
tad describe
tad add-component c1
tad describe
tad install-apps
```


