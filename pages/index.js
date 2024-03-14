import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewAnimals from "@/components/NewAnimals";
import { mongooseConnect } from "@/lib/mongoose";
import { Podopieczny } from "@/models/Podopieczny";

export default function HomePage({featuredpodopieczny, newAnimals}) {
  return (
<div>
  <Header />
  <Featured podopieczny={featuredpodopieczny} />
  <NewAnimals podopieczni={newAnimals} />
</div>
  );
}


export async function getServerSideProps() {
  const featuredPodId = '65d270d379062506427ede7c';
  await mongooseConnect();
  const featuredpodopieczny = await Podopieczny.findById(featuredPodId);
  //poniżej następuje sortowanie podopiecznych, którzy zostali ostatnio dodani do bazy, jako pierwszy pojawiać się będzie najpóźniej dodany (dlatego -1), max.10 podopiecnzych będzie wyświetlonych
  const newAnimals = await Podopieczny.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredpodopieczny: JSON.parse(JSON.stringify(featuredpodopieczny)),
      newAnimals: JSON.parse(JSON.stringify(newAnimals)),
    },
  };
}