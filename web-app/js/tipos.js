registrarTipos();

function registrarTipos() {

	window.tipoNumber = {
		plano2edicao : criarNumber,
		edicao2json : getInputValue,
		json2plano : getAttributeValue
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
		plano2edicao : criarAutocompleteAjax, // plano2edicao
		edicao2json : getInputValueId, // edicao2json
		json2plano : getNomeId // json2plano
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

function getNomeId(td, mapa, coluna) {
	var nome = mapa[coluna.nome + "Nome"];
	var id = mapa[coluna.nome + "Id"];
	$("<input type='hidden' value='" + id + "' />").appendTo(td);
	td.append(nome);
}

function criarNumber(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="number" >', {
		id : coluna.nome,
		name : coluna.nome,
		value : valor
	});

	input.val(valor);
	tdNovo.append(input);
	focus(input, indice);
}

function criarText(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="text" >', {
		id : coluna.nome,
		name : coluna.nome,
		value : valor
	});

	input.val(valor);
	tdNovo.append(input);
	focus(input, indice);
}

function criarDatePicker(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="text" >', {
		id : coluna.nome,
		name : coluna.nome,
		value : valor
	});
	input.datepicker({
		dateFormat : "dd/mm/yy",
		defaultDate : 0
	});

	input.datepicker($.datepicker.regional['pt-BR']);

	input.val(valor);
	tdNovo.append(input);
	focus(input, indice);
}

function criarAutocompleteAjax(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.children("input:nth-child(1)").val();
	var descricao = tdAntigo.text();

	var oculto = $("<input type='hidden' value='" + valor + "' />")
	oculto.appendTo(tdNovo);

	var input = $('<input type="text" >', {
		id : coluna.nome,
		name : coluna.nome
	});
	input.val(descricao);

	input.autocomplete({
		source : function(request, response) {
			$.ajax({
				url : coluna.url,
				type: "POST",
				datatype : "jsonp",
				data : {
					pesquisa : request.term
				},
				success : function(data) {
					response( $.map(data, function(item) {
						var linha = eval(item);
						return {
							label: linha.descricao,
							value: linha.valor,
							id: linha.id
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
	focus(input, indice);
}

function criarSelectAjax(tdNovo, tdAntigo, coluna, indice) {
	var select = $('<select>', {
		name : coluna.nome,
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
	focus(select, indice);
}

function focus(elemento, indice) {
	if (indice == 1) {
		//TODO nao estah funcionando
//		window.alert(elemento.html());
		elemento.focus();
	}	
}

function habilitaEdicaoLinha(tr) {
	var quantColunas = window.colunas.length;
	var id = tr.attr('id').replace("listagem", "");
	window.linhaEditavel = id;

	var novoTr = $('<tr id="listagem' + id + '">');

	for ( var i = 1; i <= quantColunas; i++) {
		var td = $('<td>');
		habilitaEditar(td, tr.children("td:nth-child(" + i + ")"),
				window.colunas[i - 1], i);
		novoTr.append(td);
	}

	var link = getLink(id);
	var td = $('<td>');

	if (id != "0") {
		td.append($('<a href="#" onclick="excluirAvoAjax($(this), \'' + link
				+ '\')">Excluir</a>'));
		td.append(" ");
	}

	td.append($('<a href="#" onclick="cancelar($(this))">Cancelar</a>'));
	novoTr.append(td);
	tr.after(novoTr);

	if (id == "0") {
		tr.remove();
	} else {
		tr.hide();
		tr.attr("id", tr.attr("id") + "oculto");
	}
}

function habilitaEditar(tdNovo, tdAntigo, coluna, indice) {
	coluna.plano2edicao(tdNovo, tdAntigo, coluna, indice);
}

function getId(tr) {
	return tr.attr('id').replace("listagem", "");
}

function desabilitaEditar(elemento) {
	var valor = elemento.children("input:nth-child(1)").val();
	var td = $('<td>');
	td.html(valor);
	return td;
}