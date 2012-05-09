package livrocaixa

class TipoGasto {

	String nome
	static hasMany = [gastos: Gasto, filhos: TipoGasto]
	TipoGasto pai
	
    static constraints = {
		nome(nullable:false, blank:false)
		pai(nullable:true, blank:true)
    }
	
	String toString() {
		String resultado = "";
		
		if (pai) {
			resultado = pai.toString() + " > "
		}
		
		return resultado + "${nome}"
	}
}
