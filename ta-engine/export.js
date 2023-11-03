nunjucks = require('nunjucks')
nunjucks.configure('', { autoescape: true
	// , throwOnUndefined: true 
});
 
// usage node.js export filename profile
// profile configurations
// templates are maintained in Backstage naming "values.valueName" 
// naming format, but without the $ in front 

// expanded templates profiles.
// default does a full expansion using default_expansion replacements which are passed in
// pac does a default_expansion  but leaves the pac vars alone
// backstage converts into backstage format to include copy/pasted into 

// PaC templates use these so they get protected in any expansion
var pac_protected_vars = [
	"event_type",
	"git_auth_secret",
	"pull_request_number",
	"repo_name",
	"repo_owner",
	"repo_url",
	"revision",
	"sender",
	"source_branch",
	"source_url",
	"target_branch",
	"target_namespace"
]

// console.error ("!!!!!!!!!!!!!! ")
// console.error ("process.env.APPNAME", process.env.APPNAME)
// console.error ("process.env.ARGOCOMPONENT",process.env.ARGOCOMPONENT)
// console.error ("process.env.IMAGE",process.env.IMAGE)
// console.error ("process.env.NAMESPACE",process.env.NAMESPACE)
// console.error ("process.env.NAME",process.env.NAME)
// console.error ("process.env.REPOURL",process.env.REPOURL)
// console.error ("!!!!!!!!!!!!!! ")
// default expands the vars to values 
var default_expansion = {  
	"values": { 
		"appName": process.env.APPNAME,
		"argoComponent": process.env.ARGOCOMPONENT,
		"image": process.env.IMAGE,
		"namespace": process.env.NAMESPACE,
		"name": process.env.NAME,
		"repoURL": process.env.REPOURL,
		"dockerfileLocation": "Dockerfile",
		"buildContext": ".",
	} 
} 

// backstage expands the vars to templates in backstage format 
var backstage_expansion = { 
	"values": { 
		"appName": "${{ values.name }}",
		"argoComponent": "${{ values.argoComponent }}",
		"image": "${{ values.image }}",
		"namespace": "${{ values.namespace }}",
		"name": "${{ values.name }}",
		"repoURL": "${{ values.repoURL }}",
		"dockerfileLocation": "Dockerfile",
		"buildContext": ".",
		
	} 
} 
  
if (process.argv.length === 2) {
	console.log('Usage expand filename <tad,tab,backstage>');
	console.log('tad - expand all vars, default');
	console.log('tab - expand all vars, exclude PaC variables');
	console.log('backstage - expand all vars into backstage format');
	process.exit(1);
}
if (process.argv.length >= 3){
	filename = process.argv[2] 
}
var format="tad"
if (process.argv.length === 4){
	format = process.argv[3] 
} 

// run the expansion 
var expansion = default_expansion
if (format=="backstage") {  
	expansion = backstage_expansion 
}
pac_protected_vars.forEach(element => {
	expansion[element] = "{{" + element + "}}"
});

nunjucks.render(filename, expansion,
	function (err, res) {
		if (err) { 
			console.log(err)
		} else { 
			console.log(res)
		}
	}) 
		 

