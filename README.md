# tad-http

An example of templates model for gitops bootstrapping
Repos are layed out in RHTAP formats.
Each component is a separate ArgoCD app

./templates exist for default yaml for types of apps.
Default templates provided

##http 
    - contains a deployment, service and route for an image listening on port 8080
    
##service 
    - contains a deployment, service listening on port 8080 

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


