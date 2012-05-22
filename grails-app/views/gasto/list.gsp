
<%@ page import="livrocaixa.Gasto" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'gasto.label', default: 'Gasto')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	

	</head>
	<body>
		<a href="#list-gasto" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><a href="#" id="botaoCriar"><g:message code="default.new.label" args="[entityName]" /></a></li>
			</ul>
		</div>

		<div id="list-gasto" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<th><g:message code="gasto.tipoGasto.label" default="Tipo Gasto" /></th>
					
						<g:sortableColumn property="valor" title="${message(code: 'gasto.valor.label', default: 'Valor')}" />
					
						<g:sortableColumn property="data" title="${message(code: 'gasto.data.label', default: 'Data')}" />
					
						<th>Opções</th>
					</tr>
				</thead>
				
				<tbody> </tbody>
				
			</table>
			<div class="pagination">
				<g:paginate total="${gastoInstanceTotal}" />
			</div>
		</div>
		<g:javascript src="jquery.price_format.1.7.js" />
		<g:javascript src="eventos.js" />
		<g:javascript src="tipos.js" />
		<g:javascript src="nn2.js" />
		<g:javascript src="gasto.js" />
	</body>
</html>
