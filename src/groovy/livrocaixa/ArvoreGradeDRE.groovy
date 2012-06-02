package livrocaixa

class ArvoreGradeDRE {

	ArvoreGradeGasto arvoreGasto
	ArvoreGradeReceita arvoreReceita

	public ArvoreGradeDRE(arvoreGasto, arvoreReceita) {
		this.arvoreGasto = arvoreGasto
		this.arvoreReceita = arvoreReceita
	}

	def getMapaGrade() {
		[linhas: getLinhas(), colunas: getDescricaoMeses(), celulas:getCelulas()]
	}

	def getMeses() {
		def meses = []

		arvoreGasto.getMeses().each {  meses.add it }

		arvoreReceita.getMeses().each {
			def descMes = it
			if (! meses.contains(descMes)) {
				meses.add descMes
			}
		}

		meses.sort {
			it.ano + "" + it.numeroMes
		}

		meses
	}
	
	def getDescricaoMeses() {
		def lista = []
		
		meses.each {
			lista.add(it.toString())
		}
		
		lista
	}
	
	def getLinhas() {
		def linhas = []

		arvoreReceita.getProdutos().each { linhas.add it }

		arvoreGasto.getTipos().each { linhas.add it }
		
		linhas.add( [nome:"Lucro", nivel:1 ] )

		linhas
	}

	def getCelulas() {
		def meses = getMeses()
		def lista = []

		addCelulas(lista, arvoreReceita.total, arvoreReceita.total, meses)
		addCelulas(lista, arvoreReceita.total, arvoreGasto.total, meses)

		criarLinhaLucro(meses, lista)
		
		lista
	}

	def criarLinhaLucro(meses, lista) {
		def colunas = []
		meses.each {
			def valorTotal = arvoreReceita.total.celulasMeses[it] ?: 0.0
			def receita = arvoreReceita.total.celulasMeses[it] ?: 0.0
			def gasto = arvoreGasto.total.celulasMeses[it] ?: 0.0
			def valorCelula = receita - gasto
			valorCelula = valorCelula ?: 0.0

			def percentual = 0.0
			if (valorTotal > 0.0) {
				percentual = 100 * (valorCelula / valorTotal)
			}

			colunas.add([valor: valorCelula, percentual: percentual])
		}
		lista.add(colunas)
	}
	
	def addCelulas(lista, linhaTotal, linha, meses) {
		def colunas = []

		meses.each {
			def valorTotal = linhaTotal.celulasMeses[it]
			def valorCelula = linha.celulasMeses[it]
			valorCelula = valorCelula ?: 0.0

			def percentual = 0.0
			if (valorTotal > 0.0) {
				percentual = 100 * (valorCelula / valorTotal)
			} 

			colunas.add([valor: valorCelula, percentual: percentual])
		}

		if (linha && !linha.filhas.isEmpty()) {
			linha.filhas.each { addCelulas(lista, linhaTotal, it, meses) }
		}

		lista.add(colunas)
	}
}