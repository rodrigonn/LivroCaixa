
<%@ page import="livrocaixa.TipoGasto" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'tipoGasto.label', default: 'TipoGasto')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-tipoGasto" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-tipoGasto" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list tipoGasto">
			
				<g:if test="${tipoGastoInstance?.nome}">
				<li class="fieldcontain">
					<span id="nome-label" class="property-label"><g:message code="tipoGasto.nome.label" default="Nome" /></span>
					
						<span class="property-value" aria-labelledby="nome-label"><g:fieldValue bean="${tipoGastoInstance}" field="nome"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${tipoGastoInstance?.pai}">
				<li class="fieldcontain">
					<span id="pai-label" class="property-label"><g:message code="tipoGasto.pai.label" default="Pai" /></span>
					
						<span class="property-value" aria-labelledby="pai-label"><g:link controller="tipoGasto" action="show" id="${tipoGastoInstance?.pai?.id}">${tipoGastoInstance?.pai?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${tipoGastoInstance?.filhos}">
				<li class="fieldcontain">
					<span id="filhos-label" class="property-label"><g:message code="tipoGasto.filhos.label" default="Filhos" /></span>
					
						<g:each in="${tipoGastoInstance.filhos}" var="f">
						<span class="property-value" aria-labelledby="filhos-label"><g:link controller="tipoGasto" action="show" id="${f.id}">${f?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
				<g:if test="${tipoGastoInstance?.gastos}">
				<li class="fieldcontain">
					<span id="gastos-label" class="property-label"><g:message code="tipoGasto.gastos.label" default="Gastos" /></span>
					
						<g:each in="${tipoGastoInstance.gastos}" var="g">
						<span class="property-value" aria-labelledby="gastos-label"><g:link controller="gasto" action="show" id="${g.id}">${g?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${tipoGastoInstance?.id}" />
					<g:link class="edit" action="edit" id="${tipoGastoInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
