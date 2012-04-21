package livrocaixa

class Cliente {

	String nome
	String cpfCnpj
	Vendedor vendedor
	
    static constraints = {
		nome(nullable:false,blank:false)
		vendedor(nullable:true)
    }
	
	String toString() {
		return "${nome}"
	}
}
