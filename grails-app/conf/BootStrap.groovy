import grails.converters.JSON;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import livrocaixa.*

class BootStrap {

    def init = { servletContext ->

		//definindo Cliente padrão
		def cliente = Cliente.findByNome('Padrão') ?:new Cliente(nome:'Padrão', cpfCnpj:'771.733.543-31').save(failOnError: true)

		DateFormat df = new SimpleDateFormat("dd/MM/yyyy", new Locale("pt", "BR"))

		JSON.registerObjectMarshaller(Gasto) {
			def returnArray = [:]
			returnArray['id'] = it.id
			returnArray['tipoGastoNome'] = it.tipoGasto.nome
			returnArray['tipoGastoId'] = it.tipoGasto.id
			returnArray['data'] = df.format(it.data)
			returnArray['valor'] = it.valor
			return returnArray
		}
		JSON.registerObjectMarshaller(Venda) {
			def returnArray = [:]
			returnArray['id'] = it.id
			returnArray['clienteNome'] = it.cliente.nome
			returnArray['clienteId'] = it.cliente.id
			returnArray['vendedorNome'] = it.vendedor.nome
			returnArray['vendedorId'] = it.vendedor.id
			returnArray['data'] = df.format(it.data)
			returnArray['valorTotal'] = it.valorTotal
			returnArray['numeroNotaFiscal'] = it.numeroNotaFiscal
			return returnArray
		}
		JSON.registerObjectMarshaller(Compra) {
			def returnArray = [:]
			returnArray['id'] = it.id
			returnArray['fornecedorNome'] = it.fornecedor.nome
			returnArray['fornecedorId'] = it.fornecedor.id
			returnArray['data'] = df.format(it.data)
			returnArray['valorTotal'] = it.valorTotal
			returnArray['numeroNotaFiscal'] = it.numeroNotaFiscal
			return returnArray
		}
    }
    def destroy = {
    }
}
