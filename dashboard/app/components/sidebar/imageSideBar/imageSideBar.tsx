import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { Field } from "~/components/field/field";
import { ReactIcons } from "~/lib/reactIcons";
import { useNumberOfImageDeletMutation } from "~/redux/features/images/deletedApi";
import { useUpdatedImageMutation } from "~/redux/features/images/updatedApi";
import { clearSelectedMetadata, closeSidebar } from "~/redux/features/imageSidebar/imageSideBarSlice";
import type { ImageTypeRespose, KeywordResponseType } from "~/types/images/imageType";
import { MEDIA_URL } from "~/utils/api";

type KeywordType = { id: number | null; name: string };

export default function ImageSideBar({
    selectedMetadata,
    selectedCount,
    selectedIds,
    setLoading,
}: {
    selectedMetadata: ImageTypeRespose;
    selectedCount: number;
    selectedIds: number[];
    setLoading: (value: null | "update" | "delete") => void;
}) {
    /* State Menegment */
    const [keywords, setKeywords] = useState<KeywordType[]>(
        selectedMetadata?.keywords?.map((k: KeywordResponseType) => ({ id: k.id, name: k.name })) || []
    );
    const [showKeywordInput, setShowKeywordInput] = useState(false);
    const [newKeyword, setNewKeyword] = useState("");
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<any>();

    /* React Icons */
    const { RiDeleteBin6Line } = ReactIcons;

    /* Redux Menegment */
    const [updatedImage] = useUpdatedImageMutation();
    const [numberOfImageDelet] = useNumberOfImageDeletMutation();
    const dispatch = useDispatch();

    const addKeyword = () => {
        const trimmed = newKeyword.trim();
        if (!trimmed || keywords.find(k => k.name.toLowerCase() === trimmed.toLowerCase())) {
            setNewKeyword("");
            setShowKeywordInput(false);
            return;
        }
        const maxId = keywords.reduce((max, kw) => {
            return typeof kw.id === 'number' && kw.id > max ? kw.id : max;
        }, 0);
        const newId = maxId + 1;
        const updated = [...keywords, { id: newId, name: trimmed }];
        setKeywords(updated);
        setValue("keywords", updated);
        setNewKeyword("");
        setShowKeywordInput(false);
    }

    const removeKeyword = (kw: string) => {
        const updated = keywords.filter(k => k.name !== kw);
        setKeywords(updated);
        setValue("keywords", updated);
    }

    useEffect(() => {
        const defaultKeywords = selectedMetadata?.keywords?.map((k: KeywordResponseType) => ({
            id: k.id ?? null,
            name: k.name,
        })) || [];

        reset({
            title: selectedMetadata?.title || '',
            description: selectedMetadata?.description || '',
            status: selectedMetadata?.status || '',
            category: selectedMetadata?.category || '',
            keywords: defaultKeywords,
        });

        setKeywords(defaultKeywords);
    }, [selectedMetadata, reset]);

    const getStatusOptions = (currentStatus: string) => {
        const allStatuses = ["approved", "pending", "rejected"];
        return allStatuses.filter(status => status !== currentStatus);
    }

    const imageId = selectedMetadata?.id;

    const handleImageDeleted = async (ids: number[]) => {
        try {
            setLoading("delete");

            setTimeout(async () => {
                try {
                    await numberOfImageDelet(ids).unwrap();
                    // alert("image delete successfully.");
                } catch (err) {
                    console.error("Delete failed:", err);
                    alert("Failed to delete selected images.");
                } finally {
                    setLoading(null);
                }
            }, 2000);
            dispatch(closeSidebar());
            dispatch(clearSelectedMetadata());
        } catch (err) {
            console.error("Outer Error:", err);
        }
    }

    const onSubmitForm = async (formData: any) => {
        const keywordsAsObjects = keywords.map((kw) => ({ id: kw.id, name: kw.name }));
        const payload = { ...formData, keywords: keywordsAsObjects };

        try {
            setLoading("update");

            setTimeout(async () => {
                try {
                    await updatedImage({ id: imageId, data: payload }).unwrap();
                    // alert("image update successfully.");
                } catch (error) {
                    console.error("Update failed:", error);
                    alert("Failed to update image.");
                } finally {
                    setLoading(null);
                }
            }, 2000);
            dispatch(closeSidebar());
            dispatch(clearSelectedMetadata());
        } catch (error) {
            console.error("Outer Error:", error);
        }
    }

    return (
        <div className="block w-full h-full px-2.5 py-2.5 border rounded-md overflow-scroll scrollbar-width">
            <div className="flex flex-col flex-wrap gap-y-2.5 w-full">
                <div className="flex flex-row flex-wrap items-center justify-between py-2.5 px-2.5 rounded bg-gray-300 w-full">
                    <p>{selectedCount} images selected</p>
                    <button className="cursor-pointer" type="button" onClick={() => handleImageDeleted(selectedIds)}>
                        <RiDeleteBin6Line className="text-2xl" />
                    </button>
                </div>
                <div className="flex flex-col w-full">
                    <img className="block w-full h-auto rounded" src={`${selectedMetadata?.url}`} alt={selectedMetadata?.title} />
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
                        <React.Fragment>
                            <div className="flex flex-wrap gap-2 border py-2.5 px-2.5 rounded">
                                {keywords.map((kw, idx) => (
                                    <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1">
                                        {kw.name}
                                        <button type="button" onClick={() => removeKeyword(kw.name)} className="text-red-500 cursor-pointer">×</button>
                                    </span>
                                ))}
                            </div>
                            {showKeywordInput && (
                                <input
                                    type="text"
                                    className="border py-2.5 px-2.5 rounded w-full"
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
                        </React.Fragment>
                    </Field>
                    <Field label="Category" error={errors.category}>
                        <select
                            className="border py-2.5 px-2.5 rounded w-full capitalize"
                            {...register("category")}
                            id="category"
                        >
                            <option value={selectedMetadata?.category} defaultValue={selectedMetadata?.category}>{selectedMetadata?.category}</option>
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
                            {selectedMetadata?.status && (
                                <option value={selectedMetadata?.status}>{selectedMetadata?.status}</option>
                            )}
                            {getStatusOptions(selectedMetadata?.status).map((status: string) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <div className="flex flex-col flex-wrap gap-2.5">
                        <h4 className="text-base font-medium">Contributor :</h4>
                        <div className="flex flex-col flex-wrap gap-y-1.5">
                            {selectedMetadata?.user?.username && (
                                <span>Username : {selectedMetadata?.user?.username}</span>
                            )}
                            {selectedMetadata?.user?.first_name && (
                                <span>First Name : {selectedMetadata?.user?.first_name}</span>
                            )}
                            {selectedMetadata?.user?.last_name && (
                                <span>Last Name : {selectedMetadata?.user?.last_name}</span>
                            )}
                            {selectedMetadata?.user?.email && (
                                <Link className="w-fit" to={`mailto:${selectedMetadata?.user?.email}`}>Email : {selectedMetadata?.user?.email}</Link>
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
