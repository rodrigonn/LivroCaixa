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
		
		"/ajax/despesa/$id?"(resource:"despesa")
		
		"/ajax/tipodespesa/$id?"(resource:"tipoDespesa")
		
		"/"(view:"/index")
		"500"(view:'/error')
	}
}
