package livrocaixa

class TipoDespesa {

	String nome
	static hasMany = [despesas: Despesa]
	
    static constraints = {
		nome(nullable:false, blank:false)
    }
	
	String toString() {
		return "${nome}"
	}
}
