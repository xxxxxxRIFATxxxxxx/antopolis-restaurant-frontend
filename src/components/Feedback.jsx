"use client";

// Import necessary hooks and components
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Array of customer feedback data
const customerTestimonials = [
    {
        id: 1,
        reviewerName: "Sadia Rahman",
        reviewerTitle: "Food Blogger",
        reviewText:
            "The flavors were rich and authentic. Loved the attention to detail in every dish. This place captures the true essence of comfort food done right.",
        avatar: "/assets/avatar1.png",
    },
    {
        id: 2,
        reviewerName: "Tanvir Hasan",
        reviewerTitle: "Interior Designer",
        reviewText:
            "From presentation to taste, everything was spot on. The environment was cozy, and the staff were welcoming. Perfect spot for a weekend treat.",
        avatar: "/assets/avatar2.jpeg",
    },
    {
        id: 3,
        reviewerName: "Farzana Karim",
        reviewerTitle: "Marketing Executive",
        reviewText:
            "A delightful experience! The ingredients were fresh, the service was fast, and the vibe was just what I needed after a long day. Highly recommended.",
        avatar: "/assets/avatar3.jpg",
    },
];

export default function FeedbackSection() {
    const [selectedReviewIndex, setSelectedReviewIndex] = useState(0);

    // Refs for animated sections
    const reviewTextRef = useRef(null);
    const reviewerImageRef = useRef(null);

    // Visibility detection for animations
    const isTextInView = useInView(reviewTextRef, { once: true });
    const isImageInView = useInView(reviewerImageRef, { once: true });

    // Currently selected testimonial
    const { reviewerName, reviewerTitle, reviewText, avatar } =
        customerTestimonials[selectedReviewIndex];

    return (
        <section className="mx-auto px-4 py-20 relative z-10 bg-white md:px-50">
            <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
                {/* --- Text Content --- */}
                <motion.div
                    ref={reviewTextRef}
                    initial={{ opacity: 0, x: -60 }}
                    animate={isTextInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 space-y-6"
                >
                    {/* Section heading */}
                    <h2 className="text-4xl font-bold text-center md:text-left">
                        Customer <span className="text-[#AD1519]">Voices</span>
                    </h2>

                    {/* Testimonial text */}
                    <p className="text-gray-600 text-base sm:text-lg text-center md:text-left">
                        {reviewText}
                    </p>

                    {/* Reviewer details and pagination dots */}
                    <div className="flex flex-row items-center justify-between">
                        {/* Reviewer identity */}
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <Image
                                    src={avatar}
                                    alt={reviewerName}
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-center md:text-left">
                                    {reviewerName}
                                </h4>
                                <p className="text-gray-500 text-sm text-center md:text-left">
                                    {reviewerTitle}
                                </p>
                            </div>
                        </div>

                        {/* Navigation dots */}
                        <div className="flex gap-2 justify-center md:justify-start pt-2">
                            {customerTestimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        setSelectedReviewIndex(index)
                                    }
                                    className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                                        selectedReviewIndex === index
                                            ? "w-3 bg-[#8B0000]"
                                            : "w-3 bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* --- Image Illustration --- */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                        {/* Static background vector */}
                        <Image
                            src="/assets/Vector.png"
                            alt="Vector background"
                            width={500}
                            height={500}
                            className="w-full h-auto"
                        />

                        {/* Animated foreground character */}
                        <motion.div
                            ref={reviewerImageRef}
                            initial={{ opacity: 0, x: 80 }}
                            animate={isImageInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="absolute bottom-0 left-0 right-0"
                        >
                            <Image
                                src="/assets/feedback_person.png"
                                alt="Customer Illustration"
                                width={500}
                                height={500}
                                className="w-full h-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
