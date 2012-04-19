package livrocaixa

class ItemCompra {

	Compra compra
	Produto produto
	int quantidade
	double valorUnitario
	
	static belongsTo = Compra
	
    static constraints = {
		produto(nullable:false)
		quantidade(nullable:false,blank:false)
		valorUnitario(nullable:false,blank:false)
    }
	
	String toString() {
		return "${produto}"
	}
}
