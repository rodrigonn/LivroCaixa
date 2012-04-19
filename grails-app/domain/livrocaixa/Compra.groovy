package livrocaixa

class Compra {
	
	long nf
	Date lastUpdate = new Date()
	Fornecedor fornecedor
	Date vencimento = new Date()
	char Status
	static hasMany = [itemCompra: ItemCompra]

    static constraints = {
		
		nf(nullable:false, blank:false)
		
    }
	
	String toString() {
		
		return "${nf}"
		
	}
}
