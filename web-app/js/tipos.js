window.tipo2habilitarEditarFunc = {};
window.tipo2extrairJsonFunc = {};
window.tipo2extrairCelulaFunc = {};

function registrarTipos() {
	window.tipo2habilitarEditarFunc['number'] = criarNumber;
	window.tipo2extrairJsonFunc['number'] = getInputValue;
	window.tipo2extrairCelulaFunc['number'] = getAttributeValue;

	window.tipo2habilitarEditarFunc['text'] = criarText;
	window.tipo2extrairJsonFunc['text'] = getInputValue;
	window.tipo2extrairCelulaFunc['text'] = getAttributeValue;

	window.tipo2habilitarEditarFunc['date'] = criarDatePicker;
	window.tipo2extrairJsonFunc['date'] = getInputValue;
	window.tipo2extrairCelulaFunc['date'] = getAttributeValue;

	window.tipo2habilitarEditarFunc['nomeid'] = criarSelectAjax;
	window.tipo2extrairJsonFunc['nomeid'] = getSelectValue;
	window.tipo2extrairCelulaFunc['nomeid'] = getNomeId;

}

function getInputValue(td, coluna) {
	var valor = td.children("input:nth-child(1)").val();
	return "\"" + coluna[0] + "\" : \"" + valor + "\", ";
}

function getSelectValue(td, coluna) {
	var valor = td.children("select:nth-child(1)").val();
	return "\"" + coluna[0] + "Id\" : \"" + valor + "\", ";
}

function getAttributeValue(td, mapa, nomeColuna) {
	var valor = mapa[nomeColuna];
	td.append(valor);
}

function getNomeId(td, mapa, nomeColuna) {
	var nome = mapa[nomeColuna + "Nome"];
	var id = mapa[nomeColuna + "Id"];
	$("<input type='hidden' value='" + id + "' />").appendTo(td);
	td.append(nome);
}

function criarNumber(tdNovo, tdAntigo, coluna) {
	var valor = tdAntigo.text();

	var input = $('<input type="number" >', {
		id : coluna[0],
		name : coluna[0],
		value : valor
	});
	
	input.val(valor);
	tdNovo.append(input);
}

function criarText(tdNovo, tdAntigo, coluna) {
	var valor = tdAntigo.text();

	var input = $('<input type="text" >', {
		id : coluna[0],
		name : coluna[0],
		value : valor
	});

	input.val(valor);
	tdNovo.append(input);
}

function criarDatePicker(tdNovo, tdAntigo, coluna) {
	var valor = tdAntigo.text();
	
	var input = $('<input type="text" >', {
		id : coluna[0],
		name : coluna[0],
		value : valor
	});
	input.datepicker();
	
	input.val(valor);
	tdNovo.append(input);
}

function criarSelectAjax(tdNovo, tdAntigo, coluna) {
	var select = $('<select>', {
		name : coluna[0],
		id : coluna[0]
	});

	var valor = tdAntigo.children("input:nth-child(1)").val();

	$.getJSON(coluna[2], function(json) {
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
	window.tipo2habilitarEditarFunc[coluna[1]](tdNovo, tdAntigo, coluna);
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