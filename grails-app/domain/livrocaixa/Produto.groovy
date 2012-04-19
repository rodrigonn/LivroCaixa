package livrocaixa

class Produto {

	String nome
	String tipo
	Fornecedor fornecedor
	
	static belongsTo = Fornecedor
	
    static constraints = {
		nome(nullable:false,blank:false)
		fornecedor(nullable:false,blank:false)
    }
	
	String toString() {
		return "${nome} do tipo ${tipo}"
	}
}
