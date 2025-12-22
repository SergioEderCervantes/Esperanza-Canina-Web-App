import { perritosTopRetrieve } from "@/api";
import LandingPage from "@/components/layout/LandingPage";

export const dynamic = "force-dynamic";
// Esta sera la landing page
//CTA a donaciones y voluntariado, perritos en adopcion

export default async function Home() {
  const res = await perritosTopRetrieve();

  return (
    <LandingPage featuredDogs = {res.data?.data} />
  );
}
