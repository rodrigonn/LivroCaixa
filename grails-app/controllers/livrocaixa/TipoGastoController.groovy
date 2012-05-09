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

}
