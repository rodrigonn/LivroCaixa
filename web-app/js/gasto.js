cadastrarEntidade('gasto', 'livrocaixa.Gasto');

cadastrarColuna('tipoGasto', 'Hierarquia', {
	url: "/LivroCaixa/ajax/tipogasto/porNome"
});
cadastrarColuna('valor', 'Number');
cadastrarColuna('data', 'Date');

carregarListagem();
