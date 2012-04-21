package livrocaixa

class Vendedor {

	String nome
	String cpf
	static hasMany = [clientes: Cliente, vendas: Venda]
		
	
    static constraints = {
		nome(nullable:false, blank:false)
		cpf (cpf:true)
    }
	
	String toString() {
		return "${nome}"
	}
}
