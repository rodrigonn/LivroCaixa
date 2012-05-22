package livrocaixa

import grails.converters.JSON

class TipoGastoController {

	def scaffold = true

	def show = {
		if(params.id) {
			render TipoGasto.get(params.int('id')) as JSON
		} else {
			params.max = Math.min(params.max ? params.int('max') : 10, 100)
			render TipoGasto.list(params) as JSON
		}
	}

	def tipoPorNome = {
		def tipos = TipoGasto.findAllByNomeLike('%' + params.pesquisa + '%')

		def lista = []

		for (tipo in tipos) {

			if (tipo.filhos.isEmpty()) {
				def mapa = [
							descricao: tipo.toString(),
							valor: tipo.nome,
							id: tipo.id]
				lista.add mapa
			}
		}

		render lista as JSON
	}
}
