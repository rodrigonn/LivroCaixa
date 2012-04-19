package livrocaixa

class Compra {
	
	long numeroNotaFiscal
	Date data = new Date()
	Fornecedor fornecedor
	Date vencimento = new Date()
	String Status
	static hasMany = [itemCompra: ItemCompra]

    static constraints = {
		
		numeroNotaFiscal(nullable:false, blank:false)
		
    }
	
	String toString() {
		
		return "$numeroNotaFiscal - $status"
		
	}
}
