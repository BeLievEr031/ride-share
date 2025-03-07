import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import imgSrc from "../../assets/car-image.jpg";

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white">
            <HeroSection />
        </div>
    );
}

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <motion.section
            className="flex flex-col items-center justify-center text-center relative w-full h-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Background image */}
            <div className="absolute top-0 left-0 w-full h-full">
                <img
                    src={imgSrc}
                    alt="Car image"
                    className="w-full h-screen object-cover opacity-70"
                />
            </div>

            {/* Content */}
            <div className="relative mt-[15%] flex flex-col items-center justify-center text-center">
                {/* Title with Animation */}
                <motion.h1
                    className="text-5xl md:text-6xl font-bold tracking-wide text-gray-900"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Empower Ride
                    <p className="text-blue-600 mt-2 relative inline-block mx-2">
                        Sharing
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1418 125"
                            className="absolute -bottom-2 left-0 w-full h-5 md:h-8 -rotate-6"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68Z" fill="rgb(59,130,246)"></path>
                        </motion.svg>
                    </p>
                </motion.h1>

                {/* Subtext with Animation */}
                <motion.p
                    className="text-lg text-black mt-4 max-w-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    Join us in creating a smarter and eco-friendly way to travel.
                </motion.p>

                {/* Buttons with Hover & Animation */}
                <motion.div
                    className="mt-6 flex space-x-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <motion.button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 hover:scale-105 transition transform"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/auth", { replace: true })}
                    >
                        Join us now
                    </motion.button>

                    <motion.button
                        className="border border-gray-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 hover:scale-105 transition transform"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Request a demo
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Home;
