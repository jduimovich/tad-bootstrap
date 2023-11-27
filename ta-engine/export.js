nunjucks = require('nunjucks')
nunjucks.configure('', { autoescape: true
	// , throwOnUndefined: true 
});
const fs = require('fs');
const path = require("path"); 
const script_dir = path.dirname(process.argv[1])

// usage node.js export filename profile
// profile can be backstage or a filename with the mappings
// templates are maintained in Backstage naming "values.valueName" 
// naming format, but without the $ prefix 

if (process.argv.length != 4) {
	console.log('Usage expand filename <backstage or filename>');  
	process.exit(1);
}
function readObject(filename) { 
	const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
	return JSON.parse(data)
}
var pac_protected_vars = readObject(script_dir+"/expansions/pac.js") 
 
var filename = process.argv[2] 
var format = process.argv[3]   
var expansion=null;
if (format=="backstage") {  
	expansion = readObject(script_dir+"/expansions/backstage.js") 
} else { 
	expansion  = readObject(format)
}  

if (!expansion.values.rawUrl) {
	var TEMPLATE_REPO=process.env.TEMPLATE_REPO
	if (TEMPLATE_REPO.endsWith(".git")) { 
		TEMPLATE_REPO = TEMPLATE_REPO.substring(0, TEMPLATE_REPO.length-4) 
	}
	TEMPLATE_REPO=TEMPLATE_REPO+"/main" 
	expansion.values.rawUrl=TEMPLATE_REPO.replace("github.com", "raw.githubusercontent.com")
}

pac_protected_vars.forEach(element => {
	expansion[element] = "{{" + element + "}}"
});

// console.error ("----------EXPANSION ---------------") 
// console.error (JSON.stringify(expansion, null, 4)) 
// console.error ("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

nunjucks.render(filename, expansion,
	function (err, res) {
		if (err) { 
			console.log(err)
		} else { 
			console.log(res)
		}
	}) 
		 

