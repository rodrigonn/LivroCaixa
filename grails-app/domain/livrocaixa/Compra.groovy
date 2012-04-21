package livrocaixa

class Compra {
	
	long numeroNotaFiscal
	Date data = new Date()
	Fornecedor fornecedor
	Date vencimento = new Date()
	Double valorPago
	String status
	
	static hasMany = [itemCompra: ItemCompra]

    static constraints = {
		
		numeroNotaFiscal(nullable:false, blank:false)
		status(inList:["Em aberto", "Pago", "Atrasado", "Cancelado"])
    }
	
	String toString() {
		
		return "$numeroNotaFiscal - $status"
		
	}
}
