class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/ajax/$controller/$id?"{
			constraints {
			}
		}

		"/"(view:"/index")
		"500"(view:'/error')
	}
}
