carregarRelatorio();


function carregarRelatorio() {
	$.getJSON('/LivroCaixa/ajax/gasto/relatorio', function(json) {
		var mapa = eval(json);
		var table = $("table");
		
		montarCabecalho(table, eval(mapa.colunas));		
		montarLinhas(table, eval(mapa.linhas), eval(mapa.celulas));
	});
}

function montarCabecalho(table, colunas) {
	var tr = $("<tr>");
	table.append(tr);
	tr.append("<td>Tipo</td>");
	tr.addClass("nivel0");
	
	$.each(colunas, function(i, coluna) {
		tr.append("<td colspan='2'>" + coluna + "</td>");
	});
}

function montarLinhas(table, linhas, celulas) {
	for(var i = 0; i < linhas.length; i++) {
		var linha = eval(linhas[i]);
		
		var tr = $("<tr>");
		table.append(tr);
		tr.addClass("nivel" + linha.nivel);
		tr.append("<td>" + linha.nome + "</td>");

		$.each(celulas[i], function(i, tupla) {
			tupla = eval(tupla);
			tr.append("<td>" + tupla.valor.toFixed(2) + "</td>");			
			tr.append("<td>" + tupla.percentual.toFixed(1) + "%</td>");			
		});
	}
}