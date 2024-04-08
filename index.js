import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import { OpenAI } from "openai";
import nutrihealthRoute from "./routes/nutrihealth.route.js";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors()); //Importante: Es un middleware que activa la propiedad req.headers.origin
app.use(express.json()); //Importante: Es un middleware que activa la propiedad req.body

// Ruta para conectarse al asistente personalizado en GPT
app.post("/api/v1/asistente-gpt", async (req, res) => {
  const ASSISTANT_ID = "asst_v835cpYFCcnQx14zdrhPMkON";
  // Make sure your API key is set as an environment variable.
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    // Create a thread with a message.
    const thread = await client.beta.threads.create({
      messages: [
        {
          role: "user",
          // Update this with the query you want to use.
          content: "Recomiendame 10 recetas para adultos mayores con diabetes.",
          file_ids: [
            "file-xOmsHONImehX654NOylySVYW",
            "file-FQzUGSrWooZXFicKApJbvBa9",
            "file-4bZ9MHHK2eJtr37d1LT2sove",
            "file-BjWn1UQoXlC9pFhjh5Bd0WRj",
          ],
        },
      ],
    });

    // Submit the thread to the assistant (as a new run).
    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    });

    // Print the ID of the created run.
    console.log(`👉 Run Created: ${run.id}`);

    // Wait for run to complete.
    let runStatus = run.status;
    var data = [];
    while (runStatus !== "completed") {
      const retrievedRun = await client.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      console.log(`🏃 Run Status: ${retrievedRun.status}`);
      runStatus = retrievedRun.status;
      if (runStatus === "requires_action") {
        const structured_response = JSON.parse(
          retrievedRun.required_action.submit_tool_outputs.tool_calls[0]
            .function.arguments
        );
        data.push(structured_response);
        // break;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking status again
    }
    console.log(`🏁 Run Completed!`);

    return res.send(data);
    //Get the latest message from the thread.
    // const message_response = client.beta.threads.messages.list(thread.id);
    // const messages = (await message_response).data;

    // //Print the latest message.
    // const latest_message = messages[0];
    // console.log(`💬 Response: ${latest_message.content[0].text.value}`);
    // return res.send(latest_message.content[0].text.value);
  } catch (error) {
    console.error("Error al obtener la respuesta:", error);
    return res.send("Error al obtener la respuesta:", error);
  }
});

app.use("/api/v1", nutrihealthRoute);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
