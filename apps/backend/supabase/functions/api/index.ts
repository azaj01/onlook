import { ApiRoutes, BASE_API_ROUTE } from "@onlook/models/constants/api.ts";
import { Hono } from 'jsr:@hono/hono';
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { aiRouteHandler } from "./ai/index.ts";
import { authenticateUser } from "./helpers/auth.ts";

const app = new Hono();

app.post(`${BASE_API_ROUTE}${ApiRoutes.AI}`, async (c) => {
    const auth = await authenticateUser(c);
    if (!auth.success) {
        return auth.response;
    }
    return await aiRouteHandler(await c.req.json());
});

Deno.serve(app.fetch);