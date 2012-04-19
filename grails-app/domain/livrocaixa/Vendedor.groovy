package livrocaixa

class Vendedor {

	String nome
	String cpf
	static hasMany = [clientes: Cliente, vendas: Venda]
		
	
    static constraints = {
		nome(nullable:false, blank:false)
		cpf (nullable: false, blank: false, cpf: true, unique: true)
    }
	
	String toString() {
		return "${nome}"
	}
}
