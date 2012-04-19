package livrocaixa

class Despesa {

	TipoDespesa tipodespesa
	Date lastUpdate = new Date()
	double valor
	
    static constraints = {
		tipodespesa(nullable: false)
    }
	
	String toString() {
		return "${tipodespesa}"
	}
}
