import AboutUs from "../sections/AboutUs";
import AdoptionProcess from "../sections/AdoptionProcess";
import { FeaturedDogs } from "../sections/FeaturedDogs";
import { FirstView } from "../sections/FirstView";

const LandingPage = () => {
    return <>
        <FirstView />
        <FeaturedDogs />
        <AdoptionProcess />
        <AboutUs />
    </>;
};

export default LandingPage;