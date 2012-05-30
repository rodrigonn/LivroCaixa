registrarTipos();
registrarEditores();

function registrarEditores() {
	window.editorLinhaEditavel = {
		inicializarPagina : function() {
		},
		novaInstancia : novaLinha,
		editarInstancia : editarInstanciaLinhaEditavel,
		getAtributoValor : getAtributoValorCelulaEditavel,
		ocultarEditor : function() {
		}
	}

	window.editorPopup = {
		inicializarPagina : carregarForm,
		novaInstancia : abreFormNovo,
		editarInstancia : editarInstanciaLinhaEditavel,
		getAtributoValor : getAtributoValorCelulaEditavel,
		ocultarEditor : function() {
		}
	}
}

/*
 * ---- Código do editor "LinhaEditavel" ----
 */

// Desenha uma nova linha para inserção dos dados da nova instância
function novaLinha() {
	var tr = $('<tr id="listagem0">');
	for ( var i = 0; i < window.colunas.length; i++) {
		$('<td>').appendTo(tr);
	}

	$("#list-" + window.entidade + " table tbody").append(tr);
	window.instanciaEdicao = "0";
	editarInstancia(tr);
}

// Obtém o nome do atributo e o seu valor, para montar o JSON,
// a partir de uma célula de uma linha editável
function getAtributoValorCelulaEditavel(tr, indice) {
	var coluna = window.colunas[indice - 1];
	var td = tr.children("td:nth-child(" + indice + ")");
	return coluna.edicao2json(td, coluna);
}

/*
 * Desenha uma nova linha de edição, após a linha informada por parâmetro. A
 * linha informada será removida, se for uma nova linha. Se for uma linha já
 * existente, será ocultada e terá seu id modificado. Também desenha a célula
 * com as opções de cancelar e excluir.
 */
function editarInstanciaLinhaEditavel(tr, id) {
	var novoTr = $('<tr id="editor' + id + '">');
	tr.after(novoTr);

	desenhaCelulasEditaveis(novoTr, tr);
	desenhaCelulaOpcoes(novoTr, id);

	if (id == "0") {
		tr.remove();
	} else {
		tr.hide();
	}
}

function desenhaCelulasEditaveis(novoTr, antigoTr) {
	var quantColunas = window.colunas.length;
	for ( var i = 1; i <= quantColunas; i++) {
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
		td.append($('<a href="#" onclick="excluirAjax(\'' + id
				+ '\')">Excluir</a>'));
		td.append(" ");
	}

	td
			.append($('<a href="#" onclick="cancelarLinhaEditavel($(this))">Cancelar</a>'));
	tr.append(td);
}

function cancelarLinhaEditavel(elemento) {
	window.instanciaEdicao = "cancelado";

	var tr = elemento.parent().parent();
	var id = tr.attr('id').replace("editor", "");

	if (id != "0") {
		var trOculto = $('#listagem' + id);
		trOculto.show();
	}

	tr.remove();
}

/*
 * ---- Código do editor "Popup" ----
 */

function carregarForm() {
	var div = $('<div id="editor" title="Detalhes de ' + window.entidade
			+ '" />');
	var form = $('<form>');

	getDivPrincipal().after(div);
	div.append(form);
	
	window.editorPopup.elementos = [];

	construirForm(form);

	div.dialog({
		autoOpen : false,
		height : 500,
		width : 500,
		modal : true,
		buttons : {
			Salvar : function() {
				$(this).dialog("close");
			},
			Cancelar : function() {
				$(this).dialog("close");
			}
		},
		close : function() {
			div.attr('id', 'editor');
		}
	});
}

function construirForm(form) {
	var quantColunas = window.colunas.length;
	for ( var i = 1; i <= quantColunas; i++) {
		desenharLinhaForm(form, window.colunas[i - 1], i);
		form.append("<br>");
	}

	//Ajustar tamanho das labels
	var max = 0;
	$("label").each(function() {
		if ($(this).width() > max)
			max = $(this).width();
	});
	$("label").width(max + 10);
}

function desenharLinhaForm(form, coluna, indice) {
	coluna.linhaForm(form, coluna, indice);
}

function abreFormNovo() {
	var div = $("#editor");
	div.dialog("open");
	div.attr('id', 'editor0');
}

