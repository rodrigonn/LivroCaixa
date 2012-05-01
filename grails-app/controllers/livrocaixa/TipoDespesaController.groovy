package livrocaixa

import grails.converters.JSON

class TipoDespesaController {

    def scaffold = true
	
	def show = {
		if(params.id) {
			render TipoDespesa.get(params.int('id')) as JSON
		} else {
			params.max = Math.min(params.max ? params.int('max') : 10, 100)
			render TipoDespesa.list(params) as JSON
		}
	}

}
