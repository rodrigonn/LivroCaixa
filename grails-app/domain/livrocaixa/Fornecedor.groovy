package livrocaixa

class Fornecedor {

	String nome
	static hasMany = [produtos: Produto]
	
    static constraints = {
		nome(nullable:false,blank:false)
    }
	
	String toString() {
		return "${nome}"
	}
}
