cadastrarEntidade('gasto', 'livrocaixa.Gasto');
cadastrarColunaSelect('tipoGasto', 'nomeid', 'tipogasto');
cadastrarColuna('valor', 'number', '0');
cadastrarColuna('data', 'date', '');
registrarTipos();
bindNovo();
carregarListagem();