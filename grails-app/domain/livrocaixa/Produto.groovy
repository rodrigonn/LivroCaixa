package livrocaixa

class Produto {

	String nome
	String tipo
	
	static belongsTo = [fornecedor:Fornecedor]
	
    static constraints = {
		nome(nullable:false,blank:false)
		fornecedor(nullable:false,blank:false)
    }
	
	String toString() {
		return (tipo) ? "${nome} - ${tipo}" : "${nome}"
	}
}
