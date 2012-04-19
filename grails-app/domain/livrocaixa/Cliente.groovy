package livrocaixa

class Cliente {

	String nome
	String cpf
	String cnpj
	Vendedor vendedor
	
    static constraints = {
		nome(nullable:false,blank:false)
    }
	
	String toString() {
		return "${nome}"
	}
}
