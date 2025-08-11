"use client"; 
import CategoriesSkeleton from "@/components/skeletons/CategoriesSkeleton";
import NewsService from "@/services/NewsService";
import React from "react";

export default function PreferencePage() {
    const [categories, setCategories] = React.useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    let tempSelectedCategories:string[] = [];
    let selectedCategoriesRef = React.useRef<string[]>([]);

    // Load previously saved preferences from localStorage
    React.useEffect(() => {
        setLoading(true);
        Promise.all([NewsService.getCategories(), NewsService.getUserCategories()]).then(response => {
            setCategories(response[0]);
            setSelectedCategories(response[1]);
            selectedCategoriesRef.current = [...response[1]];
            setLoading(false);
        })
    }, []);

    const loadingTemp = () => {
        return (<div className="container py-5">
            <div className="w-100 mx-auto">
                <CategoriesSkeleton />
            </div>
        </div>);
    };

    const toggleCategory = async(category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category) // remove if exists
                : [...prev, category] // add if not exists
        );

        if(selectedCategoriesRef.current.includes(category)){
            selectedCategoriesRef.current = selectedCategoriesRef.current.filter(cat => cat != category);
        }else{
            selectedCategoriesRef.current.push(category);
        }

        await NewsService.setUserCategories(selectedCategoriesRef.current).catch(err => {
            console.error('Update preference error', err);
        })
    };

    return (
        <>
            <div className="container py-5">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <h2 className="mb-4">Select Your Preferred News Categories</h2>
                    <a className="btn btn-outline-primary" href="/" >X</a>
                </div>
                {loading ? (loadingTemp()) : (
                    <div className="d-flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`btn btn-sm rounded-pill ${selectedCategories.includes(category)
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() => toggleCategory(category)}
                                style={{ minWidth: '100px' }}
                            >
                                <span className="text-capitalize">{category}</span>
                            </button>
                        ))}
                    </div>
                )}

            </div>
        </>
    );
}
