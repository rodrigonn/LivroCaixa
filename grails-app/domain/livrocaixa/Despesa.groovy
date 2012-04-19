package livrocaixa

class Despesa {

	TipoDespesa tipodespesa
	Date data = new Date()
	Double valor
	
    static constraints = {
		tipodespesa(nullable: false)
		valor(scale:2)
    }
	
	String toString() {
		return "${tipodespesa}"
	}
}
