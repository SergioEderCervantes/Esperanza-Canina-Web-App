import AboutUs from "@/components/sections/AboutUs";
import AdoptionProcess from "../sections/AdoptionProcess";
import AdoptRequirements from "@/components/sections/AdoptRequirements";
import { FeaturedDogs } from "../sections/FeaturedDogs";
import { FirstView } from "../sections/FirstView";

const LandingPage = ({featuredDogs}: { featuredDogs: any }) => {
    
    return <>
        <FirstView />
        <FeaturedDogs featuredDogs ={featuredDogs}/>
        <AdoptionProcess />
        <AboutUs />
        <AdoptRequirements />
    </>;
};

export default LandingPage;