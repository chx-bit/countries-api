const BASE = "https://vzeroapi.vercel.app";

const ENDPOINTS = {
    countries: [
        { path: "/v1/countries", desc: "Fetch all countries", gov: false },
        {
            path: "/v1/countries?government=true",
            desc: "All countries + government data",
            gov: true
        },
        {
            path: "/v1/countries?name=Indonesia",
            desc: "Filter by name",
            gov: true
        },
        {
            path: "/v1/countries?capital=Jakarta",
            desc: "Filter by capital",
            gov: false
        },
        {
            path: "/v1/countries?region=Asia",
            desc: "Filter by region",
            gov: false
        },
        {
            path: "/v1/countries?language=Spanish",
            desc: "Filter by language",
            gov: false
        },
        {
            path: "/v1/countries?currency=IDR",
            desc: "Filter by currency",
            gov: false
        },
        {
            path: "/v1/countries?govType=republic",
            desc: "Filter by government type",
            gov: true
        },
        { path: "/v1/countries/ID", desc: "Fetch by ISO2 code", gov: true }
    ],
    download: [
        {
            path: "/v1/download?url=https://www.tiktok.com/@tiktok/video/123&type=tiktok",
            desc: "Download TikTok video",
            gov: false
        }
    ]
};

// cursor
(function initCursor() {
    const dot = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");

    document.addEventListener("mousemove", e => {
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
        ring.style.left = e.clientX + "px";
        ring.style.top = e.clientY + "px";
    });

    document.querySelectorAll("a, button, .ep-row").forEach(el => {
        el.addEventListener("mouseenter", () => {
            dot.classList.add("hover");
            ring.classList.add("hover");
        });
        el.addEventListener("mouseleave", () => {
            dot.classList.remove("hover");
            ring.classList.remove("hover");
        });
    });
})();

// build endpoint tables per group
(function buildEndpoints() {
    Object.entries(ENDPOINTS).forEach(([group, eps]) => {
        const tbody = document.getElementById(`endpoint-list-${group}`);
        eps.forEach(ep => {
            const tr = document.createElement("tr");
            tr.className = "ep-row";
            tr.innerHTML = `
                <td><span class="badge-get">GET</span></td>
                <td class="ep-path">${ep.path}</td>
                <td class="ep-desc">${ep.desc}</td>
                <td class="ep-gov ${ep.gov ? "yes" : "no"}">${ep.gov ? "✓" : "—"}</td>
            `;
            tr.addEventListener("click", () => fillPlayground(ep.path));
            tbody.appendChild(tr);
        });
    });
    setTimeout(() => AOS.refreshHard(), 100);
})();

// toggle accordion group
function toggleGroup(id) {
    const body = document.getElementById(`group-${id}`);
    const chevron = document.getElementById(`chevron-${id}`);
    const isOpen = !body.classList.contains("hidden");

    body.classList.toggle("hidden", isOpen);
    chevron.classList.toggle("open", !isOpen);
}

function fillPlayground(path) {
    const url = new URL(BASE + path);
    const isDownloader = url.pathname.startsWith("/v1/download");

    if (isDownloader) {
        document.getElementById("api-mode").value = "downloader";
        toggleApiMode();
        document.getElementById("dl-url").value =
            url.searchParams.get("url") || "";
        document.getElementById("dl-type").value =
            url.searchParams.get("type") || "tiktok";
    } else {
        document.getElementById("api-mode").value = "countries";
        toggleApiMode();
        document.getElementById("iso-code").value = "";
        document.getElementById("filter-key").value = "";
        document.getElementById("filter-value").value = "";
        setValDisabled(false);

        const params = url.searchParams;
        const parts = url.pathname.split("/");
        const last = parts[parts.length - 1];

        if (last.length === 2 && last.toUpperCase() !== "V1") {
            document.getElementById("iso-code").value = last.toUpperCase();
        } else if (params.toString()) {
            const key = [...params.keys()][0];
            document.getElementById("filter-key").value = key;
            if (key === "government") {
                setValDisabled(true);
            } else {
                document.getElementById("filter-value").value = params.get(key);
            }
        }
    }

    updatePreview();
    document
        .getElementById("playground")
        .scrollIntoView({ behavior: "smooth" });
}

function toggleApiMode() {
    const mode = document.getElementById("api-mode").value;
    document
        .getElementById("countries-inputs")
        .classList.toggle("hidden", mode !== "countries");
    document
        .getElementById("downloader-inputs")
        .classList.toggle("hidden", mode !== "downloader");
    updatePreview();
}

function setValDisabled(on) {
    document.getElementById("filter-value").disabled = on;
    document.getElementById("val-wrap").style.opacity = on ? "0.35" : "1";
}

