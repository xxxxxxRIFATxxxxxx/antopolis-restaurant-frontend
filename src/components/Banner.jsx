"use client";

// Import core dependencies
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon, Search } from "lucide-react";
import axios from "axios";

// Static banner content
const bannerSlides = [
    {
        id: 1,
        image: "/assets/banner1.png",
        bgColor: "#880808",
        overlayColor: "#A52A2A",
    },
    {
        id: 2,
        image: "/assets/banner2.png",
        bgColor: "#0a4669",
        overlayColor: "#0a3659",
    },
    {
        id: 3,
        image: "/assets/banner3.png",
        bgColor: "#953553",
        overlayColor: "#a95c68",
    },
    {
        id: 4,
        image: "/assets/banner4.png",
        bgColor: "#006666",
        overlayColor: "#003333",
    },
];

export default function Banner() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(1);
    const previousSlideRef = useRef(activeSlideIndex);

    const [allDishes, setAllDishes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const isSlideMovingForward = activeSlideIndex > previousSlideRef.current;

    useEffect(() => {
        previousSlideRef.current = activeSlideIndex;
    }, [activeSlideIndex]);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/foods`
                );
                setAllDishes(response.data);
            } catch (error) {
                console.error("Failed to fetch dishes", error);
            }
        };

        fetchDishes();
    }, []);

    useEffect(() => {
        const filtered = allDishes.filter((dish) =>
            dish.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
    }, [searchQuery, allDishes]);

    const currentSlide = bannerSlides[activeSlideIndex - 1];

    return (
        <div
            className="h-screen overflow-hidden relative transition-colors duration-500"
            style={{ backgroundColor: currentSlide.bgColor }}
        >
            {/* Background blobs */}
            <div
                className="absolute top-0 left-0 w-[55vw] h-[50vw] rounded-full -translate-x-[30%] -translate-y-[30%] transition-colors duration-500"
                style={{ backgroundColor: currentSlide.overlayColor }}
            />
            <div
                className="absolute bottom-0 right-0 w-[45vw] h-[40vw] rounded-full translate-x-[50%] translate-y-[50%] transition-colors duration-500"
                style={{ backgroundColor: currentSlide.overlayColor }}
            />

            {/* Header section */}
            <div className="flex justify-between items-center px-6 pt-5 relative z-20 md:px-10">
                <div className="text-white font-bold text-4xl px-4 hidden md:block">
                    RESTAURANT
                </div>

                {/* Search field */}
                <div className="relative bg-white flex items-center rounded-full px-4 py-2 w-full md:w-[40%] z-30">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ml-2 w-full bg-transparent outline-none text-black placeholder-gray-500"
                    />

                    {/* Search result dropdown */}
                    {searchQuery &&
                        (searchResults.length > 0 ? (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg z-40 max-h-60 overflow-y-auto">
                                {searchResults.map((dish) => (
                                    <div
                                        key={dish._id}
                                        className="flex items-center gap-4 p-3 border-b hover:bg-gray-100 transition"
                                    >
                                        {dish.image ? (
                                            <Image
                                                src={`data:image/png;base64,${dish.image}`}
                                                alt={dish.name}
                                                width={48}
                                                height={48}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
                                                No Img
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium">
                                                {dish.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {dish.category} • ${dish.price}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg z-40 p-4 text-center text-gray-500">
                                No items found for &apos;{searchQuery}&apos;
                            </div>
                        ))}
                </div>
            </div>

            {/* Main content */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row justify-between items-center px-6 md:px-10 z-10 pt-28 md:pt-0">
                {/* Text section and thumbnails */}
                <div className="text-white w-full md:w-1/2">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        BREAKFAST
                    </h1>
                    <p className="text-base md:text-lg font-medium text-white/90 leading-relaxed mb-10 w-[95%] md:w-4/5">
                        Breakfast, often referred to as the &apos;most important
                        meal of the day&apos;, provides essential nutrients to
                        kick start our day. It includes a variety of foods like
                        fruits, cereals, dairy products, and proteins that
                        contribute to a balanced diet.
                    </p>

                    {/* Thumbnail selector */}
                    <div className="flex items-center gap-4">
                        {bannerSlides.map((slide) => (
                            <div
                                key={slide.id}
                                onClick={() => setActiveSlideIndex(slide.id)}
                                className={`cursor-pointer relative transition-all duration-300 ${
                                    activeSlideIndex === slide.id ? "pb-2" : ""
                                }`}
                            >
                                <Image
                                    src={slide.image}
                                    alt="Thumbnail"
                                    width={120}
                                    height={120}
                                    className="rounded-full"
                                />
                                {activeSlideIndex === slide.id && (
                                    <span className="block absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-white rounded-full" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image animation section */}
                <div className="relative mt-10 md:mt-0">
                    <motion.div
                        key={activeSlideIndex}
                        initial={{
                            x: isSlideMovingForward ? 1000 : -1000,
                            y: isSlideMovingForward ? -1000 : 1000,
                            rotate: isSlideMovingForward ? 360 : -360,
                            opacity: 0,
                        }}
                        animate={{
                            x: 0,
                            y: 0,
                            rotate: 0,
                            opacity: 1,
                        }}
                        exit={{
                            x: isSlideMovingForward ? -1000 : 1000,
                            y: isSlideMovingForward ? 1000 : -1000,
                            rotate: isSlideMovingForward ? -360 : 360,
                            opacity: 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            duration: 2,
                        }}
                    >
                        {/* Image for desktop */}
                        <div className="hidden md:block">
                            <Image
                                src={currentSlide.image}
                                alt="Slide image"
                                width={450}
                                height={400}
                                className="object-contain"
                            />
                        </div>

                        {/* Image for mobile */}
                        <div className="md:hidden">
                            <Image
                                src={currentSlide.image}
                                alt="Slide image"
                                width={250}
                                height={300}
                                className="object-contain"
                            />
                        </div>
                    </motion.div>

                    {/* Mobile navigation arrows */}
                    <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 md:hidden">
                        <button
                            onClick={() =>
                                setActiveSlideIndex(
                                    activeSlideIndex === 1
                                        ? bannerSlides.length
                                        : activeSlideIndex - 1
                                )
                            }
                            className="bg-white/30 hover:bg-white/60 text-white rounded-full p-2"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 md:hidden">
                        <button
                            onClick={() =>
                                setActiveSlideIndex(
                                    activeSlideIndex === bannerSlides.length
                                        ? 1
                                        : activeSlideIndex + 1
                                )
                            }
                            className="bg-white/30 hover:bg-white/60 text-white rounded-full p-2"
                        >
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
