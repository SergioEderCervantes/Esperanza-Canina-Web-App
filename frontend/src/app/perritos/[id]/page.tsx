
import { perritosRetrieve } from "@/api/sdk.gen";
import { DetailedDog } from "@/api/types.gen";
import { notFound } from "next/navigation";
import ProfileDog from "@/components/layout/ProfileDog";


export default async function DogProfilePage({
  params,
}: {
  params: { id: number };
}) {
  console.log("[DogProfilePage] Received params:", params);

  const dogId = params.id;
  console.log("[DogProfilePage] Parsed dogId:", dogId);

  //  const dog = dogsData.find((d) => d.slug === params.slug)

  if (isNaN(dogId)) {
    notFound();
  }

  const res = await perritosRetrieve({
    path: { id: dogId },
  });
  console.log("[DogProfilePage] API response:", res);

  if (res.error || res.data?.data === undefined) {
    {
      notFound();
    }
  }
  let dog: DetailedDog = res.data?.data!;

  return(
     <ProfileDog dog={dog} />
    );

 

  
}
