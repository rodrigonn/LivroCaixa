package livrocaixa

class ArvoreGradeReceita {

	LinhaGradeReceita total = new LinhaGradeReceita()
	List<Mes> meses = new ArrayList<Mes>()
	
	def ArvoreGradeReceita() {
		def res =
			Venda.executeQuery(
				"select iv.produto.id, iv.produto.nome, " +
				"MONTH(iv.venda.data), YEAR(iv.venda.data), SUM(iv.quantidade * iv.valorUnitario) " +
				"from ItemVenda iv " +
				"group by YEAR(iv.venda.data), MONTH(iv.venda.data), iv.produto.id " +
				"order by YEAR(iv.venda.data), MONTH(iv.venda.data)")

			res.each { adicionarCelula(it) }
	}

		
	def adicionarCelula(resultSet) {
		def idProduto = resultSet[0]
		Mes mes = new Mes(numeroMes: resultSet[2], ano: resultSet[3])
		
		if (! (mes in meses)) {
			meses.add(mes)
			meses.sort { it.ano + "" + it.numeroMes }
		}
		
		LinhaGradeReceita linha = getLinha(idProduto)
		linha.adicionarCelula(mes, resultSet[4])
	}
	
	def getLinha(idProduto) {
		def linha = getLinhaPorId(idProduto, total.filhas)
		
		if (!linha){ 
			def produto = Produto.get(idProduto)
			linha = criarLinha(produto)
		}
		
		linha
	}
	
	def getLinhaPorId(idProduto, linhas){
		if (!linhas || linhas.isEmpty()) {
			return null
		}
		
		for (it in linhas) {
			if (it.produto && it.produto.id == idProduto) {
				return it
			} 
			
			def linha = getLinhaPorId(idProduto, it.filhas)
			if (linha) {
				return linha
			}
		}
		
		null
	}
	
	def criarLinha(produto) {
		def linha = new LinhaGradeReceita(produto: produto)
		
		total.filhas.add(linha)
		linha.pai = total
		
		linha
	}
	
	def getMapaGrade() {
		def produtos = getProdutos()
		def strMeses = getDescricaoMeses()
		[linhas: produtos, colunas: strMeses, celulas:getCelulas()]
	}
	
	def getDescricaoMeses() {
		def lista = []
		
		meses.each {
			lista.add(it.toString())
		}
		
		lista
	}
	
	def getProdutos() {
		def lista = []
		
		addProdutos(lista, total, 1)
		
		lista
	}
	
	def addProdutos(lista, linha, nivel) {
		
		def nome = null
		if (linha.produto) {
			nome = linha.produto.toString()
		} else {
			nome = "Receitas"
		}
		
		def mapa = [
			nome : nome, 
			nivel : nivel
		]
				
		if (linha && !linha.filhas.isEmpty()) {
			linha.filhas.each {
				addProdutos(lista, it, nivel + 1)
			}
		}
		
		lista.add(mapa)
	}
	
	def getCelulas() {
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
				
		if (linha && !linha.filhas.isEmpty()) {
			linha.filhas.each {
				addCelulas(lista, it)
			}
		}
		
		lista.add(colunas)
	}
}