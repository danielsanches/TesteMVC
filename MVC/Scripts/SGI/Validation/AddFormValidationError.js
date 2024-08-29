function addValidationError(campo, mensagem)
{
    jQuery('.remover-erro-dinamico').remove();
    jQuery('<span class="field-validation-error remover-erro-dinamico"><span class="text-danger">' + mensagem + '</span></span>').insertAfter(campo);
}

function removeValidationError(campo, mensagem) {
    jQuery('.remover-erro-dinamico').remove();    
}