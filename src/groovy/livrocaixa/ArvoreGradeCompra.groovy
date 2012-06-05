package livrocaixa

class ArvoreGradeCompra {

	LinhaGradeCompra total = new LinhaGradeCompra()
	List<Mes> meses = new ArrayList<Mes>()
	
	def ArvoreGradeCompra() {
		def res =
			Compra.executeQuery(
				"select ic.produto.id, ic.produto.nome, " +
				"MONTH(ic.compra.data), YEAR(ic.compra.data), SUM(ic.quantidade * ic.valorUnitario) " +
				"from ItemCompra ic " +
				"group by YEAR(ic.compra.data), MONTH(ic.compra.data), ic.produto.id " +
				"order by YEAR(ic.compra.data), MONTH(ic.compra.data)")

			res.each { adicionarCelula(it) }
	}

		
	def adicionarCelula(resultSet) {
		def idProduto = resultSet[0]
		Mes mes = new Mes(numeroMes: resultSet[2], ano: resultSet[3])
		
		if (! (mes in meses)) {
			meses.add(mes)
			meses.sort { it.ano + "" + it.numeroMes }
		}
		
		LinhaGradeCompra linha = getLinha(idProduto)
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
		def linha = new LinhaGradeCompra(produto: produto)
		
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
			nome = "Custos variáveis"
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