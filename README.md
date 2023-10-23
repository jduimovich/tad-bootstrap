# tad-bootstrap


An example of templates model for pipelines and gitops bootstrapping

Pipelines and Repositories are layed out in RHTAP formats.

Gitops

The Resource layout is in kustomize format.
An RHTAP application is represented by the repository and set up as multiple ArgoCD apps.

Gitops default templates can be found in `./templates` and can be extended by adding new types of components.

The list of current default templates are 

## http 
    - contains a deployment, service and route for an image listening on port 8080
    - this matches the current RHTAP default deployment
    
## service 
    - contains a deployment, service listening on port 8080
    - this is a template which is similar to the http one, however does not expose a route, so an internal service only. 

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


