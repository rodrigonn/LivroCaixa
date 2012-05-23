package livrocaixa

class Venda {
	
	Long numeroNotaFiscal
	Cliente cliente
	Vendedor vendedor
	Double comissao
	Double outrosCustos
	Date data = new Date()
	Date vencimento = new Date()
	Double valorPago
	String status
	static hasMany = [itemVenda: ItemVenda]

	def getValorTotal() {
		return 10.0 //TODO
	}
	
    static constraints = {
		numeroNotaFiscal(nullable:false,blank:false)
		status(inList:["Em aberto", "Pago", "Atrasado", "Cancelado"])
    }
	
	String toString() {
		return "$numeroNotaFiscal - $status"
	}
	
}
