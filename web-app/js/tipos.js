registrarTipos();

function registrarTipos() {

	window.tipoNumber = {
		plano2edicao : criarNumber,
		edicao2json : getInputValue,
		json2plano : getAttributeValue
	}

	window.tipoMoeda = {
		plano2edicao : criarMoeda,
		edicao2json : getInputValue,
		json2plano : getMoedaValue
	}

	window.tipoText = {
		plano2edicao : criarText,
		edicao2json : getInputValue,
		json2plano : getAttributeValue
	}

	window.tipoDate = {
		plano2edicao : criarDatePicker,
		edicao2json : getInputValue,
		json2plano : getAttributeValue
	}

	window.tipoSelectNomeId = {
		plano2edicao : criarSelectAjax,
		edicao2json : getSelectValue,
		json2plano : getNomeId
	}

	window.tipoHierarquia = {
		plano2edicao : criarAutocompleteAjax, 
		edicao2json : getInputValueId, 
		json2plano : getNomeId 
	}

}

function getInputValue(td, coluna) {
	var valor = td.children("input:nth-child(1)").val();
	var att = "\"" + coluna.nome + "\" : \"" + valor + "\", ";
	return att;
}

function getInputValueId(td, coluna) {
	var valor = td.children("input:nth-child(1)").val();
	var att = "\"" + coluna.nome + "Id\" : \"" + valor + "\", ";
	return att;
}

function getSelectValue(td, coluna) {
	var valor = td.children("select:nth-child(1)").val();
	return "\"" + coluna.nome + "Id\" : \"" + valor + "\", ";
}

function getAttributeValue(td, mapa, coluna) {
	var valor = mapa[coluna.nome];
	td.append(valor);
}

function getMoedaValue(td, mapa, coluna) {
	var valor = mapa[coluna.nome];
	td.append(("" + valor.toFixed(2)).replace(".", ","));
}

function getNomeId(td, mapa, coluna) {
	var nome = mapa[coluna.nome + "Nome"];
	var id = mapa[coluna.nome + "Id"];
	$("<input type='hidden' value='" + id + "' />").appendTo(td);
	td.append(nome);
}

function criarNumber(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="number" id="edicao' + indice + '">');

	input.val(valor);
	tdNovo.append(input);
	tdNovo.attr('align', 'right');
}

function criarMoeda(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="text" id="edicao' + indice + '">');

	input.val(valor);
	tdNovo.append(input);
	tdNovo.attr('align', 'right');

	input.priceFormat({
	    prefix: '',
	    centsSeparator: ',',
	    thousandsSeparator: '.',
	    clearPrefix: true
	});
}

function criarText(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="text" id="edicao' + indice + '">');

	input.val(valor);
	tdNovo.append(input);
}

function criarDatePicker(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="text" id="edicao' + indice + '">');
	input.datepicker({
		dateFormat : "dd/mm/yy",
		defaultDate : 0
	});

	input.datepicker($.datepicker.regional['pt-BR']);

	input.val(valor);
	tdNovo.append(input);
}

function criarAutocompleteAjax(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.children("input:nth-child(1)").val();
	var descricao = tdAntigo.text();

	var oculto = $("<input type='hidden' value='" + valor + "' />")
	oculto.appendTo(tdNovo);

	var input = $('<input type="text" id="edicao' + indice + '">');
	input.val(descricao);

	input.autocomplete({
		source : function(request, response) {
			$.ajax({
				url : coluna.url,
				type : "POST",
				datatype : "jsonp",
				data : {
					pesquisa : request.term
				},
				success : function(data) {
					response($.map(data, function(item) {
						var linha = eval(item);
						return {
							label : linha.descricao,
							value : linha.valor,
							id : linha.id
						}
					}));
				}
			});

		},
		select : function(event, ui) {
			if (ui.item) {
				input.val(ui.item.value);
				oculto.val(ui.item.id);
				return false;
			}
		}
	});

	tdNovo.append(input);
}

function criarSelectAjax(tdNovo, tdAntigo, coluna, indice) {
	var select = $('<select>', {
		name : "edicao" + indice,
		id : coluna.nome
	});

	var valor = tdAntigo.children("input:nth-child(1)").val();

	$.getJSON(coluna.url, function(json) {
		$.each(json, function(i, item) {
			var linha = eval(item);
			var option = $('<option value="' + linha.id + '">' + linha.nome
					+ '</option>');
			select.append(option);

			if (linha.id == valor) {
				option.attr("selected", "selected");
			}
		});
	});

	tdNovo.append(select);
}

function desabilitaEditar(elemento) {
	var valor = elemento.children("input:nth-child(1)").val();
	var td = $('<td>');
	td.html(valor);
	return td;
}