<html>
    <head>
        <meta name="layout" content="main" />
        <jq:resources />
        <jqui:resources /> 
        <jqgrid:resources />
        <script type="text/javascript">
	        $(document).ready(function() {
                         <jqgrid:grid
                                id="despesa"
                                url="'${createLink(action: 'listJSON')}'"
                                editurl="'${createLink(action: 'editJSON')}'"
                                colNames="'Tipo Despesa', 'Data', 'Valor'"
                                colModel="{name:'tipoDespesa', editable: true},
                                                {name:'data', editable: true},
                                                {name:'valor', editable: true}"
                                cellEdit="true"
                                cellUrl="'${createLink(action: 'editJSON')}'"
                                sortname="'data'"
                                caption="'Despesas'"
                                height="300"
                                autowidth="true"
                                scrollOffset="0"
                                viewrecords="true"
                                showPager="true"
                                datatype="'json'">
                                <jqgrid:filterToolbar id="despesaStandard" searchOnEnter="false" />
                                <jqgrid:navigation id="despesaStandard" add="true" edit="true" 
                                      del="true" search="true" refresh="true" />
                                <jqgrid:resize id="despesaStandard" resizeOffset="-2" />
                         </jqgrid:grid>
               });
        </script>
   </head>
   <body>
         <jqgrid:wrapper id="despesa" />
   </body>
</html>