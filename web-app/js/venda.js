cadastrarEntidade('venda', 'livrocaixa.Venda', 'Popup');

cadastrarColuna('Text', {
	nome: 'numeroNotaFiscal', 
	descricao: 'Número da NF'
});
cadastrarColuna('Autocomplete', {
	nome: 'cliente', 
	descricao: 'Cliente',
	url: "/LivroCaixa/ajax/cliente/porNome"
});
cadastrarColuna('Autocomplete', {
	nome: 'vendedor', 
	descricao: 'Vendedor',
	url: "/LivroCaixa/ajax/vendedor/porNome"
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