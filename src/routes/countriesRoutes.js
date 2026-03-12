import { Router } from 'express';
import { countries } from '../api/v1/countries.js';
import { errorResponse } from '../utils/handlers.js';
import { formatResponse } from '../utils/handlers.js';
import z from 'zod';
import { isFilled } from '../utils/functions.js';
const routes = Router();

const stripGov = (country) => {
    const { government, ...rest } = country;
    return rest;
};

// GET /countries
routes.get('/', (req, res) => {
    const querySchema = z.object({
        name: z.string().optional(),
        capital: z.string().optional(),
        region: z.string().optional(),
        language: z.string().optional(),
        currency: z.string().optional(),
        government: z.string().optional(),
        fields: z.string().optional(),
        govType: z.string().optional(),
    });

    const resultParse = querySchema.safeParse(req.query);

    if (!resultParse.success) {
        return errorResponse(res, 400, 'Invalid query parameters');
    }

    const {
        name,
        capital,
        region,
        language,
        currency,
        government,
        fields,
        govType,
    } = resultParse.data;

    if (!isFilled(Object.values(resultParse.data))) {
        console.log('jalan, without gov');
        return res.json(formatResponse(req, countries.map(stripGov)));
    }

    const { government: withoutGov, ...queryWithoutGov } = resultParse.data;

    if (government === 'true' && !isFilled(Object.values(queryWithoutGov))) {
        console.log('jalan dengan gov');
        return res.json(formatResponse(req, countries));
    }

    let result = [...countries];

    if (name) {
        result = result.filter((c) =>
            c.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (capital) {
        result = result.filter((c) =>
            c.capital?.toLowerCase().includes(capital.toLowerCase())
        );
    }

    if (region) {
        result = result.filter((c) =>
            c.region?.toLowerCase().includes(region.toLowerCase())
        );
    }

    if (language) {
        result = result.filter((c) =>
            c.language?.toLowerCase().includes(language.toLowerCase())
        );
    }

    if (currency) {
        result = result.filter((c) =>
            c.currency?.toLowerCase().includes(currency.toLowerCase())
        );
    }

    if (govType) {
        result = result.filter((c) =>
            c.government?.type?.toLowerCase().includes(govType.toLowerCase())
        );
    }

    if (fields) {
        const pick = fields.split(',').map((item) => item.trim());
        result = result.map((i) =>
            pick.reduce((obj, key) => {
                if (i[key] !== undefined) obj[key] = i[key];
                return obj;
            }, {})
        );
    }

    if (result.length === 0) {
        errorResponse(res, 400, 'Country may not found');
    }

    const withGov = name || govType;
    res.set('Cache-Control', 'public, max-age=604800');
    return res.json(
        formatResponse(req, withGov ? result : result.map(stripGov))
    );
});

// GET /countries/:code
routes.get('/:code', (req, res) => {
    const iso = req.params.code;
    const country = countries.find((c) => c.iso2 === iso.toUpperCase());
    if (!country) {
        errorResponse(res, 400, 'Country may not found');
    }
    res.set('Cache-Control', 'public, max-age=604800');
    return res.json(formatResponse(req, [country]));
});

export { routes as countriesRoutes };
