import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [
            process.env.FRONTEND_URL,
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            undefined // <- esto permite Thunder Client
        ];

        if (process.argv[2] === "api") {
            whitelist.push(undefined) // para Postman o thunderclient
        }

        console.log("CORS origin:", origin)

        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