function onFilterChange() {
    const key = document.getElementById("filter-key").value;
    document.getElementById("filter-value").value = "";
    setValDisabled(key === "government");
    updatePreview();
}

function buildURL() {
    const mode = document.getElementById("api-mode").value;

    if (mode === "downloader") {
        const url = document.getElementById("dl-url").value.trim();
        const type = document.getElementById("dl-type").value;
        return url
            ? `${BASE}/v1/download?url=${encodeURIComponent(url)}&type=${type}`
            : `${BASE}/v1/download`;
    }

    const iso = document.getElementById("iso-code").value.trim();
    const key = document.getElementById("filter-key").value;
    const val = document.getElementById("filter-value").value.trim();

    if (iso) return `${BASE}/v1/countries/${iso}`;
    if (key === "government") return `${BASE}/v1/countries?government=true`;
    if (key && val)
        return `${BASE}/v1/countries?${key}=${encodeURIComponent(val)}`;
    return `${BASE}/v1/countries`;
}

function updatePreview() {
    document.getElementById("url-text").textContent = buildURL();
}

async function sendRequest() {
    setLoading(true);
    document.getElementById("res-wrap").classList.remove("hidden");
    const t = Date.now();
    const mode = document.getElementById("api-mode").value;
    const reqUrl = buildURL();

    try {
        const res = await fetch(reqUrl);
        const ms = Date.now() - t;

        if (mode === "downloader") {
            if (res.ok) {
                const blob = await res.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                const cd = res.headers.get("Content-Disposition");
                a.href = downloadUrl;
                a.download = cd?.includes("filename=")
                    ? cd.split("filename=")[1].replace(/"/g, "")
                    : "downloaded_media.mp4";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(downloadUrl);
                showResponse(res.status, ms, {
                    success: true,
                    message: "Download triggered via browser."
                });
            } else {
                const data = await res
                    .json()
                    .catch(() => ({ errors: "Download request failed" }));
                showError(data.errors || "Download request failed");
            }
        } else {
            const data = await res.json();
            showResponse(res.status, ms, data);
        }
    } catch (e) {
        showError(e.message);
    } finally {
        setLoading(false);
        document.getElementById("res-wrap").scrollIntoView();
    }
}

function setLoading(on) {
    document.getElementById("send-btn").disabled = on;
    document.getElementById("btn-spinner").classList.toggle("hidden", !on);
    document.getElementById("btn-label").textContent = on
        ? "Sending..."
        : "Send Request";
}

function showResponse(status, ms, data) {
    document.getElementById("res-wrap").classList.remove("hidden");
    const el = document.getElementById("res-status");
    el.textContent = `${status} ${status === 200 ? "OK" : "ERROR"}`;
    el.className = "res-status " + (status === 200 ? "ok" : "err");
    document.getElementById("res-time").textContent = `${ms}ms`;
    const count =
        data?.logs?.count ??
        (Array.isArray(data?.data) ? data.data.length : null);
    document.getElementById("res-count").textContent =
        count != null ? `${count} records` : "";
    document.getElementById("res-pre").innerHTML = syntaxHighlight(
        JSON.stringify(data, null, 2)
    );
}

function showError(msg) {
    document.getElementById("res-wrap").classList.remove("hidden");
    const el = document.getElementById("res-status");
    el.textContent = "ERROR";
    el.className = "res-status err";
    document.getElementById("res-time").textContent = "";
    document.getElementById("res-count").textContent = "";
    document.getElementById("res-pre").textContent = msg;
}

function syntaxHighlight(json) {
    return json.replace(
        /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        m => {
            let c = "jn";
            if (/^"/.test(m)) c = /:$/.test(m) ? "jk" : "js";
            else if (/true|false/.test(m)) c = "jb";
            else if (/null/.test(m)) c = "jnu";
            return `<span class="${c}">${m}</span>`;
        }
    );
}

function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = "copied!";
        setTimeout(() => {
            btn.textContent = orig;
        }, 1500);
    });
}

function copyResponse(btn) {
    navigator.clipboard
        .writeText(document.getElementById("res-pre").textContent)
        .then(() => {
            btn.textContent = "copied!";
            setTimeout(() => {
                btn.textContent = "copy";
            }, 1500);
        });
}

document.getElementById("api-mode").addEventListener("change", toggleApiMode);
document
    .getElementById("filter-key")
    .addEventListener("change", onFilterChange);
document
    .getElementById("filter-value")
    .addEventListener("input", updatePreview);
document.getElementById("dl-url").addEventListener("input", updatePreview);
document.getElementById("dl-type").addEventListener("change", updatePreview);
document.getElementById("iso-code").addEventListener("input", function () {
    this.value = this.value.toUpperCase();
    updatePreview();
});
document.getElementById("send-btn").addEventListener("click", sendRequest);
