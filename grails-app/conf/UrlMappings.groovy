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

		"/ajax/vendedor/porNome" (controller:"vendedor", action:"vendedorPorNome")
		"/ajax/cliente/porNome" (controller:"cliente", action:"clientePorNome")
		"/ajax/produto/porNome" (controller:"produto", action:"produtoPorNome")
		"/ajax/tipogasto/porNome" (controller:"tipoGasto", action:"tipoPorNome")
		
		"/ajax/gasto/relatorio" (controller:"gasto", action:"relatorio")
		"/ajax/gasto/$id?"(resource:"gasto")
		
		"/ajax/tipogasto/$id?"(resource:"tipoGasto")

		"/ajax/venda/$id?"(resource:"venda")
		
		"/"(view:"/index")
		"500"(view:'/error')
	}
}
