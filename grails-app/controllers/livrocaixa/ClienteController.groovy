package livrocaixa

import grails.converters.JSON

class ClienteController {

    def scaffold = true
	
	def clientePorNome = {
		def clientes = null
		
		if (params.pesquisa) {
			clientes = Cliente.findAllByNomeLike('%' + params.pesquisa + '%')
			
		} else {
			clientes = Cliente.list(params)
		}
		

		def lista = []

		for (cliente in clientes) {

			def mapa = [
						nome: cliente.nome,
						id: cliente.id]
			lista.add mapa
		}

		render lista as JSON
	}

}
