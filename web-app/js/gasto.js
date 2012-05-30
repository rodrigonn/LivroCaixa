cadastrarEntidade('gasto', 'livrocaixa.Gasto', 'LinhaEditavel');

cadastrarColuna('Hierarquia', {
	nome: 'tipoGasto',
	descricao: 'Tipo de Gasto',
	url: "/LivroCaixa/ajax/tipogasto/porNome"
});
cadastrarColuna('Moeda', {
	nome: 'valor', 
	descricao: 'Valor'
});
cadastrarColuna('Date', {
	nome: 'data', 
	descricao: 'Data', 
});

inicializarPagina();