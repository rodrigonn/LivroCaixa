window.linhaEditavel = null;

function bindNovo() {
	$("body").live('keypress', function(event) {
		tratarTeclado(event);
	});
}

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
			var tr = $('#listagem' + window.linhaEditavel);
			salvarAjax(tr, getLink(window.linhaEditavel));
		}
	}
}

function bindEdicaoLinha(id) {
	var tr = $("#listagem" + id);
	bindEdicaoLinhaTr(tr);
}

function bindEdicaoLinhaTr(tr) {
	tr.live('click', function() {
		
		if (window.linhaEditavel == null ) {
			habilitaEdicaoLinha($(this));
		}
		
		if (window.linhaEditavel == "cancelado") { 
			window.linhaEditavel = null;
		}
	});
}

function excluirAvoAjax(elemento, link) {
	jQuery.ajax({
		type : 'DELETE',
		url : link,
		success : function(data, textStatus) {
			elemento.parent().parent().remove();
			window.linhaEditavel = null;
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
			var trOculto = $("#" + tr.attr('id') + "oculto");
			if (trOculto != null) {
				trOculto.remove();
			}
			
			var linha = eval(data);  
			var trNovo = desenharLinha(linha);
			tr.after(trNovo);
			
			tr.remove();
			window.linhaEditavel = null;
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
		json += window.tipo2extrairJsonFunc[coluna[1]](td, coluna);		
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
