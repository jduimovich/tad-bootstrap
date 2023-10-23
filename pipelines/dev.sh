 
cp bootstrap-stub-push.yaml run.yaml
REVISION=$(git rev-parse HEAD) 
TAB_REPO=$(git config --get remote.origin.url)  
sed -i s!{{repo_url}}!$TAB_REPO!g run.yaml 
sed -i s!{{revision}}!$REVISION!g run.yaml 
sed -i s!{{ git_auth_secret }}!quay-secret!g run.yaml 
