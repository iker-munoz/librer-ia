import { Ollama } from "ollama";

export const INFERENCE: Ollama = new Ollama({
    host: "localhost:8002"
})

type ModelTemplate = {
    model: string,
    from: string
}

export const inference_setup = async function() {
    const model_names: string[] = await list_models();
    const models_to_download: ModelTemplate[] = [
        { model: "librer-ia", from: "qwen3:1.7b" },
        // TODO add embedder template
    ]

    models_to_download.forEach(model_template => {
        if (model_names.includes(`${model_template.model}:latest`)) {
            console.log(`Model ${model_template.model} already downloaded, skipping...`);
            return;
        }
        console.log(`Model ${model_template.model} not found, downloading... This might take a minute`);
        create_model(model_template.model, model_template.from);
    })

    await load_model_on_memory("librer-ia")
    console.log("Inference setup completed!")
}

const list_models = async function(): Promise<string[]> {
    const model_names: string[] = await INFERENCE.list()
    .then(response => response.models.map(model => model.name))
    .catch((err) => {
        throw new Error(`Error connecting to the inference endpoint: ${err}`)
    })

    return model_names;
}

const create_model = async function(model: string, from: string) {
    await INFERENCE.create({ model, from })
    .catch((err) => {
        throw new Error(`Error connecting to the inference endpoint: ${err}`)
    })
    await cleanup_model(from);
    console.log(`Finished downloading model: ${model}`)
}

const cleanup_model = async function(model: string) {
    await INFERENCE.delete({ model })
    .catch((err) => {
        throw new Error(`Error connecting to the inference endpoint: ${err}`)
    })
}

const load_model_on_memory = async function(model: string) {
    await INFERENCE.chat({ model, keep_alive: -1 })
}