function registrarTipos() {

	window.tipoNumber = {
		plano2edicao : criarNumber,
		edicao2json : getInputValue,
		json2plano : getAttributeValue,
		linhaForm : linhaNumber
	}

	window.tipoMoeda = {
		plano2edicao : criarMoeda,
		edicao2json : getInputValue,
		json2plano : getMoedaValue,
		linhaForm : linhaMoeda
	}

	window.tipoText = {
		plano2edicao : criarText,
		edicao2json : getInputValue,
		json2plano : getAttributeValue,
		linhaForm : linhaTexto
	}

	window.tipoDate = {
		plano2edicao : criarDatePicker,
		edicao2json : getInputValue,
		json2plano : getAttributeValue,
		linhaForm : linhaData
	}

	window.tipoSelectNomeId = {
		plano2edicao : criarSelectAjax,
		edicao2json : getSelectValue,
		json2plano : getNomeId,
		linhaForm : textoSimples
	}

	window.tipoHierarquia = {
		plano2edicao : criarAutocompleteAjax,
		edicao2json : getInputValueId,
		json2plano : getNomeId,
		linhaForm : textoSimples
	}
	
	window.tipoItensNotaFiscal = {
		linhaForm: gridItensNotaFiscal
	}

	window.tipoSelectEstatico = {
		linhaForm: linhaSelectEstatico
	}
}

function getInputValue(td, coluna) {
	var valor = td.children("input:nth-child(1)").val();
	var att = "\"" + coluna.nome + "\" : \"" + valor + "\", ";
	return att;
}

function getInputValueId(td, coluna) {
	var valor = td.children("input:nth-child(1)").val();
	var att = "\"" + coluna.nome + "Id\" : \"" + valor + "\", ";
	return att;
}

function getSelectValue(td, coluna) {
	var valor = td.children("select:nth-child(1)").val();
	return "\"" + coluna.nome + "Id\" : \"" + valor + "\", ";
}

function getAttributeValue(td, mapa, coluna) {
	var valor = mapa[coluna.nome];
	td.append(valor);
}

function getMoedaValue(td, mapa, coluna) {
	var valor = mapa[coluna.nome];
	td.append(decimais2(valor));
}

function decimais2(valor) {
	return ("" + valor.toFixed(2)).replace(".", ",");
}

function getNomeId(td, mapa, coluna) {
	var nome = mapa[coluna.nome + "Nome"];
	var id = mapa[coluna.nome + "Id"];
	$("<input type='hidden' value='" + id + "' />").appendTo(td);
	td.append(nome);
}

function criarNumber(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="number" id="edicao' + indice + '">');

	input.val(valor);
	tdNovo.append(input);
	tdNovo.attr('align', 'right');
}

function linhaNumber(form, coluna, indice) {
	var idCampo = 'edicao' + indice;

	form.append(criarLabel(idCampo, coluna));
	var input = criarInput("number", idCampo);
	form.append(input);
	cadastrarElementoPopup(input);
}

function cadastrarElementoPopup(elemento) {
	window.editorPopup.elementos.push(elemento);
}

function criarLabel(id, coluna) {
	return $('<label for="' + id + '" class="etiqueta">' + coluna.descricao + ': </label>');
}

function criarInput(tipo, id) {
	return $('<input type="' + tipo +'" id="' + id + '" class="text ui-widget-content ui-corner-all campo">');
}

function criarMoeda(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="text" id="edicao' + indice + '">');

	input.val(valor);
	tdNovo.append(input);
	tdNovo.attr('align', 'right');

	priceFormat(input);
}

function linhaMoeda(form, coluna, indice) {
	var idCampo = 'edicao' + indice;
	var input = criarInput("number", idCampo);

	form.append(criarLabel(idCampo, coluna));
	form.append(input);
	cadastrarElementoPopup(input);
	
	priceFormat(input);
}

function criarText(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="text" id="edicao' + indice + '">');

	input.val(valor);
	tdNovo.append(input);
}

function linhaTexto(form, coluna, indice) {
	var idCampo = 'edicao' + indice;

	form.append(criarLabel(idCampo, coluna));
	var input = criarInput("text", idCampo);
	form.append(input);
	cadastrarElementoPopup(input);
}

function criarDatePicker(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.text();

	var input = $('<input type="text" id="edicao' + indice + '">');
	input.datepicker({
		dateFormat : "dd/mm/yy",
		defaultDate : 0
	});

	input.datepicker($.datepicker.regional['pt-BR']);

	input.val(valor);
	tdNovo.append(input);
}

function linhaData(form, coluna, indice) {
	var idCampo = 'edicao' + indice;

	var input = criarInput("text", idCampo);
	input.datepicker({
		dateFormat : "dd/mm/yy",
		defaultDate : 0
	});

	input.datepicker($.datepicker.regional['pt-BR']);

	form.append(criarLabel(idCampo, coluna));
	form.append(input);
	cadastrarElementoPopup(input);
}

function criarAutocompleteAjax(tdNovo, tdAntigo, coluna, indice) {
	var valor = tdAntigo.children("input:nth-child(1)").val();
	var descricao = tdAntigo.text();

	var oculto = $("<input type='hidden' value='" + valor + "' />")
	oculto.appendTo(tdNovo);

	var input = $('<input type="text" id="edicao' + indice + '">');
	input.val(descricao);

	input.autocomplete({
		source : function(request, response) {
			$.ajax({
				url : coluna.url,
				type : "POST",
				datatype : "jsonp",
				data : {
					pesquisa : request.term
				},
				success : function(data) {
					response($.map(data, function(item) {
						var linha = eval(item);
						return {
							label : linha.descricao,
							value : linha.valor,
							id : linha.id
						}
					}));
				}
			});

		},
		select : function(event, ui) {
			if (ui.item) {
				input.val(ui.item.value);
				oculto.val(ui.item.id);
				return false;
			}
		}
	});

	tdNovo.append(input);
}

