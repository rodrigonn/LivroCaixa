registrarColunas();

function registrarColunas() {
	window.coluna2widget['tipoDespesa'] = instanciarWidget('text', 'tipoDespesa', "1");
	window.coluna2widget['valor'] = instanciarWidget('number', 'valor', "0");
	window.coluna2widget['data'] = instanciarWidget('date', 'data', "");
}