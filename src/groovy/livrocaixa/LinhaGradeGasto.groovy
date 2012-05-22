package livrocaixa

import java.util.List;

class LinhaGradeGasto {

	TipoGasto tipo
	def celulasMeses = [:]
	List<LinhaGradeGasto> filhas = new ArrayList<LinhaGradeGasto>()
	LinhaGradeGasto pai
	
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
