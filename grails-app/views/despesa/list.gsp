
<%@ page import="livrocaixa.Despesa" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'despesa.label', default: 'Despesa')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	    <r:require module="jquery-ui"/>
	

	</head>
	<body>
	
		<a href="#list-despesa" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>

		<g:javascript src="framework.js" />
		<g:javascript src="despesa.js" />

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
				<tbody>
				<g:each in="${despesaInstanceList}" status="i" var="despesaInstance">
					<tr id="listagem${despesaInstance.id}" class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${despesaInstance.id}">${fieldValue(bean: despesaInstance, field: "tipoDespesa")}</g:link></td>
					
						<td>${fieldValue(bean: despesaInstance, field: "valor")}</td>
					
						<td><g:formatDate date="${despesaInstance.data}" /></td>
						<td></td>
					<script>
						bindEdicaoLinha(${despesaInstance.id});
					</script>
					</tr>
				
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${despesaInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
