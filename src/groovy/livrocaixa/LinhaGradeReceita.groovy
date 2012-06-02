package livrocaixa

import java.util.List;

class LinhaGradeReceita {

	Produto produto
	def celulasMeses = [:]
	List<LinhaGradeReceita> filhas = new ArrayList<LinhaGradeReceita>()
	LinhaGradeReceita pai
	
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
