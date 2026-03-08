import { countries } from "../api/v1/countries.js";
export const errorResponse = (res, status, message) => {
    return res.status(status).json({ error: message });
};

export const formatResponse = (req, data) => ({
    logs: {
        success: 200,
        message: "OK",
        timestamp: new Date().toISOString(),
        total: countries.length,
        count: data.length,
        version: "v1.0.0",
        endpoint: req.originalUrl,
        method: req.method,
        docs: "https://github.com/chx-bit/countries-api",
        author: "chxbit",
        response_time: Date.now() - req._startTime + "ms"
    },
    data
});
