package livrocaixa

class Produto {

	String nome
	String tipo
	Double precoVenda
	String unidade
	
	static belongsTo = [fornecedor:Fornecedor]
	
    static constraints = {
		nome(nullable:false,blank:false)
		fornecedor(nullable:false,blank:false)
		precoVenda(nullable:true,blank:true)
    }
	
	String toString() {
		return (tipo) ? "${nome} - ${tipo}" : "${nome}"
	}
}
