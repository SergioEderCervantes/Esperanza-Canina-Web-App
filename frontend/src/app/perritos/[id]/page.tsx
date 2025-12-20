import { Metadata } from "next";
import { perritosRetrieve } from "@/api/sdk.gen";
import { DetailedDog } from "@/api/types.gen";
import { notFound } from "next/navigation";
import ProfileDog from "@/components/layout/ProfileDog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const dogId = Number(id);

  if (isNaN(dogId)) return {};

  try {
    const res = await perritosRetrieve({ path: { id: dogId } });

    if (res.error || !res.data?.data) return {};

    const dog: DetailedDog = res.data.data;
    const imageUrl =
      dog.images?.[0]?.url ||
      "https://res.cloudinary.com/dzumkrwxr/image/upload/v123/default_dog.png";
    const description =
      dog.description ||
      `Conoce a ${dog.name}, un perrito en busca de un hogar lleno de amor.`;

    return {
      title: `Adopta a ${dog.name} - Esperanza Canina`,
      description,
      openGraph: {
        title: `Adopta a ${dog.name} - Esperanza Canina`,
        description,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: `Foto de ${dog.name}`,
          },
        ],
        url: `http://localhost:3000/perritos/${dog.id}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Adopta a ${dog.name} - Esperanza Canina`,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error(`Error generando metadata para el perro ${dogId}:`, error);
    return {};
  }
}

export default async function DogProfilePage({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const { id } = await params;
  const dogId = Number(id);


  if (isNaN(dogId)) notFound();

  const res = await perritosRetrieve({ path: { id: dogId } });


  if (res.error || !res.data?.data) notFound();

  const dog: DetailedDog = res.data.data;

  return <ProfileDog dog={dog} />;
}
