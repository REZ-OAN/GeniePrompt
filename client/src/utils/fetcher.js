import axios from "axios";

export default async function Fetcher(generated, link) {
    const result = {
        error: "",
        data: "",
    };
    try {
        const { data } = await axios.post(link, {
            text: generated,
        });
        result["error"] = "";
        result["data"] = data;
    } catch (err) {
        result["error"] = err.message;
        result["data"] = "";
    }
    return result;
}
