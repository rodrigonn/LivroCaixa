cadastrarEntidade('gasto', 'livrocaixa.Gasto');

cadastrarColuna('tipoGasto', 'Hierarquia', {
	url: "/LivroCaixa/ajax/tipogasto/porNome"
});
cadastrarColuna('valor', 'Moeda');
cadastrarColuna('data', 'Date');

carregarListagem();
