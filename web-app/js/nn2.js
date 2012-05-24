/* 
--------------------------------
Framework nn2 - NANUVEM para Web 2.0
--------------------------------
*/



/* ---- 
Trechos de código prontos obtidos da Web
---- */

//Zerando o locale do datepicker e depois setando para pt-BR
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

//Extrai os parâmetros get da URL atual.
//Obtida em http://jquery-howto.blogspot.com.br/2009/09/get-url-parameters-values-with-jquery.html
//TODO É usada para paginação com Ajax, mas talvez seja removida quando a
//paginação for alterada para usar o período.
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


/* ----
Código a ser executado no carregamento desse script
---- */

//Zerando os dados de configuração global da página
window.entidade = null; 
window.classe = null; 
window.colunas = [];
window.instanciaEdicao = null;

bindTeclado();

//O clique em #botaoCriar cria uma nova instância
$('#botaoCriar').click(function() {
	novaInstancia();
});


/* ----
Código independente de editor.
---- */

//Escuta os eventos de teclado na página de listagem
function bindTeclado() {
	$("body").live('keypress', function(event) {
		
		if (event.keyCode == 13) { //ENTER

			//Se nenhuma linha está sendo editada, cria uma nova linha
			if (window.instanciaEdicao == null) { 
				novaInstancia();
				
			//Caso contrário, salva a linha que está sendo editada
			} else {
				salvarInstancia();
			}
		}
	});
}

//Abre a UI para inserção de uma nova instância
//TODO esse ponto será generalizado no framework
function novaInstancia() {
	novaLinha();
}

//Agrega os dados inseridos e envia o comando salvar (criar ou editar)
//para o servidor. Reage à resposta do comando e atualiza a tela de listagem.
function salvarInstancia() {
	var tr = $('#listagem' + window.instanciaEdicao);
	var link = getLink(window.instanciaEdicao);

	var method = null;
	if (window.instanciaEdicao == "0") {
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

//Monta a string json para ser enviada na criação e edição de instâncias
function montarJSON(elemento) {
	var json = '{';

	var quantColunas = window.colunas.length;
	for ( var i = 1; i <= quantColunas; i++) {
		json += getAtributoValor(elemento, i);
	}
	json += "\"class\" : \"" + window.classe + "\" }";
	return jQuery.parseJSON(json);
}

//Obtém o nome do i-ésimo atributo e o seu valor, para montar o JSON.
//TODO esse ponto será generalizado no framework
function getAtributoValor(elemento, i) {
	return getAtributoValorCelulaEditavel(elemento, i);	
}

/*
Recarrega os objetos da listagem.
Apaga as linhas existentes e desenha as linhas atualizadas.
Utiliza o comando Ajax-REST GET /recurso
O table da listagem precisa estar dentro de um div com o id list-nomeSimplesEntidade.
Isso é gerado automaticamente pelo scaffold do Grails.
*/
function carregarListagem() {
	window.instanciaEdicao = null;
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
		if (td != null) {
			tr.append(td);
		}
	}

	bindEdicaoLinha(item.id);
	return tr;
}

//Extrai os dados, relativos a uma coluna, de um objeto JSON e gera uma célula (td).
function json2plano(json, coluna) {
	var td = $("<td>");
	var tipoColuna = coluna.tipo;
	coluna.json2plano(td, json, coluna);
	return td;
}

//Cria e associa um handler para o click em uma linha (tr) que habilita a 
//edição dos seus dados. Acha a linha cujo id é "listagem" + id
function bindEdicaoLinha(id) {
	var tr = $("#listagem" + id);
	tr.live('click', function() {
		
		if (window.instanciaEdicao == null ) {
			var tr = $(this);
			var id = getId(tr);
			window.instanciaEdicao = id;
			
			editarInstancia(tr);			
		}
		
		//Gambiarra para o cancelar funcionar direito
		if (window.instanciaEdicao == "cancelado") { 
			window.instanciaEdicao = null;
		}
	});
}


//Obtem o id da instância relativa ao tr. 
function getId(tr) {
	return tr.attr('id').replace("listagem", "");
}

//Desenha a UI para edição de uma instância.
//TODO esse ponto será generalizado no framework
function editarInstancia(tr) {
	editarInstanciaLinhaEditavel(tr, window.instanciaEdicao);
	$("#edicao1").focus(); //Seta o foco no primeiro campo da edição
}

function excluirAjax(elemento, id) {
	var link = getLink(id);
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


/* ----
Código dependente do editor "LinhaEditavel"
---- */

//Desenha uma nova linha para inserção dos dados da nova instância
function novaLinha() {
	var tr = $('<tr id="listagem0">');
	for ( var i = 0; i < window.colunas.length; i++) {
		$('<td>').appendTo(tr);
	}

	$("#list-" + window.entidade + " table tbody").append(tr);
	window.instanciaEdicao = "0";
	editarInstancia(tr);	
}

//Obtém o nome do atributo e o seu valor, para montar o JSON,
//a partir de uma célula de uma linha editável
function getAtributoValorCelulaEditavel(tr, indice) {
	var coluna = window.colunas[indice - 1];
	var td = tr.children("td:nth-child(" + indice + ")");
	return coluna.edicao2json(td, coluna);
}

/*
Desenha uma nova linha de edição, após a linha informada por parâmetro.
A linha informada será removida, se for uma nova linha. Se for uma linha
já existente, será ocultada e terá seu id modificado.
Também desenha a célula com as opções de cancelar e excluir.
*/
function editarInstanciaLinhaEditavel(tr, id) {
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
	var td = $('<td>');

	if (id != "0") {
		td.append($('<a href="#" onclick="excluirAjax($(this), \'' + id
				+ '\')">Excluir</a>'));
		td.append(" ");
	}

	td.append($('<a href="#" onclick="cancelarLinhaEditavel($(this))">Cancelar</a>'));
	tr.append(td);	
}

function cancelarLinhaEditavel(elemento) {
	var tr = elemento.parent().parent();

	window.instanciaEdicao = "cancelado";
	
	if (tr.attr("id") == "listagem0") {
		tr.remove();

	} else {
		var quantColunas = window.colunas.length;
		var id = getId(tr);

		var trOculto = $('#listagem' + id + 'oculto');
		trOculto.show();
		trOculto.attr("id", 'listagem' + id);
		tr.remove();
	}
}


/* ----
Funções de configuração que são invocadas pelo cliente
---- */

//Cadastra o nome simples da entidade (ex. gasto) e 
//o pacote e nome da classe da entidade (ex. abc.gasto).
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

