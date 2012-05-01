package livrocaixa

import grails.converters.JSON
import org.springframework.dao.DataIntegrityViolationException

class DespesaController {

	def index = {
		redirect(action: "list", params: params)
	}

	def list = {
		params.max = Math.min(params.max ? params.int('max') : 10, 100)
		[despesaInstanceList: Despesa.list(params), despesaInstanceTotal: Despesa.count()]
	}
	
	def save = {
		params.data = params.data as Date
		def despesa = new Despesa(params)
		despesa.tipoDespesa = TipoDespesa.get(params.int('tipoDespesaId'))
		if (despesa.save(flush: true)) {
			response.status = 201 // Created
			render despesa as JSON
		} else {
			response.status = 500 //Internal Server Error
			println(despesa.errors)
			render "Não foi possível criar a nova despesa:\n ${despesa.errors}"
		}
	}

	def show = {
		if(params.id) {
			render Despesa.get(params.int('id')) as JSON
		} else {
			params.max = Math.min(params.max ? params.int('max') : 10, 100)
			render Despesa.list(params) as JSON
		}
	}

	def update = {
		def despesa = Despesa.get(params.int('id'))
		despesa.properties = params
		despesa.tipoDespesa = TipoDespesa.get(params.int('tipoDespesaId'))
		
		if (despesa.save(flush: true)) {
			response.status = 201 // Created
			render despesa as JSON
		} else {
			response.status = 500 //Internal Server Error
			render "Não foi possível editar a despesa:\n ${despesa.errors}"
		}
	}

	def delete = {
		if(params.id) {
			def despesa = Despesa.get(params.int('id'))
			if(despesa) {
				despesa.delete()
				render "Remoção efetuada com sucesso."
			} else {
				response.status = 404 //Not Found
				render "${params.id} não encontrado."
			}
		} else {
			response.status = 400 //Bad Request
			render """A requisição DELETE deve incluir o id da despesa
			Exemplo: /ajax/despesa/id
			"""
		}
	}
}