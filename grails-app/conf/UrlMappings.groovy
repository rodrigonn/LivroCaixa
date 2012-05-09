class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

//		"/ajax/$controller/$id?"{
//			constraints {
//			}
//		}
		
		"/ajax/gasto/$id?"(resource:"gasto")
		
		"/ajax/tipogasto/$id?"(resource:"tipoGasto")
		
		"/"(view:"/index")
		"500"(view:'/error')
	}
}
