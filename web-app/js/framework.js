$.datepicker.setDefaults($.datepicker.regional[""]);

/* Brazilian initialisation for the jQuery UI date picker plugin. */
/* Written by Leonildo Costa Silva (leocsilva@gmail.com). */
jQuery(function($){
	$.datepicker.regional['pt-BR'] = {
		closeText: 'Fechar',
		prevText: '&#x3c;Anterior',
		nextText: 'Pr&oacute;ximo&#x3e;',
		currentText: 'Hoje',
		monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['pt-BR']);
});

// Mapas de configuração

window.entidade = null;
window.classe = null;
window.colunas = [];

function cadastrarEntidade(entidade, classe) {
	window.entidade = entidade;
	window.classe = classe;
}

function cadastrarColuna(nomeColuna, tipoColuna, objColuna) {
	if (objColuna == null) {
		objColuna = new Object();
	}
	
	window.colunas.push(objColuna);
	var objTipo = window["tipo" + tipoColuna];
	objColuna.nome = nomeColuna;
	objColuna.plano2edicao = objTipo.plano2edicao;
	objColuna.edicao2json = objTipo.edicao2json;
	objColuna.json2plano = objTipo.json2plano;
}

function carregarListagem() {
	$.getJSON(getLink(), function(json) {
		$.each(json, function(i, item) {
			var linha = eval(item);  
			var tbody = $("#list-" + window.entidade + " table tbody");
			var tr = desenharLinha(linha);
			tbody.append(tr);
		});
	});
}

function desenharLinha(item) {
	var tr = $("<tr id='listagem" + item.id + "'>");

	for ( var i = 1; i <= window.colunas.length; i++) {
		var td = extrairCelula(item, window.colunas[i - 1]);
		tr.append(td);
	}
	
	bindEdicaoLinha(item.id);
	return tr;
}

function extrairCelula(json, coluna) {
	var td = $("<td>");
	var tipoColuna = coluna.tipo;
	coluna.json2plano(td, json, coluna);
	return td;
}

function getLink(id) {
	if (id == null || id == "0") {
		return "/LivroCaixa/ajax/" + window.entidade;
	} else {
		return "/LivroCaixa/ajax/" + window.entidade + "/" + id;
	}
}
