package livrocaixa

class Despesa {

	TipoDespesa tipoDespesa
	Date data = new Date()
	Double valor
	
    static constraints = {
		tipoDespesa(nullable: false)
		valor(scale:2)
		data(nullable: false)
    }
	
	String toString() {
		return "${tipoDespesa}"
	}
}
