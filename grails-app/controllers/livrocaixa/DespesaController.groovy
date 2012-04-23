package livrocaixa

import grails.converters.JSON

class DespesaController {

	def scaffold = true

	def exemplo = {
		render "ABC"
	}

	def fieldEdit = {
		println(params)
	}
		
	def listJSON = {
		def sortIndex = params.sidx ?: 'name'
		def sortOrder  = params.sord ?: 'asc'
		def maxRows = Integer.valueOf(params.rows)
		def currentPage = Integer.valueOf(params.page) ?: 1
		def rowOffset = currentPage == 1 ? 0 : (currentPage - 1) * maxRows
		def despesas = Despesa.createCriteria().list(max: maxRows, offset: rowOffset){
			if (params.tipoDespesa)
				ilike('tipoDespesa.nome', "%${params.tipoDespesa}%")

			if (params.data)
				ilike('data', "%${params.data}%")

			if (params.valor)
				ilike('valor', "%${params.valor}%")

			order(sortIndex, sortOrder)
		}

		def totalRows = despesas.totalCount
		def numberOfPages = Math.ceil(totalRows / maxRows)

		def results = despesas?.collect {
			[
						cell: [
							it.tipoDespesa.nome,
							it.data,
							it.valor
						],
						id: it.id
					]
		}

		def jsonData = [rows: results, page: currentPage, records: totalRows, total: numberOfPages]
		render jsonData as JSON
	}
}
