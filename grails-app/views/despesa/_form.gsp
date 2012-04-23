<%@ page import="livrocaixa.Despesa" %>



<div class="fieldcontain ${hasErrors(bean: despesaInstance, field: 'tipoDespesa', 'error')} required">
	<label for="tipoDespesa">
		<g:message code="despesa.tipoDespesa.label" default="Tipo Despesa" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="tipoDespesa" name="tipoDespesa.id" from="${livrocaixa.TipoDespesa.list()}" optionKey="id" required="" value="${despesaInstance?.tipoDespesa?.id}" class="many-to-one"/>
</div>

<div class="fieldcontain ${hasErrors(bean: despesaInstance, field: 'valor', 'error')} required">
	<label for="valor">
		<g:message code="despesa.valor.label" default="Valor" />
		<span class="required-indicator">*</span>
	</label>
	<g:field type="number" name="valor" step="0.01" required="" value="${fieldValue(bean: despesaInstance, field: 'valor')}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: despesaInstance, field: 'data', 'error')} required">
	<label for="data">
		<g:message code="despesa.data.label" default="Data" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="data" precision="day"  value="${despesaInstance?.data}"  />
</div>

