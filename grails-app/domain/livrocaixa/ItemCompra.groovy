package livrocaixa

class ItemCompra {

	Compra compra
	Produto produto
	Double quantidade
	Double valorUnitario
	
	static belongsTo = [compra:Compra]
	
    static constraints = {
		produto(nullable:false)
		quantidade(nullable:false,blank:false)
		valorUnitario(nullable:false,blank:false)
    }
	
	String toString() {
		return "${produto}"
	}
}
