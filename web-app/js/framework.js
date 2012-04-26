//Defaults
$.datepicker.setDefaults( $.datepicker.regional[ "pt-BR" ] );

// Mapas de configuração

window.tipo2widgetFunc = {}
window.tipo2setFunc = {}
window.coluna2widget = {}
window.entidade2colunas = {}

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
	return $('<input type="number">', {
		name: idCampo,
		id: idCampo,
		step: "0.01",
		value: valor
	});
}

function criarText(idCampo, valor) {
	return $('<input type="text">', {
		name: idCampo,
		id: idCampo,
		value: valor
	});
}

function criarDatePicker(idCampo, valor) {
	var input = $('<input type="text">', {
		name: idCampo,
		id: idCampo,
		value: valor
	});
	
	input.datepicker();
	
	return input;
}


function instanciarWidget(tipo, id, valor) {
	return window.tipo2widgetFunc[tipo](id, valor)
}

function cadastrarEntidade(entidade) {
	window.entidade2colunas[entidade] = [];	
}

function cadastrarColuna(entidade, nomeColuna, tipoColuna, valorDefaultColuna) {
	window.entidade2colunas[entidade].push([nomeColuna, tipoColuna, valorDefaultColuna]);
	window.coluna2widget[nomeColuna] = instanciarWidget(tipoColuna, nomeColuna, valorDefaultColuna) // TODO tirar isso daqui
}


// Eventos

function bindNovo(entidade, colunas) { //TODO Usar list-entidade
	$("body").bind('keypress', function(event){
		if (event.charCode == 110 && event.altKey) { // Alt + n
			var tr = $('<tr id="listagem0">');
			for (var i = 0; i < colunas; i++) {
				$('<td>').appendTo(tr);
			}
			
			$("#listagem").append(tr);
			habilitaEdicaoLinha(entidade, 0);
		}
	});
}

function bindEdicaoLinha(entidade, id) {
	var handler = function () {
		habilitaEdicaoLinha(entidade, id, handler)
	};
					
	$("#listagem" + id).bind('click', handler);	
}

function habilitaEdicaoLinha(entidade, id, handler) {
	var tr = $("#listagem" + id);
	
	var colunas = window.entidade2colunas[entidade];
	
	for (var i = 1; i <= colunas.length; i++) {
		habilitaEditar(tr.children("td:nth-child(" + i + ")"), colunas[i-1][0]);		
	}
	
	if (handler)
		tr.unbind('click', handler);
	
	var link = null;
	if (id && id > 0){
		link = "/LivroCaixa/exemplo/" + id
	}else{
		link = "/LivroCaixa/exemplo"	
	}
	
	$("<a href='#' onclick='salvarAjax($(this), " + link + ")'>Salvar</a>")
		.appendTo(tr.children("td:nth-child(4)"))
		
	tr.children("td:nth-child(4)").append(" ");

	$('<a href="#" onclick="excluirAvoAjax($(this), ' + link + ')">Excluir</a>')
		.appendTo(tr.children("td:nth-child(4)"))
}

function habilitaEditar(elemento, idCampo) {
	var valor = elemento.text();
	var widget = window.coluna2widget[idCampo];
	widget.val(valor);
	elemento.empty();
	elemento.append(widget);
}

function desabilitaEditar(elemento) {
	var valor = elemento.val()
    elemento.html( valor );
}

function excluirAvoAjax(elemento, link) {
	jQuery.ajax({
		type:'POST', 
		url:link,
		success:function(data,textStatus){
			elemento.parent().parent().remove();
		},
		error:function(
			XMLHttpRequest,textStatus,errorThrown){}
		});
	return false;
}

function salvarAjax(elemento, link) {
	jQuery.ajax({
		type:'POST', 
		url:link,
		success:function(data,textStatus){
			elemento.parent().parent().children().each(function(){
					desabilitaEditar($(this));	
			})
		},
		error:function(
			XMLHttpRequest,textStatus,errorThrown){}
		});
	return false;
}