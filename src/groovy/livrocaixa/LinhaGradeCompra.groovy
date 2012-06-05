package livrocaixa

import java.util.List;

class LinhaGradeCompra {

	Produto produto
	def celulasMeses = [:]
	List<LinhaGradeCompra> filhas = new ArrayList<LinhaGradeCompra>()
	LinhaGradeCompra pai
	
	def adicionarCelula(mes, valor) {
		if(!celulasMeses[mes]) {
			celulasMeses[mes] = 0.0
		}
		
		celulasMeses[mes] += valor
		
		if (pai) {
			pai.adicionarCelula(mes, valor)
		}
	}
}
