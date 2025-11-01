import AboutUs from "../sections/AboutUs";
import AdoptionProcess from "../sections/AdoptionProcess";
import AdoptRequirements from "../sections/adoptRequirements";
import { FeaturedDogs } from "../sections/FeaturedDogs";
import { FirstView } from "../sections/FirstView";

const LandingPage = () => {
    return <>
        <FirstView />
        <FeaturedDogs />
        <AdoptionProcess />
        <AboutUs />
        <AdoptRequirements />
    </>;
};

export default LandingPage;