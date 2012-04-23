// Widgets

window.tipo2widgetFunc = {}
window.coluna2widget = {}

registrarTipos();

function registrarTipos() {
	window.tipo2widgetFunc['number'] = criarNumber;
	window.tipo2widgetFunc['text'] = criarText;
	window.tipo2widgetFunc['date'] = criarDate;
}

function criarNumber(idCampo, valor) {
	return $('<input> type="number"', {
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

function criarDate(idCampo, valor) {
	var div = $('<div>', {
		name: idCampo,
		id: idCampo
	});
	
	var selectDia = $('<select>', {
		name: idCampo + "_dia",
		id: idCampo + "_dia"
	});
	div.append(selectDia);
	
	for (var i = 1; i <= 31; i++) {
		$('<option value="' + i + '">' + i + '</value>').appendTo(selectDia);
	}
	
	var selectMes = $('<select>', {
		name: idCampo + "_mes",
		id: idCampo + "_mes"
	});
	div.append(selectMes);
	
	$('<option value="1">Janeiro</value>').appendTo(selectMes);
	$('<option value="2">Fevereiro</value>').appendTo(selectMes);
	$('<option value="3">Março</value>').appendTo(selectMes);
	$('<option value="4">Abril</value>').appendTo(selectMes);
	$('<option value="5">Maio</value>').appendTo(selectMes);
	$('<option value="6">Junho</value>').appendTo(selectMes);
	$('<option value="7">Julho</value>').appendTo(selectMes);
	$('<option value="8">Agosto</value>').appendTo(selectMes);
	$('<option value="9">Setembro</value>').appendTo(selectMes);
	$('<option value="10">Outubro</value>').appendTo(selectMes);
	$('<option value="11">Novembro</value>').appendTo(selectMes);
	$('<option value="12">Dezembro</value>').appendTo(selectMes);
	
	var selectAno = $('<select>', {
		name: idCampo + "_ano",
		id: idCampo + "_ano"
	});
	div.append(selectAno);
	
	for (var i = 1912; i <= 2112; i++) {
		$('<option value="' + i + '">' + i + '</value>').appendTo(selectAno);
	}
	
	return div;
}

function instanciarWidget(tipo, id, valor) {
	return window.tipo2widgetFunc[tipo](id, valor)
}

// Eventos

function bindNovo(colunas) {
	$("body").bind('keypress', function(event){
		if (event.charCode == 110 && event.altKey) { // Alt + n
			var tr = $('<tr id="listagem0">');
			for (var i = 0; i < colunas; i++) {
				$('<td>').appendTo(tr);
			}
			
			$("#listagem").append(tr);
			habilitaEdicaoLinha(0);
		}
	});
}

function bindEdicaoLinha(id) {
	var handler = function () {
		habilitaEdicaoLinha(id, handler)
	};
					
	$("#listagem" + id).bind('click', handler);	
}

function habilitaEdicaoLinha(id, handler) {
	var tr = $("#listagem" + id);
	habilitaEditar($(tr).children("td:nth-child(1)"), "tipoDespesa");
	habilitaEditar($(tr).children("td:nth-child(2)"), "valor");
	habilitaEditar($(tr).children("td:nth-child(3)"), "data");
	
	if (handler)
		$(tr).unbind('click', handler);
	
	var link = null;
	if (id && id > 0){
		link = "/LivroCaixa/exemplo/" + id
	}else{
		link = "/LivroCaixa/exemplo"	
	}
	
	$("<a href='#' onclick='salvarAjax($(this), " + link + ")'>Salvar</a>")
		.appendTo($(tr).children("td:nth-child(4)"))
		
	$(tr).children("td:nth-child(4)").append(" ");

	$('<a href="#" onclick="excluirAvoAjax($(this), ' + link + ')">Excluir</a>')
		.appendTo($(tr).children("td:nth-child(4)"))
}

function habilitaEditar(elemento, idCampo) {
	elemento.append(window.coluna2widget[idCampo])
//	var valor = elemento.text()
//	var campo = $("#widget_" + idCampo)
//	campo.children("input:nth-child(1)").val(valor)
//    elemento.html( campo.html() );
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