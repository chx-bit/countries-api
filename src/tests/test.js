import axios from "axios";
const apisiputzk = 'https://api.siputzx.my.id/api/ai/gemini?text=Explain+revolution+earth&cookie=false&promptSystem=Act+as+a+teacher'
async function axTest() {
    try {
        const data = await axios.get("https://countriesapi-v0.vercel.app/countries");
        console.log(data);
    } catch (err) {
        console.error("Error:", err);
    }
}

axTest();
