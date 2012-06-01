package livrocaixa

import grails.converters.JSON

class VendedorController {

    def scaffold = true
	
	def vendedorPorNome = {
		def vendedores = null
		
		if (params.pesquisa) {
			vendedores = Vendedor.findAllByNomeLike('%' + params.pesquisa + '%')
			
		} else {
			vendedores = Vendedor.list(params)
		}
		

		def lista = []

		for (vendedor in vendedores) {

			def mapa = [
						nome: vendedor.nome,
						id: vendedor.id]
			lista.add mapa
		}

		render lista as JSON
	}

}
