
<%@ page import="livrocaixa.Despesa" %>
<!doctype html>
<html>
	<head>
	    <g:javascript src="jquery.hotkeys.js" />
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'despesa.label', default: 'Despesa')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>

	</head>
	<body>
	
<div id="widget_tipoDespesa" style="display: none;">
	<g:select id="tipoDespesa" name="tipoDespesa.id" from="${livrocaixa.TipoDespesa.list()}" optionKey="id" required="" value="${despesaInstance?.tipoDespesa?.id}" class="many-to-one"/>
</div>
<div id="widget_valor" style="display: none;">
	<g:field type="number" name="valor" step="0.01" required="" value="${fieldValue(bean: despesaInstance, field: 'valor')}"/>
</div>
<div id="widget_data" style="display: none;">
	<g:datePicker name="data" precision="day"  value="${despesaInstance?.data}"  />
</div>
	
		<a href="#list-despesa" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-despesa" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<th><g:message code="despesa.tipoDespesa.label" default="Tipo Despesa" /></th>
					
						<g:sortableColumn property="valor" title="${message(code: 'despesa.valor.label', default: 'Valor')}" />
					
						<g:sortableColumn property="data" title="${message(code: 'despesa.data.label', default: 'Data')}" />
					
						<th>Opções</th>
					</tr>
				</thead>
				<tbody id="listagem">
				<g:each in="${despesaInstanceList}" status="i" var="despesaInstance">
					<tr  id="listagem${i}" class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${despesaInstance.id}">${fieldValue(bean: despesaInstance, field: "tipoDespesa")}</g:link></td>
					
						<td>${fieldValue(bean: despesaInstance, field: "valor")}</td>
					
						<td><g:formatDate date="${despesaInstance.data}" /></td>
						
						<td>
							<a href="#"  style="display: none;" 
								onclick="salvarAjax($(this), '<g:createLink action="exemplo" id="${despesaInstance.id}" />')">
								Salvar</a>
							<a href="#"  style="display: none;" 
								onclick="excluirAvoAjax($(this), '<g:createLink action="exemplo" id="${despesaInstance.id}" />')">
								Excluir</a>
              			</td>
					</tr>
					
					
				<script>
var handler${i} = function () {
	habilitaEditar($(this).children("td:nth-child(1)"), "tipoDespesa");
	habilitaEditar($(this).children("td:nth-child(2)"), "valor");
	habilitaEditar($(this).children("td:nth-child(3)"), "data");
	$("#listagem${i}").unbind('click', handler${i});
	$("#listagem${i}").children("td:nth-child(4)").children("a:nth-child(1)").show();
	$("#listagem${i}").children("td:nth-child(4)").children("a:nth-child(2)").show();
};
				
$("#listagem${i}").bind('click', handler${i});	

				</script>
				
				</g:each>
				</tbody>
				
			
			</table>
			<div class="pagination">
				<g:paginate total="${despesaInstanceTotal}" />
			</div>
		</div>
		
		<script>
$("body").bind('keypress', function(event){

	if (event.charCode == 110 && event.altKey) { // Alt + n
  		$("#listagem").append('<tr><td>1</td><td>2</td><td>3</td></tr>')
	}
});
		</script>
	</body>
	
</html>
