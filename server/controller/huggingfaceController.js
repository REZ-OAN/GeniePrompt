import dotenv from "dotenv";
import { Pipeline } from "@xenova/transformers";
dotenv.config();

export const summaryController = async (req, res) => {
    try {
        const { text } = req.body;

        const generator = await new Pipeline(
            "summarization",
            "Xenova/distilbart-cnn-6-6"
        );
        const response = await fetch(
            "https://api-inference.huggingface.co/models/slauw87/bart_summarisation",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                },
                method: "POST",
                body: `${text}`,
            }
        );
        const result = await response.json();
        if (result) {
            return res.status(200).json(result[0]["summary_text"]);
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
export const promptController = async (req, res) => {
    try {
        const { text } = req.body;
        const generator = await new Pipeline(
            "text2text-generation",
            "merve/chatgpt-prompts-bart"
        );
        const response = await fetch(
            "https://api-inference.huggingface.co/models/merve/chatgpt-prompts-bart",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                },
                method: "POST",
                body: `${text}`,
            }
        );
        const result = await response.json();

        if (result) {
            return res
                .status(200)
                .json(
                    `Include The Generated Prompt to your wants \n "${result[0]["generated_text"]}"`
                );
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
