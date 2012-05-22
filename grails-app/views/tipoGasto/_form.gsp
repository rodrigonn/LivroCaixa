<%@ page import="livrocaixa.TipoGasto" %>



<div class="fieldcontain ${hasErrors(bean: tipoGastoInstance, field: 'nome', 'error')} required">
	<label for="nome">
		<g:message code="tipoGasto.nome.label" default="Nome" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nome" required="" value="${tipoGastoInstance?.nome}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: tipoGastoInstance, field: 'pai', 'error')} ">
	<label for="pai">
		<g:message code="tipoGasto.pai.label" default="Pai" />
		
	</label>
	<g:select id="pai" name="pai.id" from="${livrocaixa.TipoGasto.list()}" optionKey="id" value="${tipoGastoInstance?.pai?.id}" class="many-to-one" noSelection="['null': '']"/>
</div>

<div class="fieldcontain ${hasErrors(bean: tipoGastoInstance, field: 'filhos', 'error')} ">
	<label for="filhos">
		<g:message code="tipoGasto.filhos.label" default="Filhos" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${tipoGastoInstance?.filhos?}" var="f">
    <li><g:link controller="tipoGasto" action="show" id="${f.id}">${f?.encodeAsHTML()}</g:link></li>
</g:each>
</ul>

</div>

<div class="fieldcontain ${hasErrors(bean: tipoGastoInstance, field: 'gastos', 'error')} ">
	<label for="gastos">
		<g:message code="tipoGasto.gastos.label" default="Gastos" />
		
	</label>
	
</div>

