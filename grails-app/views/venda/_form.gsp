<%@ page import="livrocaixa.Venda" %>



<div class="fieldcontain ${hasErrors(bean: vendaInstance, field: 'numeroNotaFiscal', 'error')} required">
	<label for="numeroNotaFiscal">
		<g:message code="venda.numeroNotaFiscal.label" default="Numero Nota Fiscal" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="numeroNotaFiscal" required="" value="${fieldValue(bean: vendaInstance, field: 'numeroNotaFiscal')}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: vendaInstance, field: 'status', 'error')} ">
	<label for="status">
		<g:message code="venda.status.label" default="Status" />
		
	</label>
	<g:select name="status" from="${vendaInstance.constraints.status.inList}" value="${vendaInstance?.status}" valueMessagePrefix="venda.status" noSelection="['': '']"/>
</div>

<div class="fieldcontain ${hasErrors(bean: vendaInstance, field: 'cliente', 'error')} required">
	<label for="cliente">
		<g:message code="venda.cliente.label" default="Cliente" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="cliente" name="cliente.id" from="${livrocaixa.Cliente.list()}" optionKey="id" required="" value="${vendaInstance?.cliente?.id}" class="many-to-one"/>
</div>

<div class="fieldcontain ${hasErrors(bean: vendaInstance, field: 'comissao', 'error')} required">
	<label for="comissao">
		<g:message code="venda.comissao.label" default="Comissao" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="comissao" required="" value="${fieldValue(bean: vendaInstance, field: 'comissao')}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: vendaInstance, field: 'data', 'error')} required">
	<label for="data">
		<g:message code="venda.data.label" default="Data" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="data" precision="day"  value="${vendaInstance?.data}"  />
</div>

<div class="fieldcontain ${hasErrors(bean: vendaInstance, field: 'itemVenda', 'error')} ">
	<label for="itemVenda">
		<g:message code="venda.itemVenda.label" default="Item Venda" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${vendaInstance?.itemVenda?}" var="i">
    <li><g:link controller="itemVenda" action="show" id="${i.id}">${i?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="itemVenda" action="create" params="['venda.id': vendaInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'itemVenda.label', default: 'ItemVenda')])}</g:link>
</li>
</ul>

</div>

<div class="fieldcontain ${hasErrors(bean: vendaInstance, field: 'outrosCustos', 'error')} required">
	<label for="outrosCustos">
		<g:message code="venda.outrosCustos.label" default="Outros Custos" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="outrosCustos" required="" value="${fieldValue(bean: vendaInstance, field: 'outrosCustos')}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: vendaInstance, field: 'valorPago', 'error')} required">
	<label for="valorPago">
		<g:message code="venda.valorPago.label" default="Valor Pago" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="valorPago" required="" value="${fieldValue(bean: vendaInstance, field: 'valorPago')}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: vendaInstance, field: 'vencimento', 'error')} required">
	<label for="vencimento">
		<g:message code="venda.vencimento.label" default="Vencimento" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="vencimento" precision="day"  value="${vendaInstance?.vencimento}"  />
</div>

<div class="fieldcontain ${hasErrors(bean: vendaInstance, field: 'vendedor', 'error')} required">
	<label for="vendedor">
		<g:message code="venda.vendedor.label" default="Vendedor" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="vendedor" name="vendedor.id" from="${livrocaixa.Vendedor.list()}" optionKey="id" required="" value="${vendaInstance?.vendedor?.id}" class="many-to-one"/>
</div>

