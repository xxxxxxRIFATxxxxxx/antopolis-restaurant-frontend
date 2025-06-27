// Import section components
import Banner from "@/components/Banner";
import Feedback from "@/components/Feedback";
import Foods from "@/components/Foods";
import Footer from "@/components/Footer";
import Partner from "@/components/Partner";
import TeamMember from "@/components/TeamMember";

// Home page component
export default function Home() {
    return (
        <div className="overflow-x-hidden">
            {/* Hero section */}
            <Banner />

            {/* Display food items */}
            <Foods />

            {/* Customer feedback/testimonials */}
            <Feedback />

            {/* Meet the team */}
            <TeamMember />

            {/* Partner logos or affiliations */}
            <Partner />

            {/* Footer */}
            <Footer />
        </div>
    );
}
