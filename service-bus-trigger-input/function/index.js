module.exports = async function(context, mensagem) {

  context.log({
    messageId: context.bindingData.messageId,
    invocationId: context.executionContext.invocationId,
    mensagem
  });

  context.done();
};
