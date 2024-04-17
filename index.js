import "dotenv/config";
import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import nutrihealthRoute from "./routes/nutrihealth.route.js";
import { Vonage } from "@vonage/server-sdk";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors()); //Importante: Es un middleware que activa la propiedad req.headers.origin
app.use(express.json()); //Importante: Es un middleware que activa la propiedad req.body

// Ruta para conectarse al asistente personalizado en GPT
app.post("/api/v1/asistente-gpt", async (req, res) => {
  const { text } = req.body;
  const ASSISTANT_ID = "asst_v835cpYFCcnQx14zdrhPMkON";
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const thread = await client.beta.threads.create({
      messages: [
        {
          role: "user",
          content: `Necesito 10 recetas nutricionales para adultos mayores con ${text}. Los datos los necesito en español.`
        },
      ],
    });

    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    });

    console.log(`👉 Ejecución Creada: ${run.id}`);

    let runStatus = run.status;
    let recipes = [];

    while (runStatus !== "completed") {
      const retrievedRun = await client.beta.threads.runs.retrieve(thread.id, run.id);
      console.log(`🏃 Run Status: ${retrievedRun.status}`);
      runStatus = retrievedRun.status;
      
      if (runStatus === "completed") {
        const structured_response = JSON.parse(
          retrievedRun.required_action.submit_tool_outputs.tool_calls[0].function.arguments
        );
        recipes.push(structured_response);
      }
      else if (runStatus === "requires_action") {
        // Obtener el ID de la llamada a la herramienta
        // const toolCallId = retrievedRun.required_action.submit_tool_outputs.tool_calls[0].id;
        // console.log(toolCallId);
        // await client.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
        //   tool_outputs: [
        //     {
        //       tool_call_id: toolCallId,
        //       output: JSON.stringify({ success: "true" }),
        //     },
        //   ],
        // });
        const structured_response = JSON.parse(
          retrievedRun.required_action.submit_tool_outputs.tool_calls[0].function.arguments
        );
        recipes.push(structured_response);
        break;
      } else if (runStatus === "failed") {
        return res.status(500).json({
          "code": 500,
          "message": retrievedRun.last_error
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo antes de verificar el estado nuevamente
      }
    }

    console.log(`🏁 Ejecución Completada!`);
    return res.json(recipes);

  } catch (error) {
    console.error("Error al obtener la respuesta:", error);
    return res.status(500).send("Error al obtener la respuesta.");
  }
});

app.post("/api/v1/send-message", async (req, res) => {
  const { password } = req.body;
  const from = "Nutrihealth"
  const to = "593991651232"
  const text = `Tu contraseña: ${password} `

  const vonage = new Vonage({
    apiKey: 'f17824d2',
    apiSecret: "k9zRWbbGkSUPTI4T"
  })

  try {
    await vonage.sms.send({ to, from, text })
      .then(resp => { 
        console.log('Message sent successfully'); 
        return res.json({ status: "success", messageText: resp.messages[0]["message-id"] });
      })
      .catch(err => { 
        console.log('There was an error sending the messages.'); 
        return res.json({ status: "error", messageText: err }); 
      });
  } catch (error) {
    console.log('Error: ' + error);
    return res.json({ status: "error", messageText: error });
  }
  // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  
  // try {
  //   const message = await client.messages.create({
  //     from: process.env.TWILIO_PHONE_NUMBER,
  //     to: '+593991651232',
  //     body: 'Hello World.',
  //   });
  //   console.log('Code Message: ' + message.accountSid);
  //   return res.json({ status: "success", messageSid: message.accountSid });
  // } catch (error) {
  //   console.log('Error al enviar el mensaje: ' + error);
  //   return res.status(500).json({ status: "error", message: "Error al enviar el mensaje." });
  // }
});

app.use("/api/v1", nutrihealthRoute);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
