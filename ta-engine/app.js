nunjucks = require('nunjucks')
nunjucks.configure('pipelines', { autoescape: true
	// , throwOnUndefined: true 
});

// profile configurations
// templates are maintained in Backstage "values.valueName format"
// you can use any "template" format you like inside of {{ value }} format

// Expand templates profiles.
// gitops does a full expansion default "tad" replacements
// pac does a full expansion default "tad" replacements leaves the pac custom vars
// backstage is a direct copy into backstage templates

var profile= "tad"

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

var tad_vars = {  
}

var tab_vars = { 
	"parameters": { 
		"appname": "${{ parameters.appname }}"
	} ,
	"TAB_APP": "${{ parameters.appname }}",
	"TAB_COMPONENT": "YAY-component-replacement"
	"TAB_APP": "${{ parameters.appname }}",
	"TAB_COMPONENT": "YAY-component-replacement"
	"TAB_APP": "${{ parameters.appname }}",
	"TAB_COMPONENT": "YAY-component-replacement"
}
var pacexpand  = { 
	"TAB_APP": "${{ parameters.appname }}",
	"TAB_COMPONENT": "YAY-component-replacement"
}
// keep PaC variables as same, do not expand.
pac_protected_vars.forEach(element => {
	tabvars[element] = "{{" + element + "}}"
});

// run the expansion 
var templates_vars = {}
var filename = "'test.yaml'"
console.log (JSON.stringify(templates_vars, null, 4))
nunjucks.render(filename, templates_vars,
	function (err, res) {
		if (err) { 
			console.log(err)
		} else { 
			console.log(res)
		}
	}) 
		 

