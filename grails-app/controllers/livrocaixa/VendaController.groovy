package livrocaixa

import grails.converters.JSON

class VendaController {

    def index() {
        redirect(action: "list", params: params)
    }

    def list() {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [vendaInstanceList: Venda.list(params), vendaInstanceTotal: Venda.count()]
    }

    def save = {
        def vendaInstance = new Venda(params)
//		gasto.tipoGasto = TipoGasto.get(params.int('tipoGastoId'))
		
		if (vendaInstance.save(flush: true)) {
			response.status = 201 // Created
			render vendaInstance as JSON

        } else {
			response.status = 500 //Internal Server Error
        	render "Não foi possível criar a nova venda:\n ${vendaInstance.errors}"
        }
    }

    def update = {
        def vendaInstance = Venda.get(params.int('id'))
        vendaInstance.properties = params
//		gasto.tipoGasto = TipoGasto.get(params.int('tipoGastoId'))
		
        if (vendaInstance.save(flush: true)) {
			response.status = 201 // Created
			render vendaInstance as JSON
        } else {
			response.status = 500 //Internal Server Error
			render "Não foi possível editar a venda:\n ${vendaInstance.errors}"
        }
    }
	
	def show = {
		if(params.id) {
			render Venda.get(params.int('id')) as JSON
		} else {
			def paramMax = params.max ? params.int('max') : 10
			params.max = Math.min(paramMax ?: 10, 100)
			render Venda.list(params) as JSON
		}
	}

	def delete = {
		if(params.id) {
			def vendaInstance = Venda.get(params.int('id'))
			if(vendaInstance) {
				vendaInstance.delete()
				render "Remoção efetuada com sucesso."
			} else {
				response.status = 404 //Not Found
				render "${params.id} não encontrado."
			}
		} else {
			response.status = 400 //Bad Request
			render """A requisição DELETE deve incluir o id da venda
			Exemplo: /ajax/venda/id
			"""
		}
	}
}