import React from "react";
/* Landing Page Card Component*/

const WelcomeSection = () => {

    return (
        <>
            <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-lg group bg-linear-to-bl from-violet-500 to-fuchsia-500">
                <section className="px-6 py-10 text-center">
                    <h1 className="text-8xl">Welcome!</h1>
                    <p className="text-xl">Experience a day at work, take on challenges, and test your skills</p>
                </section>
            </div>
        </>
    );
};

export default WelcomeSection;