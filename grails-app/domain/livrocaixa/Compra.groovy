package livrocaixa

class Compra {
	
	long numeroNotaFiscal
	Date data = new Date()
	Fornecedor fornecedor
	Date vencimento = new Date()
	Double valorTotal
	Double valorPago
	String status
	
	static hasMany = [itensCompra: ItemCompra]
	static transients = [ "valorTotal" ]
	
	def afterLoad() {
		valorTotal = 0.0;
		
		itensCompra.each {
			valorTotal += it.quantidade * it.valorUnitario
		}
	}

    static constraints = {
		
		numeroNotaFiscal(nullable:false, blank:false)
		status(inList:["Em aberto", "Pago", "Atrasado", "Cancelado"])
    }
	
	String toString() {
		
		return "$numeroNotaFiscal - $status"
		
	}
}
