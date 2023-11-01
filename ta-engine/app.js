nunjucks = require('nunjucks')
nunjucks.configure('pipelines', { autoescape: true, throwOnUndefined: true });
 
var pacvars = [ "revision", "git_auth_secret", "repo_url" ] 
var tabvars = { 
	"TAB_APP": "${{ parameters.appname }}",
	"TAB_COMPONENT": "YAY-component-replacement"
}
var pac-expand  = { 
	"TAB_APP": "${{ parameters.appname }}",
	"TAB_COMPONENT": "YAY-component-replacement"
}
// keep PaC variables as same, do not expand.
pacvars.forEach(element => {
	tabvars[element] = "{{" + element + "}}"
});
console.log (JSON.stringify(tabvars, null, 4))
nunjucks.render('test.yaml', tabvars,
	function (err, res) {
		if (err) { 
			console.log(err)
		} else { 
			console.log(res)
		}
	}) 
		 

