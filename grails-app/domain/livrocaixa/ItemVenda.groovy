package livrocaixa

class ItemVenda {
	
	Venda venda
	Produto produto
	Double quantidade
	Double valorUnitario
	
	static belongsTo = [venda:Venda]

    static constraints = {
		venda(nullable:false)
		produto(nullable:false)
		quantidade(nullable:false,blank:false)
		valorUnitario(nullable:false,blank:false, scale:2)
    }
	
	String toString() {
		return "${produto}"
	}
	
}
