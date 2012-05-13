function registrarTipos() {

	window.tipoNumber = {
		habilitarEditar : criarNumber,
		extrairJson : getInputValue,
		extrairCelula : getAttributeValue
	}

	window.tipoText = {
		habilitarEditar : criarText,
		extrairJson : getInputValue,
		extrairCelula : getAttributeValue
	}

	window.tipoDate = {
		habilitarEditar : criarDatePicker,
		extrairJson : getInputValue,
		extrairCelula : getAttributeValue
	}

	window.tipoSelectNomeId = {
		habilitarEditar : criarSelectAjax,
		extrairJson : getSelectValue,
		extrairCelula : getNomeId
	}

	window.tipoHierarquia = {
		habilitarEditar : criarAutocompleteAjax, // plano2edicao
		extrairJson : getInputValueId, // edicao2json
		extrairCelula : getNomeId // json2plano
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

function criarNumber(tdNovo, tdAntigo, coluna) {
	var valor = tdAntigo.text();

	var input = $('<input type="number" >', {
		id : coluna.nome,
		name : coluna.nome,
		value : valor
	});

	input.val(valor);
	tdNovo.append(input);
}

function criarText(tdNovo, tdAntigo, coluna) {
	var valor = tdAntigo.text();

	var input = $('<input type="text" >', {
		id : coluna.nome,
		name : coluna.nome,
		value : valor
	});

	input.val(valor);
	tdNovo.append(input);
}

function criarDatePicker(tdNovo, tdAntigo, coluna) {
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
}

function criarAutocompleteAjax(tdNovo, tdAntigo, coluna) {
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
}

function criarSelectAjax(tdNovo, tdAntigo, coluna) {
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
}

function habilitaEdicaoLinha(tr) {
	var quantColunas = window.colunas.length;
	var id = tr.attr('id').replace("listagem", "");
	window.linhaEditavel = id;

	var novoTr = $('<tr id="listagem' + id + '">');

	for ( var i = 1; i <= quantColunas; i++) {
		var td = $('<td>');
		habilitaEditar(td, tr.children("td:nth-child(" + i + ")"),
				window.colunas[i - 1]);
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

function habilitaEditar(tdNovo, tdAntigo, coluna) {
	coluna.habilitarEditar(tdNovo, tdAntigo, coluna);
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