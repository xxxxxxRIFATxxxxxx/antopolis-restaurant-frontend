"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Component for managing and displaying food items
export default function Foods() {
    // Food and category data state
    const [foodList, setFoodList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(true);

    // Modal and form control state
    const [showFoodForm, setShowFoodForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [isSubmittingFood, setIsSubmittingFood] = useState(false);
    const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

    // New food form data
    const [newFoodData, setNewFoodData] = useState({
        name: "",
        category: "",
        price: "",
        imageFile: null,
    });

    // New category name input
    const [newCategoryName, setNewCategoryName] = useState("");

    // Fetch food and category data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [foodsRes, categoriesRes] = await Promise.all([
                    axios.get(`${process.env.API_URL}/foods`),
                    axios.get(`${process.env.API_URL}/categories`),
                ]);
                setFoodList(foodsRes.data);
                setCategoryList(categoriesRes.data);
            } catch {
                toast.error("Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filtered food list by category
    const visibleFoods =
        selectedCategory === "All"
            ? foodList
            : foodList.filter((food) => food.category === selectedCategory);

    // Handle changes in food form inputs
    const handleFoodInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "imageFile" && files?.length > 0) {
            setNewFoodData((prev) => ({ ...prev, imageFile: files[0] }));
        } else {
            setNewFoodData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Submit new food to the server
    const handleFoodSubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingFood(true);

        const formData = new FormData();
        formData.append("name", newFoodData.name);
        formData.append("category", newFoodData.category);
        formData.append("price", newFoodData.price);
        if (newFoodData.imageFile) {
            formData.append("image", newFoodData.imageFile);
        }

        try {
            await axios.post(`${process.env.API_URL}/foods`, formData);
            toast.success("Food added successfully");
            setShowFoodForm(false);
            setNewFoodData({
                name: "",
                category: "",
                price: "",
                imageFile: null,
            });
            const updatedFoods = await axios.get(
                `${process.env.API_URL}/foods`
            );
            setFoodList(updatedFoods.data);
        } catch {
            toast.error("Failed to add food");
        } finally {
            setIsSubmittingFood(false);
        }
    };

    // Submit new category to the server
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingCategory(true);

        try {
            await axios.post(`${process.env.API_URL}/categories`, {
                name: newCategoryName,
            });
            toast.success("Category added successfully");
            setShowCategoryForm(false);
            setNewCategoryName("");
            const updatedCategories = await axios.get(
                `${process.env.API_URL}/categories`
            );
            setCategoryList(updatedCategories.data);
        } catch {
            toast.error("Failed to add category");
        } finally {
            setIsSubmittingCategory(false);
        }
    };

    return (
        <section className="py-10">
            <Toaster position="top-right" />
            <div className="px-4 sm:px-10 lg:px-40 mx-auto">
                {/* Section heading */}
                <h2 className="text-4xl font-bold text-center mb-2">
                    Our Best Seller Dishes
                </h2>
                <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
                    Our fresh garden salad is a light and refreshing option. It
                    features a mix of crisp lettuce, juicy tomatoes all tossed
                    in your choice of dressing.
                </p>

                {/* Filter and action buttons */}
                <div className="mb-6 flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex flex-wrap gap-3 justify-start px-4">
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className={`px-6 py-2 rounded-full text-sm font-medium border shadow ${
                                selectedCategory === "All"
                                    ? "bg-black text-white"
                                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            All
                        </button>
                        {categoryList.map((cat) => (
                            <button
                                key={cat._id || cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-6 py-2 rounded-full text-sm font-medium border shadow ${
                                    selectedCategory === cat.name
                                        ? "bg-black text-white"
                                        : "bg-white text-black border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-4 px-4 lg:px-0">
                        <button
                            onClick={() => setShowFoodForm(true)}
                            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800"
                        >
                            Add Food
                        </button>
                        <button
                            onClick={() => setShowCategoryForm(true)}
                            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800"
                        >
                            Add Category
                        </button>
                    </div>
                </div>

                {/* Food display grid or loader */}
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <span className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-800" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                        {visibleFoods.map((dish) => (
                            <div
                                key={dish._id}
                                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                {/* Image Section */}
                                <div className="relative w-full h-56 bg-gray-50">
                                    {dish.image ? (
                                        <Image
                                            src={`data:image/png;base64,${dish.image}`}
                                            alt={dish.name}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                                            {dish.name}
                                        </h3>
                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full capitalize">
                                            {dish.category}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-yellow-400 text-sm">
                                            {"★".repeat(5)}
                                        </div>
                                        <div className="text-lg font-bold text-gray-700">
                                            ${dish.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Food Modal */}
            {showFoodForm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#3d3d3d] text-white rounded-2xl p-6 w-full max-w-sm shadow-lg border border-gray-700">
                        <h3 className="text-2xl font-semibold text-center mb-6">
                            Add Food
                        </h3>
                        <form onSubmit={handleFoodSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Food Name"
                                value={newFoodData.name}
                                onChange={handleFoodInputChange}
                                required
                                className="w-full px-4 py-3 rounded-full bg-[#555] text-white placeholder-gray-300 focus:ring-2 ring-red-500"
                            />
                            <select
                                name="category"
                                value={newFoodData.category}
                                onChange={handleFoodInputChange}
                                required
                                className="w-full px-4 py-3 rounded-full bg-[#555] text-white"
                            >
                                <option value="">Select Category</option>
                                {categoryList.map((cat) => (
                                    <option
                                        key={cat._id || cat.name}
                                        value={cat.name}
                                    >
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={newFoodData.price}
                                onChange={handleFoodInputChange}
                                required
                                className="w-full px-4 py-3 rounded-full bg-[#555] text-white"
                            />
                            <label
                                htmlFor="imageFile"
                                className={`block text-center cursor-pointer px-4 py-6 border-2 rounded-full transition ${
                                    newFoodData.imageFile
                                        ? "border-green-500 text-green-400"
                                        : "border-red-500 text-red-400"
                                }`}
                            >
                                {newFoodData.imageFile
                                    ? newFoodData.imageFile.name
                                    : "Upload or Drag image here"}
                                <input
                                    type="file"
                                    id="imageFile"
                                    name="imageFile"
                                    accept="image/*"
                                    onChange={handleFoodInputChange}
                                    className="hidden"
                                />
                            </label>
                            <div className="flex justify-between gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowFoodForm(false)}
                                    className="flex-1 py-3 border border-gray-400 rounded-full"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingFood}
                                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold"
                                >
                                    {isSubmittingFood ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Modal */}
            {showCategoryForm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#3d3d3d] text-white rounded-2xl p-6 w-full max-w-sm shadow-lg border border-gray-700">
                        <h3 className="text-2xl font-semibold text-center mb-6">
                            Add Category
                        </h3>
                        <form
                            onSubmit={handleCategorySubmit}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={newCategoryName}
                                onChange={(e) =>
                                    setNewCategoryName(e.target.value)
                                }
                                required
                                className="w-full px-4 py-3 rounded-full bg-[#555] text-white"
                            />
                            <div className="flex justify-between gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCategoryForm(false)}
                                    className="flex-1 py-3 border border-gray-400 rounded-full"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingCategory}
                                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold"
                                >
                                    {isSubmittingCategory
                                        ? "Saving..."
                                        : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
