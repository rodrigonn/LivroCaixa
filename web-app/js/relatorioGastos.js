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
	var tr2 = $("<tr>");
	table.append(tr);
	table.append(tr2);
	tr.append("<td>Tipo</td>");
	tr.addClass("nivel0");
	tr2.append("<td> </td>");
	tr2.addClass("nivel4");
	
	$.each(colunas, function(i, coluna) {
		var td = $("<td colspan='2'>" + coluna + "</td>");
		td.css("text-align", "center");
		tr.append(td);
		var td2 = $("<td>R$</td>");
		var td2b = $("<td>%</td>");
		td2.css("text-align", "right");
		td2b.css("text-align", "center");//TODO
		tr2.append(td2);
		tr2.append(td2b);
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
			var tdValor = $("<td>" + tupla.valor.toFixed(2) + "</td>"); 
			tdValor.css("text-align", "right");
			tr.append(tdValor);			
			tr.append("<td>" + tupla.percentual.toFixed(1) + "%</td>");			
		});
	}
}