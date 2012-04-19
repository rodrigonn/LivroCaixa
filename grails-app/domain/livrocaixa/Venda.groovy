package livrocaixa

class Venda {
	
	long nf
	Cliente cliente
	Vendedor vendedor
	double comissao
	double outrosCustos
	Date lastUpdate = new Date()
	Date vencimento = new Date()
	char Status
	static hasMany = [itemVenda: ItemVenda]

    static constraints = {
		nf(nullable:false,blank:false)
    }
	
	String toString() {
		return "${nf}"
	}
	
}
