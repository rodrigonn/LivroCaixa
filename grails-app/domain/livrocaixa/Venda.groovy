package livrocaixa

class Venda {
	
	Long numeroNotaFiscal
	Cliente cliente
	Vendedor vendedor
	Double comissao
	Double outrosCustos
	Date data = new Date()
	Date vencimento = new Date()
	Double valorTotal
	Double valorPago
	String status
	
	static hasMany = [itensVenda: ItemVenda]
	static transients = [ "valorTotal" ]

	def afterLoad() {
		valorTotal = 0.0;
		
		itensVenda.each {
			valorTotal += it.quantidade * it.valorUnitario
		}
	}
	
    static constraints = {
		numeroNotaFiscal(nullable:false,blank:false)
		status(inList:["Em aberto", "Pago", "Atrasado", "Cancelado"])
		vendedor(nullable:true,blank:true)
    }
	
	String toString() {
		return "$numeroNotaFiscal - $status"
	}
	
}
