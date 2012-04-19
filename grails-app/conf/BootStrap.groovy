import livrocaixa.*

class BootStrap {

    def init = { servletContext ->

		//definindo Vendedor
		def vendedor1 = Vendedor.findByNome('Loja') ?:new Vendedor(nome:'Loja', cpf:'771.733.543-31').save(failOnError: true)
  
		//definindo Cliente
		def cliente = Cliente.findByNome('Padrão') ?:new Cliente(nome:'Padrão', cpf:'771.733.543-31', cnpj:'', vendedor: vendedor1).save(failOnError: true)

		//definindo Fornecedor
		def fornecedor = Fornecedor.findByNome('Poty') ?:new Fornecedor(nome:'Poty').save(failOnError: true)
		
		//definindo Fornecedor
		def produto1 = Produto.findByNome('Cimento') ?:new Produto(nome:'Cimento', tipo:'I', fornecedor: fornecedor).save(failOnError: true)
		
		//definindo TipoDespesa
		def tipoDespesa = TipoDespesa.findByNome('Folha de pagamento') ?:new TipoDespesa(nome:'Folha de pagamento').save(failOnError: true)
		
    }
    def destroy = {
    }
}
