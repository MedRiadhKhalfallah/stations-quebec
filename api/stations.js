import zlib from "zlib";

export default async function handler(req, res) {
    try {
        const response = await fetch(
            "https://regieessencequebec.ca/stations.geojson.gz"
        );

        const buffer = Buffer.from(await response.arrayBuffer());

        const json = JSON.parse(
            zlib.gunzipSync(buffer).toString("utf-8")
        );

        res.status(200).json(json);

    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch stations",
            details: error.message,
        });
    }
}