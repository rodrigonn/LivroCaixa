package livrocaixa

import grails.converters.JSON
import java.text.SimpleDateFormat

class CompraController {

	//TODO colocar no util
	def sdf = new SimpleDateFormat('dd/MM/yyyy')

	def decimal(str) {
		str.replace(',', '.').toDouble()
	}


	def index() {
		redirect(action: "list", params: params)
	}

	def list() {
		params.max = Math.min(params.max ? params.int('max') : 10, 100)
		[compraInstanceList: Compra.list(params), compraInstanceTotal: Compra.count()]
	}

	def save = {
		def json = request.JSON

		def compra = new Compra()
		compra.fornecedor = Fornecedor.get(json.fornecedorId.toInteger())
		compra.data = sdf.parse(json.data)
		compra.numeroNotaFiscal = json.numeroNotaFiscal.toLong()
		compra.status = "Em aberto"
		compra.valorPago = 0.0

		for (item in json.itens) {
			def i = new ItemCompra()
			i.produto = Produto.get(item.produtoId.toInteger())
			i.compra = compra
			i.quantidade = decimal(item.quantidade)
			i.valorUnitario = decimal(item.valorUnitario)
			compra.addToItensCompra(i)
		}

		if (compra.save(flush: true)) {
			response.status = 201 // Created
			render compra as JSON

		} else {
			response.status = 500 //Internal Server Error
			render "Não foi possível criar a nova compra:\n ${compra.errors}"
		}
	}

	def update = {
		def compraInstance = Compra.get(params.int('id'))
		compraInstance.properties = params
		//		gasto.tipoGasto = TipoGasto.get(params.int('tipoGastoId'))

		if (compraInstance.save(flush: true)) {
			response.status = 201 // Created
			render compraInstance as JSON
		} else {
			response.status = 500 //Internal Server Error
			render "Não foi possível editar a compra:\n ${compraInstance.errors}"
		}
	}

	def show = {
		if(params.id) {
			render Compra.get(params.int('id')) as JSON
		} else {
			def paramMax = params.max ? params.int('max') : 10
			params.max = Math.min(paramMax ?: 10, 100)
			render Compra.list(params) as JSON
		}
	}

	def delete = {
		if(params.id) {
			def compraInstance = Compra.get(params.int('id'))
			if(compraInstance) {
				compraInstance.delete()
				render "Remoção efetuada com sucesso."
			} else {
				response.status = 404 //Not Found
				render "${params.id} não encontrado."
			}
		} else {
			response.status = 400 //Bad Request
			render """A requisição DELETE deve incluir o id da compra
			Exemplo: /ajax/compra/id
			"""
		}
	}

	def relatorioCompras = { }
	
	def relatorio = {
		ArvoreGradeCompra arvore = new ArvoreGradeCompra()
		def mapa = arvore.getMapaGrade()
		render mapa as JSON
	}
}