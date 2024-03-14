import { mongooseConnect } from "@/lib/mongoose";
import { Podopieczny } from "@/models/Podopieczny";

export default async function handle(req, res) {
    await mongooseConnect();
    const ids = req.body.ids;
    res.json(await Podopieczny.find({_id:ids}));
}