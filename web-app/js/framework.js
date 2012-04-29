//Defaults TODO datepicket ainda está com locale americano
$.datepicker.setDefaults($.datepicker.regional["pt-BR"]);

// Mapas de configuração

window.tipo2widgetFunc = {};
window.tipo2setFunc = {};
window.entidade = null;
window.colunas = [];
window.linhaEditavel = null;

registrarTipos();

function registrarTipos() {
	window.tipo2widgetFunc['number'] = criarNumber;
	window.tipo2setFunc['number'] = text2Value;

	window.tipo2widgetFunc['text'] = criarText;
	window.tipo2setFunc['text'] = text2Value;

	window.tipo2widgetFunc['date'] = criarDatePicker;
	window.tipo2setFunc['data'] = text2Value;
}

function text2Value(elemento, text) {
	elemento.val(text);
}

function criarNumber(idCampo, valor) {
	return $('<input type="number" >', {
		id : idCampo,
		name : idCampo,
		value : valor
	});
}

function criarText(idCampo, valor) {
	return $('<input type="text" >', {
		id : idCampo,
		name : idCampo,
		value : valor
	});
}

function criarDatePicker(idCampo, valor) {
	var input = $('<input type="text" >', {
		id : idCampo,
		name : idCampo,
		value : valor
	});
	input.datepicker();
	return input;
}

function criarSelectAjax(idCampo, valor) {
	var select = $('<select>', {
		name : idCampo,
		id : idCampo
	});

	jQuery.ajax({
		type : 'GET',
		url : link,
		success : function(data, textStatus) {
			var jsonArray = eval(data);

			for ( var i = 0; i < jsonArray.length; i++) {
				var valor = null;// TODO
				var descricao = null;
				var option = $('<option value="' + valor + '">' + descricao
						+ '</option>');
				select.append(option);
			}

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});

	return select;
}

function cadastrarEntidade(entidade) {
	window.entidade = entidade;
}

function cadastrarColuna(nomeColuna, tipoColuna, valorDefaultColuna) {
	window.colunas.push([ nomeColuna, tipoColuna, valorDefaultColuna ]);
}

// Eventos

function tratarTeclado(event) {
	
	if (event.keyCode == 13) {
		if (window.linhaEditavel == null) {
			var tr = $('<tr id="listagem0">');
			for ( var i = 0; i < window.colunas.length; i++) {
				$('<td>').appendTo(tr);
			}
			
			$("#list-" + window.entidade + " table tbody").append(tr);
			window.linhaEditavel = "0";
			habilitaEdicaoLinha(tr);
		} else {
			salvarAjax(tr, getLink(window.entidade));
		}
	}	
}

function getLink(id) {
	if (id == "0") {
		return "/ajax/" + window.entidade + "/";
	} else {
		return "/ajax/" + window.entidade + "/" + id;
	}			
}

function bindNovo() {
	$("body").live('keypress', function(event) {
		tratarTeclado(event);
	});
}

function bindEdicaoLinha(id) {
	var tr = $("#listagem" + id);
	bindEdicaoLinhaTr(tr);
}

function bindEdicaoLinhaTr(tr) {
	tr.live('click', function() {
		if (window.linhaEditavel == null){
			habilitaEdicaoLinha($(this));
		}
	});
}

function habilitaEdicaoLinha(tr) {
	var quantColunas = window.colunas.length;
	var id = tr.attr('id').replace("listagem", "");
	
	var novoTr = $('<tr id="listagem' + id + '">');

	
	for ( var i = 1; i <= quantColunas; i++) {
		var td = habilitaEditar(tr.children("td:nth-child(" + i + ")"),
				window.colunas[i - 1]);
		novoTr.append(td);
	}

	var link = getLink(id);
	var td = $('<td>');

	if (id != "0") {
		td.append($('<a href="#" onclick="excluirAvoAjax($(this), ' + link + ')">Excluir</a>'));
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

function desabilitaEdicaoLinha(tr, manter) {
	var quantColunas = window.colunas.length;
	var id = tr.attr('id').replace("listagem", "");
	
	if (manter) {
		var novoTr = $('<tr id="listagem' + id + '">');

		for ( var i = 1; i <= quantColunas; i++) {
			var td = desabilitaEditar(tr.children("td:nth-child(" + i + ")"),
					window.colunas[i - 1]);
			novoTr.append(td);
		}

		var link = getLink(id);
		var td = $('<td>');

		novoTr.append(td);
		tr.after(novoTr);
		bindEdicaoLinhaTr(novoTr);		
	} else {
		var trOculto = $('#listagem' + id + 'oculto');
		trOculto.show();
		bindEdicaoLinhaTr(trOculto);
		trOculto.attr("id", 'listagem' + id);
	}

	tr.remove();
}

function habilitaEditar(elemento, coluna) {
	var valor = elemento.text();
	if (valor == null) {
		valor = coluna[2];
	}

	var widget = window.tipo2widgetFunc[coluna[1]](coluna[0], valor);
	widget.val(valor);

	var td = $('<td>');
	td.append(widget);
	return td;
}

function desabilitaEditar(elemento) {
	var valor = elemento.children("input:nth-child(1)").val();
	var td = $('<td>');
	td.html(valor);
	return td;
}

function excluirAvoAjax(elemento, link) {
	jQuery.ajax({
		type : 'POST',
		url : link,
		success : function(data, textStatus) {
			elemento.parent().parent().remove();
			window.linhaEditavel = null;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
	return false;
}

function salvarAjax(elemento, link) {
	jQuery.ajax({
		type : 'POST',
		url : link,
		success : function(data, textStatus) {
			desabilitaEdicaoLinha(elemento.parent().parent(), true);
			window.linhaEditavel = null;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
	return false;
}

function cancelar(elemento) {
	var tr = elemento.parent().parent();
	
	if (tr.attr("id") == "listagem0") {
		tr.remove();
		
	} else {
		desabilitaEdicaoLinha(tr, false);
	}
	window.linhaEditavel = null;
}