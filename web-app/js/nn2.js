/* 
--------------------------------
Arquivo inicial do framework nn2
--------------------------------
*/


/*
Zerando o locale do datepicker e depois setando para pt-BR
*/
$.datepicker.setDefaults($.datepicker.regional[""]);

/* Brazilian initialisation for the jQuery UI date picker plugin. */
/* Written by Leonildo Costa Silva (leocsilva@gmail.com). */
jQuery(function($) {
	$.datepicker.regional['pt-BR'] = {
		closeText : 'Fechar',
		prevText : '&#x3c;Anterior',
		nextText : 'Pr&oacute;ximo&#x3e;',
		currentText : 'Hoje',
		monthNames : [ 'Janeiro', 'Fevereiro', 'Mar&ccedil;o', 'Abril', 'Maio',
				'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
				'Dezembro' ],
		monthNamesShort : [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul',
				'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
		dayNames : [ 'Domingo', 'Segunda-feira', 'Ter&ccedil;a-feira',
				'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado' ],
		dayNamesShort : [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
		dayNamesMin : [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
		weekHeader : 'Sm',
		dateFormat : 'dd/mm/yy',
		firstDay : 0,
		isRTL : false,
		showMonthAfterYear : false,
		yearSuffix : ''
	};
	$.datepicker.setDefaults($.datepicker.regional['pt-BR']);
});


/*
Extrai os parâmetros get da URL atual.

TODO É usada para paginação com Ajax, mas talvez seja removida quando a
paginação for alterada para usar o período.

Obtida em http://jquery-howto.blogspot.com.br/2009/09/get-url-parameters-values-with-jquery.html
*/
function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(
			window.location.href.indexOf('?') + 1).split('&');
	for ( var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

/*
Dados de configuração global da página.
Ver os métodos a seguir
*/
window.entidade = null; 
window.classe = null; 
window.colunas = []; 

/*
Cadastra o nome simples da entidade (ex. gasto) e 
o pacote e nome da classe da entidade (ex. abc.gasto).
*/
function cadastrarEntidade(entidade, classe) {
	window.entidade = entidade;
	window.classe = classe;
}

/*
Adiciona uma configuração de coluna na entidade já cadastrada.
Os tipos de coluna podem ser vistos em tipos.js.registrarTipos().
O nome do tipo deve ser informado sem o prefixo "tipo", que será
adicionado automaticamente.
O mapa objColuna deve ser utilizado quando o tipo precisar de mais
informações além do nome e tipo.

As funções conversoras do tipo são copiados para o objColuna.
*/
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

/*
Recarrega os objetos da listagem.
Apaga as linhas existentes e desenha as linhas atualizadas.
Utiliza o comando Ajax-REST GET /recurso
O table da listagem precisa estar dentro de um div com o id list-nomeSimplesEntidade.
Isso é gerado automaticamente pelo scaffold do Grails.
*/
function carregarListagem() {
	window.linhaEditavel = null;
	$.getJSON(getLink(), {
		offset : getUrlVars()["offset"],
		max : getUrlVars()["max"]
		}, 
		function(json) {
			var trs = $("#list-" + window.entidade + " table tbody tr");
			trs.remove();
			
			$.each(json, function(i, item) {
				var linha = eval(item);
				var tbody = $("#list-" + window.entidade + " table tbody");
				var tr = desenharLinha(linha);
				tbody.append(tr);
			});
	});
}

/*
Obtem o link relativo a um recurso.
Se existir id, o link será relativo a uma instância.
Caso contrário (se o id for nulo ou zero), o link apontará 
para a lista completa de instâncias da entidade.
*/
function getLink(id) {
	if (id == null || id == "0") {
		return "/LivroCaixa/ajax/" + window.entidade;
	} else {
		return "/LivroCaixa/ajax/" + window.entidade + "/" + id;
	}
}

/*
Desenha uma linha de listagem, a partir de um elemento JSON.
A linha (tr) terá id igual a "listagem" + item.id.
Invoca a função json2plano para desenha cada célula (td).
Efetua o bind do click para edição da linha.
*/
function desenharLinha(item) {
	var tr = $("<tr id='listagem" + item.id + "'>");

	for ( var i = 1; i <= window.colunas.length; i++) {
		var td = json2plano(item, window.colunas[i - 1]);
		tr.append(td);
	}

	bindEdicaoLinha(item.id);
	return tr;
}

/*
Extrai os dados, relativos a uma coluna, de um objeto JSON e
gera uma célula (td).
*/
function json2plano(json, coluna) {
	var td = $("<td>");
	var tipoColuna = coluna.tipo;
	coluna.json2plano(td, json, coluna);
	return td;
}

/*
Cria e associa um handler para o click em uma linha (tr)
que habilita a edição dos seus dados.
Acha a linha cujo id é "listagem" + id
*/
function bindEdicaoLinha(id) {
	var tr = $("#listagem" + id);
	tr.live('click', function() {
		
		if (window.linhaEditavel == null ) {
			habilitaEdicaoLinha($(this));
		}
		
		if (window.linhaEditavel == "cancelado") { 
			window.linhaEditavel = null;
		}
	});
}

/*
Desenha uma nova linha de edição, após a linha informada por parâmetro.
A linha informada será removida, se for uma nova linha. Se for uma linha
já existente, será ocultada e terá seu id modificado.
Também desenha a célula com as opções de cancelar e excluir.
*/
function habilitaEdicaoLinha(tr) {
	var id = getId(tr);
	window.linhaEditavel = id;

	var novoTr = $('<tr id="listagem' + id + '">');
	tr.after(novoTr);

	desenhaCelulasEditaveis(novoTr, tr);
	desenhaCelulaOpcoes(novoTr, id);

	if (id == "0") {
		tr.remove();
	} else {
		tr.hide();
		tr.attr("id", tr.attr("id") + "oculto");
	}

	$("#edicao1").focus(); //Seta o foco na primeira célula da linha
}

/*
Obtem o id da instância relativa ao tr. 
*/
function getId(tr) {
	return tr.attr('id').replace("listagem", "");
}

function desenhaCelulasEditaveis(novoTr, antigoTr) {
	var quantColunas = window.colunas.length;
	for (var i = 1; i <= quantColunas; i++) {
		var td = $('<td>');
		desenhaCelulaEditavel(td, antigoTr.children("td:nth-child(" + i + ")"),
				window.colunas[i - 1], i);
		novoTr.append(td);
	}	
}

function desenhaCelulaEditavel(tdNovo, tdAntigo, coluna, indice) {
	coluna.plano2edicao(tdNovo, tdAntigo, coluna, indice);
}

function desenhaCelulaOpcoes(tr, id) {
	var link = getLink(id);
	var td = $('<td>');

	if (id != "0") {
		td.append($('<a href="#" onclick="excluirAvoAjax($(this), \'' + link
				+ '\')">Excluir</a>'));
		td.append(" ");
	}

	td.append($('<a href="#" onclick="cancelar($(this))">Cancelar</a>'));
	tr.append(td);	
}