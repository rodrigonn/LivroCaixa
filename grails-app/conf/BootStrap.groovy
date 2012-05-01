import grails.converters.JSON;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import livrocaixa.*

class BootStrap {

    def init = { servletContext ->

		//definindo Cliente padrão
		def cliente = Cliente.findByNome('Padrão') ?:new Cliente(nome:'Padrão', cpfCnpj:'771.733.543-31').save(failOnError: true)

		DateFormat df = new SimpleDateFormat("dd/MM/yyyy", new Locale("pt", "BR"))

		JSON.registerObjectMarshaller(Despesa) {
			def returnArray = [:]
			returnArray['id'] = it.id
			returnArray['tipoDespesaNome'] = it.tipoDespesa.nome
			returnArray['tipoDespesaId'] = it.tipoDespesa.id
			returnArray['data'] = df.format(it.data)
			returnArray['valor'] = it.valor
			return returnArray
		}
    }
    def destroy = {
    }
}
