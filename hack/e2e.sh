 
REPO=test-all 
rm -rf $REPO
gh repo delete $MY_GITHUB_USER/$REPO --yes
tab bootstrap $REPO
cd $REPO 
tab describe
tab ls 
tab suggest   

# reuse the tab repo
tad init  
tad describe
tad add-component c1
tad describe 
tad ls 


