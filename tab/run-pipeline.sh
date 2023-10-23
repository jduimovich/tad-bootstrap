SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )" 
source $SCRIPTDIR/configure  

cp $PIPELINES_DIR/bootstrap-stub-push.yaml run.yaml
REVISION=$(git rev-parse HEAD) 
TAB_REPO=$(git config --get remote.origin.url)  
sed -i s!{{repo_url}}!$TAB_REPO!g run.yaml 
sed -i s!{{revision}}!$REVISION!g run.yaml 
sed -i s!{{ git_auth_secret }}!quay-secret!g run.yaml 
 
# need to fill this in 
oc create secret generic quay-secret  
oc apply -f run.yaml 