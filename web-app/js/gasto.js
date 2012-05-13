cadastrarEntidade('gasto', 'livrocaixa.Gasto');
registrarTipos();

cadastrarColuna('tipoGasto', 'Hierarquia', {
	url: "/LivroCaixa/ajax/tipogasto/porNome"
});
cadastrarColuna('valor', 'Number');
cadastrarColuna('data', 'Date');

bindNovo();
carregarListagem();
