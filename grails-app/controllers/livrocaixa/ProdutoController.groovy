package livrocaixa

import grails.converters.JSON

class ProdutoController {

    def scaffold = true
	
	def produtoPorNome = {
		def produtos = Produto.findAllByNomeLike('%' + params.pesquisa + '%')

		def lista = []

		for (produto in produtos) {

			def mapa = [
						descricao: produto.toString(),
						valor: produto.nome,
						id: produto.id,
						preco: 10.01]
			lista.add mapa
		}

		render lista as JSON
	}

}
