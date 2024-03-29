class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/ajax/vendedor/porNome" (controller:"vendedor", action:"vendedorPorNome")
		"/ajax/cliente/porNome" (controller:"cliente", action:"clientePorNome")
		"/ajax/fornecedor/porNome" (controller:"fornecedor", action:"fornecedorPorNome")
		"/ajax/produto/porNome" (controller:"produto", action:"produtoPorNome")
		"/ajax/tipogasto/porNome" (controller:"tipoGasto", action:"tipoPorNome")
		
		"/ajax/compra/relatorio" (controller:"compra", action:"relatorio")
		"/ajax/venda/relatorio" (controller:"venda", action:"relatorio")
		"/ajax/venda/dre" (controller:"venda", action:"dre")
		"/ajax/gasto/relatorio" (controller:"gasto", action:"relatorio")

		"/ajax/gasto/$id?"(resource:"gasto")
		"/ajax/tipogasto/$id?"(resource:"tipoGasto")
		"/ajax/venda/$id?"(resource:"venda")
		"/ajax/compra/$id?"(resource:"compra")
		
		"/"(view:"/index")
		"500"(view:'/error')
	}
}