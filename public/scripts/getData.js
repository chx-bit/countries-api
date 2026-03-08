const output = document.getElementById("output");
const code = document.createElement("code");
const btn = document.getElementById("run");
const getCountry = async () => {
    try {
        const req = await fetch("http://localhost:3000/v1/countries/ID");
        const res = await req.json();
        code.innerHTML = JSON.stringify(res, null, 2);;
        output.append(code);
    } catch (err) {
        console.error("Error:", err);
    }
};

btn.addEventListener('click', () => {
  getCountry()
})
