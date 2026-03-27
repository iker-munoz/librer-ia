import { Ollama } from "ollama";

export const INFERENCE: Ollama = new Ollama({
    host: "localhost:8002"
})
