import { setGlobalOptions } from "firebase-functions";
import { onCall } from "firebase-functions/v2/https";

setGlobalOptions({ maxInstances: 10 });

export const testarFunction = onCall(async () => {

  return {
    sucesso: true,
    mensagem: "Cloud Function funcionando!"
  };

});