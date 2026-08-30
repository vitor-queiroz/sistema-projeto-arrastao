import { setGlobalOptions } from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { Resend } from "resend";

setGlobalOptions({ maxInstances: 10 });

export const enviarCodigoConfirmacao = onCall(async (request) => {

  const { email, nome, codigo } = request.data;

  if (!email || !nome || !codigo) {
    throw new HttpsError(
      "invalid-argument",
      "E-mail, nome e código são obrigatórios."
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new HttpsError(
      "failed-precondition",
      "Chave da API do Resend não configurada."
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Código de confirmação de cadastro",
    html: `
      <h2>Confirmação de cadastro</h2>

      <p>Olá, ${nome}!</p>

      <p>Seu cadastro foi realizado com sucesso.</p>

      <p>Seu código de confirmação é:</p>

      <h1>${codigo}</h1>

      <p>
        Digite esse código no sistema para ativar seu acesso.
      </p>

      <p>
        Se você não realizou esse cadastro, ignore este e-mail.
      </p>
    `,
  });

  if (error) {
    console.error("Erro ao enviar e-mail:", error);

    throw new HttpsError(
      "internal",
      "Não foi possível enviar o e-mail."
    );
  }

  return {
    sucesso: true,
    mensagem: "E-mail enviado com sucesso."
  };
});