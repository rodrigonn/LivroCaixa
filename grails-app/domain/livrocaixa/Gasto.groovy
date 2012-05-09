package livrocaixa

class Gasto {

	TipoGasto tipoGasto
	Date data = new Date()
	Double valor
	
    static constraints = {
		tipoGasto(nullable: false)
		valor(scale:2)
		data(nullable: false)
    }
	
	String toString() {
		return "${tipoGasto}"
	}
}
