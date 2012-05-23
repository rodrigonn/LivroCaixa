package livrocaixa

class ArvoreGradeGasto {

	LinhaGradeGasto total = new LinhaGradeGasto()
	List<Mes> meses = new ArrayList<Mes>()
	
	def adicionarCelula(resultSet) {
		def idTipoGasto = resultSet[0]
		Mes mes = new Mes(numeroMes: resultSet[2], ano: resultSet[3])
		
		if (! (mes in meses)) {
			meses.add(mes)
			meses.sort { it.ano + "" + it.numeroMes }
		}
		
		LinhaGradeGasto linha = getLinha(idTipoGasto)
		linha.adicionarCelula(mes, resultSet[4])
	}
	
	def getLinha(idTipoGasto) {
		def linha = getLinhaPorId(idTipoGasto, total.filhas)
		
		if (!linha){ 
			def tipo = TipoGasto.get(idTipoGasto)
			linha = criarLinha(tipo)
		}
		
		linha
	}
	
	def getLinhaPorId(idTipoGasto, linhas){
		if (!linhas || linhas.isEmpty()) {
			return null
		}
		
		for (it in linhas) {
			if (it.tipo.id == idTipoGasto) {
				return it
			} 
			
			def linha = getLinhaPorId(idTipoGasto, it.filhas)
			if (linha) {
				return linha
			}
		}
		
		null
	}
	
	def criarLinha(tipo) {
		def linha = new LinhaGradeGasto(tipo: tipo)
		
		if (tipo.pai) {
			def linhaPai = getLinha(tipo.pai.id)
			linhaPai.filhas.add(linha)
			linha.pai = linhaPai
			
		} else {
			total.filhas.add(linha)
			linha.pai = total
		}
		
		linha
	}
	
	def getMapaGrade() {
		def tipos = getTipos()
		def strMeses = getDescricaoMeses()
		[linhas: tipos, colunas: strMeses, celulas:getCelulas(tipos)]
	}
	
	def getDescricaoMeses() {
		def lista = []
		
		meses.each {
			lista.add(it.toString())
		}
		
		lista
	}
	
	def getTipos() {
		def lista = []
		
		addTipos(lista, total, 1)
		
		lista
	}
	
	def addTipos(lista, linha, nivel) {
		
		def nome = null
		if (linha.tipo) {
			nome = linha.tipo.nome
		} else {
			nome = "Custo/Despesas"
		}
		
		def mapa = [
			nome : nome, 
			nivel : nivel
		]
		
		lista.add(mapa)
		
		if (linha && !linha.filhas.isEmpty()) {
			linha.filhas.each {
				addTipos(lista, it, nivel + 1)
			}
		}
	}
	
	def getCelulas(tipos) {
		def lista = []
		
		addCelulas(lista, total)
		
		lista
	}
	
	def addCelulas(lista, linha) {
		def colunas = []
		
		meses.each {
			def valorTotal = total.celulasMeses[it]
			def valorCelula = linha.celulasMeses[it]
			valorCelula = valorCelula ?: 0.0

			def percentual = 0.0			
			if (valorTotal > 0.0) {
				percentual = 100 * (valorCelula / valorTotal)
			} 
			
			colunas.add([valor: valorCelula, percentual: percentual])
		}
		
		lista.add(colunas)
		
		if (linha && !linha.filhas.isEmpty()) {
			linha.filhas.each {
				addCelulas(lista, it)
			}
		}
	}
}