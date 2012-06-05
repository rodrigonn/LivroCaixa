cadastrarEntidade('compra', 'livrocaixa.Compra', 'Popup');

cadastrarColuna('Text', {
	nome: 'numeroNotaFiscal', 
	descricao: 'Número da NF'
});
cadastrarColuna('Autocomplete', {
	nome: 'fornecedor', 
	descricao: 'Fornecedor',
	url: "/LivroCaixa/ajax/fornecedor/porNome"
});
cadastrarColuna('Date', {
	nome: 'data', 
	descricao: 'Data de emissão'
});
cadastrarColuna('ItensNotaFiscal', {
	nome: 'valorTotal', 
	descricao: 'Valor total'
});

inicializarPagina();