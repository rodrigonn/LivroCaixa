cadastrarEntidade('venda', 'livrocaixa.Venda', 'Popup');

cadastrarColuna('Text', {
	nome: 'numeroNotaFiscal', 
	descricao: 'Número da NF'
});
cadastrarColuna('Text', {
	nome: 'cliente', 
	descricao: 'Cliente'
});
cadastrarColuna('Date', {
	nome: 'data', 
	descricao: 'Data de emissão'
});
cadastrarColuna('ItensNotaFiscal', {
	nome: 'valorTotal', 
	descricao: 'Valor total'
});
cadastrarColuna('Text', {
	nome: 'status', 
	descricao: 'Status'
});

inicializarPagina();