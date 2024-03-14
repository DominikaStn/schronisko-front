import { mongooseConnect } from "@/lib/mongoose";
import { Podopieczny } from "@/models/Podopieczny";
import { Zgloszenie } from "@/models/Zgloszenie";

export default async function handler(req,res) {
    if (req.method !== 'POST') {
        res.status(405).json({message: 'Tylko żądania POST są dozwolone'});
        return;
    }
    const {name, email, streetAddress, postalCode, city, number, reportAnimals,
    } =req.body;
    await mongooseConnect();
    const podopieczniIds = reportAnimals;
    const uniqueIds = [...new Set(podopieczniIds)];
    const podopieczniInfos = await Podopieczny.find({_id:uniqueIds});

    let line_items = [];
    for (const podpopiecznyId of uniqueIds) {
        const podopiecznyInfo = podopieczniInfos.find(p => p._id.toString() === podpopiecznyId);
        const quantity = podopieczniIds.filter(id => id === podpopiecznyId)?.length || 0;

        if(quantity > 0 && podopiecznyInfo) {
            line_items.push({
                quantity,
                info_animal: {
                    animal_data: {nazwa: podopiecznyInfo.nazwa},
                    unit_amount: quantity,
                }
            });
        }
    }
    
    try {
        const zgloszenieDoc = await Zgloszenie.create({
            name,
            email,
            streetAddress,
            postalCode,
            city,
            number,
            reportAnimals: uniqueIds,
            line_items,
        });

        // Zwrócenie URL-a sukcesu bezpośrednio, bez tworzenia sesji, która była wcześniej wspomniana
        res.json({
            url: process.env.PUBLIC_URL + '/zgloszenia?success=1',
            zgloszenieId: zgloszenieDoc._id.toString(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Wystąpił błąd podczas zapisywania zgłoszenia.",
            error: error.message,
        });
    }
}