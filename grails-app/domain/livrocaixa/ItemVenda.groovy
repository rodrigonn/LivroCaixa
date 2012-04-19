package livrocaixa

class ItemVenda {
	
	Venda venda
	Produto produto
	double quantidade
	double valorUnitario
	
	static belongsTo = Venda

    static constraints = {
		venda(nullable:false)
		produto(nullable:false)
		quantidade(nullable:false,blank:false)
		valorUnitario(nullable:false,blank:false)
    }
	
	String toString() {
		return "${produto}"
	}
	
}
