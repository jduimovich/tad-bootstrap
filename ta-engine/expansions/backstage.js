 { 
	"values": { 
		"appName": "${{ values.name }}",
		"argoComponent": "${{ values.argoComponent }}",
		"image": "${{ values.image }}",
		"namespace": "${{ values.namespace }}",
		"name": "${{ values.name }}",
		"repoURL": "${{ values.repoURL }}",
		"dockerfileLocation": "Dockerfile",
		"buildContext": "."		
	} 
} 
   