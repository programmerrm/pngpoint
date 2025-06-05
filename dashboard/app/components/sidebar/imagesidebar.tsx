import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReactIcons } from "~/lib/reactIcons";
import type { KeywordResponseType, MetaDataResponseType } from "~/types/metaDataResponseType";
import { Field } from "../field/field";
import { Link } from "react-router";
import { useImageUploadMutation } from "~/redux/features/imageupload/imageuploadApi";

export default function Imagesidebar(selectedMetadata: MetaDataResponseType) {
    /* State Menegment */
    const [keywords, setKeywords] = useState<string[]>(selectedMetadata?.selectedMetadata?.cloudflareImageKeywords?.map((k: KeywordResponseType) => k.name) || []);
    const [showKeywordInput, setShowKeywordInput] = useState(false);
    const [newKeyword, setNewKeyword] = useState("");
    const { handleSubmit, register, reset, setValue, formState: { errors }, } = useForm<any>();
    const { RiDeleteBin6Line } = ReactIcons;

    const [updatedImage] = useImageUploadMutation();

    /* Add New Keyword */
    const addKeyword = () => {
        const trimmed = newKeyword.trim();
        if (trimmed && !keywords.includes(trimmed)) {
            const updated = [...keywords, trimmed];
            setKeywords(updated);
            setValue("keywords", updated);
        }
        setNewKeyword("");
        setShowKeywordInput(false);
    };

    /* Remove Keyword */
    const removeKeyword = (kw: string) => {
        const updated = keywords.filter(k => k !== kw);
        setKeywords(updated);
        setValue("keywords", updated);
    };

    useEffect(() => {
        reset({
            title: selectedMetadata?.selectedMetadata?.title || '',
            description: selectedMetadata?.selectedMetadata?.description || '',
            status: selectedMetadata?.selectedMetadata?.status || '',
            category: selectedMetadata?.selectedMetadata?.category || '',
            keywords: selectedMetadata?.selectedMetadata?.cloudflareImageKeywords?.map((k: KeywordResponseType) => k.name) || [],
        });

        setKeywords(
            selectedMetadata?.selectedMetadata?.cloudflareImageKeywords?.map((k: KeywordResponseType) => k.name) || []
        );
    }, [selectedMetadata, reset]);

    /* Image Status */
    const getStatusOptions = (currentStatus: string) => {
        const allStatuses = ["approved", "pending", "rejected"];
        return allStatuses.filter(status => status !== currentStatus);
    };

    const imageId = selectedMetadata?.selectedMetadata?.id;

    const onSubmitForm = async (formData: any) => {
        try {
            const payload = {
                ...formData,
                keywords: keywords,
            };

            await updatedImage({ id: imageId, data: payload }).unwrap();
            alert("Image metadata updated successfully!");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update image.");
        }
    };

    return (
        <div className="block w-full h-full px-2.5 py-2.5 border rounded-md overflow-scroll scrollbar-width">
            <div className="flex flex-col flex-wrap gap-y-2.5 w-full">
                <div className="flex flex-row flex-wrap items-center justify-between py-2.5 px-2.5 rounded bg-gray-300 w-full mt-5.5">
                    <p>1 image selected</p>
                    <button className="cursor-pointer" type="button">
                        <RiDeleteBin6Line className="text-2xl" />
                    </button>
                </div>
                <div className="flex flex-col w-full">
                    <img className="block w-full h-auto rounded" src={selectedMetadata?.selectedMetadata?.url} alt={selectedMetadata?.selectedMetadata?.title} />
                </div>
                <form className="flex flex-col gap-y-3.5 w-full" onSubmit={handleSubmit(onSubmitForm)}>
                    <Field label="Title" error={errors.title}>
                        <input
                            className="border py-2.5 px-2.5 rounded w-full"
                            {...register("title")}
                            type="text"
                            id="title"
                        />
                    </Field>
                    <Field label="Description" error={errors.description}>
                        <textarea
                            className="border py-2.5 px-2.5 rounded w-full"
                            {...register("description")}
                            id="description"
                        />
                    </Field>
                    <Field label="Keywords" error={errors.keywords}>
                        <>
                            <div className="flex flex-wrap gap-2 border py-2.5 px-2.5 rounded">
                                {keywords.map((kw, idx) => (
                                    <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1">
                                        {kw}
                                        <button type="button" onClick={() => removeKeyword(kw)} className="text-red-500">×</button>
                                    </span>
                                ))}
                            </div>
                            {showKeywordInput && (
                                <input
                                    type="text"
                                    className="border py-2.5 px-2.5 rounded w-full mt-2"
                                    value={newKeyword}
                                    onChange={(e) => setNewKeyword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addKeyword();
                                        }
                                    }}
                                    autoFocus
                                />
                            )}
                            <div className="flex flex-col flex-wrap justify-center items-center">
                                <button
                                    type="button"
                                    className="text-blue-600 text-sm mt-2 cursor-pointer w-fit"
                                    onClick={() => setShowKeywordInput(true)}
                                >
                                    + Add keyword
                                </button>
                            </div>
                        </>
                    </Field>
                    <Field label="Category" error={errors.category}>
                        <select
                            className="border py-2.5 px-2.5 rounded w-full capitalize"
                            {...register("category")}
                            id="category"
                        >
                            <option value={selectedMetadata?.selectedMetadata?.category} defaultValue={selectedMetadata?.selectedMetadata?.category}>{selectedMetadata?.selectedMetadata?.category}</option>
                            <option value="animals">Animals</option>
                            <option value="buildings_and_architecture">Buildings and Architecture</option>
                            <option value="business">Business</option>
                            <option value="drinks">Drinks</option>
                            <option value="the_environment">The Environment</option>
                            <option value="states_of_mind">States of Mind</option>
                            <option value="food">Food</option>
                            <option value="graphic_resources">Graphic Resources</option>
                            <option value="hobbies_and_leisure">Hobbies and Leisure</option>
                            <option value="industry">Industry</option>
                            <option value="landscape">Landscape</option>
                            <option value="lifestyle">Lifestyle</option>
                            <option value="people">People</option>
                            <option value="plants_and_flowers">Plants and Flowers</option>
                            <option value="culture_and_religion">Culture and Religion</option>
                            <option value="science">Science</option>
                            <option value="social_issues">Social Issues</option>
                            <option value="sports">Sports</option>
                            <option value="technology">Technology</option>
                            <option value="transport">Transport</option>
                        </select>
                    </Field>
                    <Field label="Status" error={errors.status}>
                        <select
                            className="border py-2.5 px-2.5 rounded w-full capitalize"
                            {...register("status")}
                            id="status"
                        >
                            {selectedMetadata?.selectedMetadata?.status && (
                                <option value={selectedMetadata?.selectedMetadata?.status}>{selectedMetadata?.selectedMetadata?.status}</option>
                            )}
                            {getStatusOptions(selectedMetadata?.selectedMetadata?.status).map((status: string) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <div className="flex flex-col flex-wrap gap-2.5">
                        <h4 className="text-base font-medium">Contributor</h4>
                        <div className="flex flex-col flex-wrap gap-y-1.5">
                            {selectedMetadata?.selectedMetadata?.user?.username && (
                                <span>Username : {selectedMetadata?.selectedMetadata?.user?.username}</span>
                            )}
                            {selectedMetadata?.selectedMetadata?.user?.first_name && (
                                <span>First Name : {selectedMetadata?.selectedMetadata?.user?.first_name}</span>
                            )}
                            {selectedMetadata?.selectedMetadata?.user?.last_name && (
                                <span>Last Name : {selectedMetadata?.selectedMetadata?.user?.last_name}</span>
                            )}
                            {selectedMetadata?.selectedMetadata?.user?.email && (
                                <Link className="w-fit" to={`mailto:${selectedMetadata?.selectedMetadata?.user?.email}`}>Email : {selectedMetadata?.selectedMetadata?.user?.email}</Link>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <button
                            className="bg-blue-500 text-white py-2.5 px-2.5 rounded-full cursor-pointer"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
