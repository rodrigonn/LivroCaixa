if (typeof jQuery !== 'undefined') {
	(function($) {
		$('#spinner').ajaxStart(function() {
			$(this).fadeIn();
		}).ajaxStop(function() {
			$(this).fadeOut();
		});
	})(jQuery);
}

function habilitaEditar(elemento, id_campo) {
	var valor = elemento.text()
	var campo = $("#widget_" + id_campo)
	campo.children("input:nth-child(1)").val(valor)
    elemento.html( campo.html() );
}

function desabilitaEditar(elemento) {
	var valor = elemento.val()
    elemento.html( valor );
}

function excluirAvoAjax(elemento, link) {
	window.alert("1");
	jQuery.ajax({
		type:'POST', 
		url:link,
		success:function(data,textStatus){
			window.alert("3");
			elemento.parent().parent().remove();
		},
		error:function(
			XMLHttpRequest,textStatus,errorThrown){}
		});
	return false;
}

function salvarAjax(elemento, link) {
	jQuery.ajax({
		type:'POST', 
		url:link,
		success:function(data,textStatus){
			elemento.parent().parent().children().each(function(){
					desabilitaEditar($(this));	
			})
		},
		error:function(
			XMLHttpRequest,textStatus,errorThrown){}
		});
	return false;
}