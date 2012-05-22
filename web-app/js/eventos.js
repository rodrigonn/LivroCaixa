window.linhaEditavel = null;

bindNovo();

$('#botaoCriar').click(function() {
	novaLinha();
});

function bindNovo() {
	$("body").live('keypress', function(event) {
		tratarTeclado(event);
	});
}

function tratarTeclado(event) {
	if (event.keyCode == 13) {

		if (window.linhaEditavel == null) {
			novaLinha();
			
		} else {
			var tr = $('#listagem' + window.linhaEditavel);
			salvarAjax(tr, getLink(window.linhaEditavel));
		}
	}
}

function novaLinha() {
	var tr = $('<tr id="listagem0">');
	for ( var i = 0; i < window.colunas.length; i++) {
		$('<td>').appendTo(tr);
	}

	$("#list-" + window.entidade + " table tbody").append(tr);
	window.linhaEditavel = "0";
	habilitaEdicaoLinha(tr);	
}

function excluirAvoAjax(elemento, link) {
	jQuery.ajax({
		type : 'DELETE',
		url : link,
		success : function(data, textStatus) {
			carregarListagem();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			window.alert(errorThrown);
		}
	});
	return false;
}

function salvarAjax(tr, link) {
	var method = null;

	if (tr.attr('id') == "listagem0") {
		method = 'POST';
	} else {
		method = 'PUT';
	}

	var dados = montarJSON(tr);

	jQuery.ajax({
		type : method,
		url : link,
		data : dados,
		success : function(data, textStatus) {
			carregarListagem();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
	return false;
}

function montarJSON(tr) {
	var json = '{';

	var quantColunas = window.colunas.length;
	for ( var i = 1; i <= quantColunas; i++) {
		var coluna = window.colunas[i - 1];
		var td = tr.children("td:nth-child(" + i + ")");
		json += coluna.edicao2json(td, coluna);
	}
	json += "\"class\" : \"" + window.classe + "\" }";
	return jQuery.parseJSON(json);
}

function cancelar(elemento) {
	var tr = elemento.parent().parent();

	window.linhaEditavel = "cancelado";
	
	if (tr.attr("id") == "listagem0") {
		tr.remove();

	} else {
		desfazerEdicaoLinha(tr, false);
	}
}


function desfazerEdicaoLinha(tr) {
	var quantColunas = window.colunas.length;
	var id = getId(tr);

	var trOculto = $('#listagem' + id + 'oculto');
	trOculto.show();
	trOculto.attr("id", 'listagem' + id);
	tr.remove();
}
