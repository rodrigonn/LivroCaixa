cadastrarEntidade('despesa', 'livrocaixa.Despesa');
cadastrarColunaSelect('tipoDespesa', 'nomeid', 'tipodespesa');
cadastrarColuna('valor', 'number', '0');
cadastrarColuna('data', 'date', '');
registrarTipos();
bindNovo();
carregarListagem();