function criarSelectAjax(tdNovo, tdAntigo, coluna, indice) {
	var select = $('<select>', {
		name : "edicao" + indice,
		id : coluna.nome
	});

	var valor = tdAntigo.children("input:nth-child(1)").val();

	$.getJSON(coluna.url, function(json) {
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

function textoSimples(form, coluna, indice) {
	var p = $("<p>Campo " + indice + ": " + coluna.nome + "</p>");
	form.append(p);
	cadastrarElementoPopup(p);
}

function gridItensNotaFiscal(form, coluna, indice) {
	var table = $('<table>');
	construirLinhaNovoProduto(table);

	var terceiraLinha = $('<tr>');
	table.append(terceiraLinha);
	terceiraLinha.append($('<td class="subTituloItens">Produto</td>'));
	terceiraLinha.append($('<td class="subTituloItens">Unidade</td>'));
	terceiraLinha.append($('<td class="subTituloItens">Vl. Unitário</td>'));
	terceiraLinha.append($('<td class="subTituloItens">Quantidade</td>'));
	terceiraLinha.append($('<td class="subTituloItens">Vl. Total</td>'));
	terceiraLinha.append($('<td class="subTituloItens"></td>'));

	form.append(table);
	cadastrarElementoPopup(table);
}

function construirLinhaNovoProduto(table) {
	var linha = $('<tr class="tituloItens ui-widget-header ui-corner-all">');
	table.append(linha);

	var celulaTitulo = $('<td>Itens</td>');
	linha.append(celulaTitulo);
	
	var celulaNovo = $('<td colspan="5"> Novo: </td>');
	linha.append(celulaNovo);

	var inputValor = 
		$('<input type="text" title="Valor" class="camposItem">');
	var inputQuantidade = 
		$('<input type="text" title="Quantidade" class="camposItem">');

	var inputProduto = autoCompleteProduto(inputValor, inputQuantidade);

	celulaNovo.append(inputProduto);
	celulaNovo.append(inputValor);
	celulaNovo.append(inputQuantidade);
	
	priceFormat(inputValor);
	
	inputProduto.hint();
	inputValor.hint();
	inputQuantidade.hint();
	
	escutarEnter(table, inputProduto, inputProduto, inputValor, inputQuantidade); 
	escutarEnter(table, inputValor, inputProduto, inputValor, inputQuantidade);
	escutarEnter(table, inputQuantidade, inputProduto, inputValor, inputQuantidade); 
}

function escutarEnter(table, input, inputProduto, inputValor, inputQuantidade) {
	input.on('keypress', function(event) {
		if (event.keyCode == 13) { //ENTER
			salvarItem(table, inputProduto, inputValor, inputQuantidade);
		}
	});	
}

function salvarItem(table, inputProduto, inputValor, inputQuantidade) {
	var idProduto = window.vendaPopupIdProdutoSelecionado;
	var valor = inputValor.val();
	var quantidade = inputQuantidade.val();
	inputProduto.val('');
	inputValor.val('');
	inputQuantidade.val('');
	window.vendaPopupIdProdutoSelecionado = null;
	
	var linha = $('<tr class="vendaPopupLinhaItem">teste</tr>');
	table.append(linha);
}

function priceFormat(input) {
	input.priceFormat({
		prefix : '',
		centsSeparator : ',',
		thousandsSeparator : '.',
		clearPrefix : true
	});	
}

function autoCompleteProduto(inputValor, inputQuantidade) {
	var inputProduto = 
		$('<input type="text" id="seletorProduto" title="Produto">');

	inputProduto.autocomplete({
		source : function(request, response) {
			$.ajax({
				url : '/LivroCaixa/ajax/produto/porNome',
				type : "POST",
				datatype : "jsonp",
				data : {
					pesquisa : request.term
				},
				success : function(data) {
					response($.map(data, function(item) {
						var linha = eval(item);
						return {
							label : linha.descricao,
							value : linha.valor,
							id : linha.id,
							preco: decimais2(linha.preco)
						}
					}));
				}
			});

		},
		select : function(event, ui) {
			if (ui.item) {
				inputProduto.val(ui.item.label);
				inputValor.val(ui.item.preco);
				inputQuantidade.focus();
				window.vendaPopupIdProdutoSelecionado = ui.item.id;
				return false;
			} else {
				window.vendaPopupIdProdutoSelecionado = null;
			}
		}
	});

	return inputProduto;
}

function linhaSelectEstatico(form, coluna, indice) {
	//TODO
}