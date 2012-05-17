package livrocaixa

import java.text.DateFormat;
import java.text.SimpleDateFormat

import grails.converters.JSON
import org.springframework.dao.DataIntegrityViolationException

class GastoController {
	
	DateFormat df = new SimpleDateFormat('dd/MM/yyyy')

	def index = {
		redirect(action: "list", params: params)
	}

	def list = {
		params.max = Math.min(params.max ? params.int('max') : 10, 100)
		[gastoInstanceList: Gasto.list(params), gastoInstanceTotal: Gasto.count()]
	}

	def save = {
		def gasto = new Gasto(params)
		gasto.tipoGasto = TipoGasto.get(params.int('tipoGastoId'))

		if (gasto.save(flush: true)) {
			response.status = 201 // Created
			render gasto as JSON
		} else {
			response.status = 500 //Internal Server Error
			render "Não foi possível criar o novo gasto:\n ${gasto.errors}"
		}
	}

	def update = {
		def gasto = Gasto.get(params.int('id'))
		gasto.properties = params
		gasto.tipoGasto = TipoGasto.get(params.int('tipoGastoId'))

		if (gasto.save(flush: true)) {
			response.status = 201 // Created
			render gasto as JSON
		} else {
			response.status = 500 //Internal Server Error
			render "Não foi possível editar o gasto:\n ${gasto.errors}"
		}
	}

	def show = {
		if(params.id) {
			render Gasto.get(params.int('id')) as JSON
		} else {
			params.max = Math.min(params.max ? params.int('max') : 10, 100)
			render Gasto.list(params) as JSON
		}
	}

	def delete = {
		if(params.id) {
			def gasto = Gasto.get(params.int('id'))
			if(gasto) {
				gasto.delete()
				render "Remoção efetuada com sucesso."
			} else {
				response.status = 404 //Not Found
				render "${params.id} não encontrado."
			}
		} else {
			response.status = 400 //Bad Request
			render """A requisição DELETE deve incluir o id do gasto
			Exemplo: /ajax/gastos/id
			"""
		}
	}
	
	def relatorioDER = {
		def res = 
			Gasto.executeQuery(
				"select g.tipoGasto.id, g.tipoGasto.nome, " + 
					"MONTH(g.data), YEAR(g.data), SUM(g.valor) " + 
				"from Gasto g " + 
				"group by YEAR(g.data), MONTH(g.data), g.tipoGasto.id " +
				"order by YEAR(g.data), MONTH(g.data)")

		ArvoreGradeGasto arvore = new ArvoreGradeGasto()

		res.each {
			arvore.adicionarCelula(it)
		}		
		
		render arvore.getMapaGrade() as JSON
	}
	
//	def processaLinha(grade, linha) {
//		def idTipoGasto = linha[0]
//		def mes = "${linha[2]}/${linha[3]}"
//		
//		if (!grade.meses.contains(mes)) {
//			grade.meses.add(mes)
//		}
//		
//		if (grade[idTipoGasto]) {
//			//Já tem o mapa
//		} else {
//			grade[idTipoGasto] = [nome: linha[1]]
//		}
//		
//		grade[idTipoGasto][mes] = linha[4] 
//	}
}