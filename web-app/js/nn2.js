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

/**
* @author Remy Sharp, additions by nachokb
* @url http://remysharp.com/2007/01/25/jquery-tutorial-text-box-hints/
*/

(function ($) {

/* $d("....")
 *
 *  Easy access to jQuery's per-element data cache.
 *
 *  Examples
 *
 *    $d("#foo").age = 12
 *    $d("#foo").age //=> 12
 *    $d("#foo").age = $d("#foo").age + 1
 *
 *  Slightly adapted from http://yehudakatz.com/2009/04/20/evented-programming-with-jquery/ by Yehuda Katz.
 */
if (typeof($d) != "function") {
  $d = function(param) {
    var node = jQuery(param)[0];
    var id   = jQuery.data(node);

    jQuery.cache[id] || (jQuery.cache[id] = {});
    jQuery.cache[id].node = node;

    return jQuery.cache[id];
  }
}

//Coloca dicas (hints) nos campos de formulários
$.fn.hint = function (blurClass) {
  if (!blurClass) { 
    blurClass = 'blur';
  }
    
  return this.each(function () {
    // get jQuery version of 'this'
    var $input = $(this),
    
    // capture the rest of the variable to allow for reuse
      title = $input.attr('title'),
      isPassword = $input.attr('type') == 'password',
      $form = $(this.form),
      $win = $(window);

    var strategies = {
      changeValue: {
        init: function() {},
        add: function() {
          if ($input.val() === '') {
            $input.addClass(blurClass)
              .val(title);
          }
        },
        remove: function() {
          if ($input.val() === title && $input.hasClass(blurClass)) {
            $input.val('')
              .removeClass(blurClass);
          }
        },
        submit: function() {
          this.remove();
        }
      },

      replaceElement: {
        init: function() {
          $input.addClass("replaced-for-title");

          // create alternative text input element with title as value
          var $alt = $('<input type="text"></input>').attr({
            'class': $input.attr('class'),
            'name':  $input.attr('name'),
            'title': $input.attr('title'),
            'style': $input.attr('style')
          })
            .val(title)
            .insertBefore($input)
            .addClass("password-title")
            .addClass(blurClass)
            .hide()
            .focus(function() { // delegate to original
              $d($alt).original.focus();
            });
          $d($input).alternative = $alt;
          $d($alt).original = $input;
        },
        add: function() {
          if ($input.val() === '') {
            $input.hide();
            var id = $input.attr("id");
            $input.attr("id", null);
            $d($input).alternative.attr("id", id).show();
          }
        },
        remove: function() {
          if ($input.is(":hidden")) {
            var id = $d($input).alternative.attr("id");
            $d($input).alternative.attr("id", null).hide();
            $input.attr("id", id).show();
          }
        },
        submit: function() {
          $d($input).alternative.remove();
        }
      }
    }

    // only apply logic if the element has the attribute
    if (title) { 
      var strategyName = isPassword ? "replaceElement" : "changeValue";
      var strategy = strategies[strategyName];

      strategy.init();
      // on blur, set value to title attr if text is blank
      $input.blur(strategy.add)
        .focus(strategy.remove)
        .blur(); // now change all inputs to title

      // clear the pre-defined text when form is submitted
      $form.submit(strategy.submit);
      $win.unload(strategy.submit); // handles Firefox's autocomplete
    }
  });
};

})(jQuery);

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

			if (window.instanciaEdicao == "cancelado") { 
				window.instanciaEdicao = null;
			}

			//Se nenhuma linha está sendo editada, cria uma nova linha
			if (window.instanciaEdicao == null) { 
				novaInstancia();
				
			//Caso contrário, salva a linha que está sendo editada
			} else if (window.editor.enterParaSalvar){
				salvarInstancia();
			}
		}
	});
}

//Abre a UI para inserção de uma nova instância
function novaInstancia() {
	window.editor.novaInstancia();
}

//Agrega os dados inseridos e envia o comando salvar (criar ou editar)
//para o servidor. Reage à resposta do comando e atualiza a tela de listagem.
function salvarInstancia() {
	var id = window.instanciaEdicao;
	var elemento = $('#editor' + id);
	var link = getLink(id);

	var method = null;
	if (id == "0") {
		method = 'POST';
	} else {
		method = 'PUT';
	}

	var dados = montarJSON(elemento);

	jQuery.ajax({
		type : method,
		url : link,
		data : JSON.stringify(dados),
		processData: false, 
     	dataType: 'json', 
     	contentType: 'application/json',
		success : function(data, textStatus) {
			window.editor.ocultarEditor();
			carregarListagem();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//TODO
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
function getAtributoValor(elemento, i) {
	return window.editor.getAtributoValor(elemento, i);
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

//Retorna o div principal da página de listagem
function getDivPrincipal() {
	return $("#list-" + window.entidade);
}

/*
Obtem o link relativo a um recurso.
Se existir id, o link será relativo a uma instância.
Caso contrário (se o id for nulo ou zero), o link apontará 
para a lista completa de instâncias da entidade.
*/
function getLink(id) {
	if (id == null || id == "0") {
		return "../ajax/" + window.entidade;
	} else {
		return "../ajax/" + window.entidade + "/" + id;
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
	coluna.json2plano(td, json, coluna);
	return td;
}

//Cria e associa um handler para o click em uma linha (tr) que habilita a 
//edição dos seus dados. Acha a linha cujo id é "listagem" + id
function bindEdicaoLinha(id) {
	var tr = $("#listagem" + id);
	tr.live('click', function() {
		
		if (window.instanciaEdicao == null ) {
			window.instanciaEdicao = id;
			editarInstancia($(this));			
		}
		
		//Gambiarra para o cancelar funcionar direito
		if (window.instanciaEdicao == "cancelado") { 
			window.instanciaEdicao = null;
		}
	});
}

//Desenha a UI para edição de uma instância.
//TODO esse ponto será generalizado no framework
function editarInstancia(tr) {
	window.editor.editarInstancia(tr, window.instanciaEdicao);
//	editarInstanciaLinhaEditavel(tr, window.instanciaEdicao);
	$("#edicao1").focus(); //Seta o foco no primeiro campo da edição
}

function excluirAjax(id) {
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
Funções utilitárias
---- */

function getIcone(nome) {
	return "../images/icons/" + nome + ".png";
}

function s2d(str) {
	return parseFloat(str.replace(",", "."));
}

function priceFormat(input) {
	input.priceFormat({
		prefix : '',
		centsSeparator : ',',
		thousandsSeparator : '.',
		clearPrefix : true
	});	
}

function decimais2(valor) {
	return ("" + valor.toFixed(2)).replace(".", ",");
}


/* ----
Funções de configuração que são invocadas pelo cliente
---- */

//Cadastra o nome simples da entidade (ex. gasto) e 
//o pacote e nome da classe da entidade (ex. abc.gasto).
function cadastrarEntidade(entidade, classe, editor) {
	window.entidade = entidade;
	window.classe = classe;
	window.editor = window["editor" + editor];
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
function cadastrarColuna(tipoColuna, objColuna) {
	window.colunas.push(objColuna);
	var objTipo = window["tipo" + tipoColuna];
	objColuna.plano2edicao = objTipo.plano2edicao;
	objColuna.edicao2json = objTipo.edicao2json;
	objColuna.json2plano = objTipo.json2plano;
	objColuna.linhaForm = objTipo.linhaForm;
	objColuna.form2json = objTipo.form2json;
}

//Inicializa a página. Deve ser invocado após o cadastro de entidade e colunas
function inicializarPagina() {
	window.editor.inicializarPagina();
	carregarListagem();
}