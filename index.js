import "dotenv/config";
import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import nutrihealthRoute from "./routes/nutrihealth.route.js";
import { Vonage } from "@vonage/server-sdk";

const app = express();
const PORT = process.env.PORT ?? 5000;

const toolFunction = {
  "name": "obtener_recetas",
  "description": null,
  "parameters": {
    "type": "object",
    "properties": {
      "recipes": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "description": "Identificador único de la receta."
            },
            "title": {
              "type": "string",
              "description": "Nombre de la receta."
            },
            "calories": {
              "type": "integer",
              "description": "Cantidad de calorías de la receta."
            },
            "ingredients": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Lista de ingredientes de la receta."
            }
          },
          "required": [
            "id",
            "title",
            "calories",
            "ingredients"
          ]
        }
      }
    },
    "required": [
      "recipes"
    ]
  }
}

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
          content: `Genera una lista de 10 recetas nutricionales para adultos mayores, con las siguientes preferencias: ${text}, en formato JSON. La información debe estar en español.`
        },
      ]
    });

    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
      instructions: 'Retorna recetas nutricionales para adultos mayores (a través de la función API).',
      model: 'gpt-3.5-turbo-0125',  //gpt-4-1106-preview
      tools: [
        {
          type: "function",
          function: toolFunction
        }
      ]
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
        const structured_response = JSON.parse(
          retrievedRun.required_action.submit_tool_outputs.tool_calls[0].function.arguments
        );
        recipes.push(structured_response);
        break;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo antes de verificar el estado nuevamente
      }
    }
    console.log(`🏁 Ejecución Completada!`);
    console.log("Response: ", recipes[0]);
    return res.json(recipes);

  } catch (error) {
    console.error("Error al obtener la respuesta:", error);
    return res.json([]);
  }
});

app.post("/api/v1/send-message", async (req, res) => {
  const { password } = req.body;
  const from = "Nutrihealth"
  const to = "593991651232"
  const text = `Tu contraseña: ${password} `

  const vonage = new Vonage({
    apiKey: 'f17824d2',  //73596352
    apiSecret: "k9zRWbbGkSUPTI4T"  //2MkClJRKW5RsNNIn
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
});

app.use("/api/v1", nutrihealthRoute);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
