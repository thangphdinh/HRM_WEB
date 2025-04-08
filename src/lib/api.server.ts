import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = "http://localhost:5003/api";

export async function getFromApi(path: string) {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("accessToken")?.value;

    if (!accessToken) return null;

    try {
        const response = await axios.get(`${API_BASE_URL}${path}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API call failed:", error);
        return null;
    }
}
