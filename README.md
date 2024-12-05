# tad and tab CLI PoC 


Tab and Tad are CLIs which leverage a templates model similar to Backstage to enable authoring of pipelines and gitops bootstrapping.

Content is edited in a template format which allows a template (nunjunks)) to configure and "fill in the blanks" when creating projects. The templates and variables can be defined by customization and allows authors to configure new variables in their configurations. 

Pipelines are layed out in PaC format (PipelineRunners in .tekton directories). 
The tab template expansion can be exported to Backstage format. 
Openshift templates are also demonstrated but are not templated. 

Gitops repositories are layed out in kustomize/overlay format per environment and use ArgoCD Applications to deploy. 

Pipelines and Repositories have been reused directly from RHTAP [tssc-sample-pipelines.](https://github.com/redhat-appstudio/tssc-sample-pipelines)


# Pipelines
Default pipeline examples can be found in `https://github.com/redhat-appstudio/tssc-sample-pipelines`

`tab set-repo https://github.com/redhat-appstudio/tssc-sample-pipelines`

This will configure the users pipelines to come from a specific git repository. 
See `https://github.com/redhat-appstudio/tssc-sample-pipelines` for more information about these pipelines.

The default pipelines can also be updated from RHTAP Build Definition repository via `tab import-build-definitions` (obsolete, this is done in tssc-sample-pipelines automatically)

## Gitops

Gitops default templates can be found in `https://github.com/jduimovich/dance-standard-gitops.git` and the CLI needs to be initialized  to point to the these templates in git before using the CLI.

`tad set-repo https://github.com/jduimovich/dance-standard-gitops.git`


Gitops resources are layed out in kustomize format.

An RHTAP application is represented by this repository 
in a single ArgoCD application directory.


## Command Line Reference 

To create a gitops repo, in any .git repo run `tad init`. This will 

The list of current default templates found in the example repositories.  

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
 
` ln -s PATH-TO-/tad-bootstrap/common/cli  path-to-your-bin/tab `
` ln -s PATH-TO-/tad-bootstrap/common/cli  path-to-your-bin/tad `

This will a run a common cli ./common/cli and customize per tool name based on the link

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





