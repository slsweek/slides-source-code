const { promisify } = require('util');
const azure = require('azure-sb');
const serviceBusService = azure.createServiceBusService("");

const createQueueIfNotExistsAsync = promisify(serviceBusService.createQueueIfNotExists);
const sendMessageAsync = promisify(serviceBusService.sendQueueMessage);

const FILA = 'fila';

async function criarFila() {
  try {
    await createQueueIfNotExistsAsync(FILA);
  } catch (error) {
    // Fila existe
  }
}

async function enviarMensagem(body) {
  return new Promise((resolve, reject) => {
    serviceBusService.sendQueueMessage(FILA, { body }, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

async function main() {
  await criarFila();
  const it = Array.from({length: 40});
  await Promise.all(it.map((el, ix) => {
    return enviarMensagem(`Mensagem ${ix} - ${(new Date()).getTime()}`);
  }));
}

main();
