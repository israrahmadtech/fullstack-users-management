import cors from "cors";

const FRONTEND_URL = process.env.FRONTEND_URL;

export default function enableCors(app) {
    app.use(cors({
        origin: FRONTEND_URL,
        credentials: true
    }));
}
