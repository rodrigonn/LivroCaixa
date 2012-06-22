
<%@ page import="livrocaixa.Compra" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'compra.label', default: 'Compra')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-compra" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><a href="#" id="botaoCriar"><g:message code="default.new.label" args="[entityName]" /></a></li>
			</ul>
		</div>
		<div id="list-compra" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="numeroNotaFiscal" title="${message(code: 'compra.numeroNotaFiscal.label', default: 'Número Nota Fiscal')}" />
						
						<th><g:message code="compra.fornecedor.label" default="Fornecedor" /></th>
						
						<g:sortableColumn property="data" title="${message(code: 'compra.data.label', default: 'Data')}" />
						
						<g:sortableColumn property="valorTotal" title="Valor total" />
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
		<g:javascript src="jquery.price_format.1.7.js" />
		<g:javascript src="tipos.js" />
		<g:javascript src="nn2.js" />
		<g:javascript src="compra.js" />
	</body>
</html>
