import { Router } from "express";
import countries from "../api/countries.js";
import { errorResponse } from "../utils/handlers.js";

const routes = Router();

const stripGov = country => {
    const { government, ...rest } = country;
    return rest;
};

// GET /countries
routes.get("/", (req, res) => {
    const { name, capital, region, language, currency, government, govType } =
        req.query;

    if (
        !name &&
        !capital &&
        !region &&
        !language &&
        !currency &&
        !government &&
        !govType
    ) {
        return res.json(countries.map(stripGov));
    }

    if (
        government === "true" &&
        !name &&
        !capital &&
        !region &&
        !language &&
        !currency &&
        !govType
    ) {
        return res.json(countries);
    }

    let result = [...countries];

    if (name) {
        result = result.filter(c =>
            c.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (capital) {
        result = result.filter(c =>
            c.capital?.toLowerCase().includes(capital.toLowerCase())
        );
    }

    if (region) {
        result = result.filter(c =>
            c.region?.toLowerCase().includes(region.toLowerCase())
        );
    }

    if (language) {
        result = result.filter(c =>
            c.languages?.some(l =>
                l.toLowerCase().includes(language.toLowerCase())
            )
        );
    }

    if (currency) {
        result = result.filter(c =>
            c.currencies?.some(cur =>
                cur.toLowerCase().includes(currency.toLowerCase())
            )
        );
    }

    if (govType) {
        result = result.filter(c =>
            c.government?.type?.toLowerCase().includes(govType.toLowerCase())
        );
    }

    if (result.length === 0) {
        errorResponse(res, 400, "Country may not found");
    }

    const withGov = name || govType;
    return res.json(withGov ? result : result.map(stripGov));
});

// GET /countries/:code
routes.get("/:code", (req, res) => {
    const country = countries.find(
        c => c.iso2.toLowerCase() === req.params.code.toLowerCase()
    );

    if (!country) {
        errorResponse(res, 400, "Country may not found");
    }

    return res.json(country);
});

// GET /ping
routes.get("/ping", (req, res) => {
    res.json({ status: "OK" });
});

export { routes as countriesRoutes };
