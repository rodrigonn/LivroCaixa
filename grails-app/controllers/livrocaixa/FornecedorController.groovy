package livrocaixa

import grails.converters.JSON

class FornecedorController {

    def scaffold = true
	
	def fornecedorPorNome = {
		def fornecedores = null
		
		if (params.pesquisa) {
			fornecedores = Fornecedor.findAllByNomeLike('%' + params.pesquisa + '%')
			
		} else {
			fornecedores = Fornecedor.list(params)
		}
		
		def lista = []
		for (fornecedor in fornecedores) {
			def mapa = [
						nome: fornecedor.nome,
						id: fornecedor.id]
			lista.add mapa
		}

		render lista as JSON
	}
}
