import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdatedImageMutation } from "~/redux/features/images/imageUpdatedApi";
import { useNumberOfImageDeletMutation } from "~/redux/features/images/imagesDeletedApi";
import type { MetaDataResponseType, KeywordResponseType } from "~/types/metaDataResponseType";
import { HeaderBar } from "./headerBar";
import { ImagePreview } from "./imagePreview";
import { Field } from "~/components/field/field";
import { KeywordInput } from "./keywordInput";
import { ContributorInfo } from "./contributorInfo";

export type KeywordType = { id: number | null; name: string };

export default function ImageSidebar({
    selectedMetadata,
    selectedCount,
    selectedIds,
    setLoading,
}: {
    selectedMetadata: MetaDataResponseType;
    selectedCount: number;
    selectedIds: number[];
    setLoading: (value: null | "update" | "delete") => void;
}) {
    const [keywords, setKeywords] = useState<KeywordType[]>([]);
    const [updatedImage] = useUpdatedImageMutation();
    const [numberOfImageDelet] = useNumberOfImageDeletMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<any>();

    useEffect(() => {
        const defaultKeywords = selectedMetadata?.keywords?.map((k: KeywordResponseType) => ({
            id: k.id ?? null,
            name: k.name,
        })) || [];

        reset({
            title: selectedMetadata?.title || "",
            description: selectedMetadata?.description || "",
            status: selectedMetadata?.status || "",
            category: selectedMetadata?.category || "",
            keywords: defaultKeywords,
        });

        setKeywords(defaultKeywords);
    }, [selectedMetadata, reset]);

    const handleDelete = async () => {
        try {
            setLoading("delete");
            await numberOfImageDelet(selectedIds).unwrap();
        } catch (err) {
            alert("Failed to delete selected images.");
        } finally {
            setLoading(null);
        }
    };

    const handleUpdate = async (formData: any) => {
        try {
            setLoading("update");
            await updatedImage({ id: selectedMetadata?.id, data: { ...formData, keywords } }).unwrap();
        } catch (err) {
            alert("Failed to update image.");
        } finally {
            setLoading(null);
        }
    };

    const getStatusOptions = (status: string) =>
        ["approved", "pending", "rejected"].filter((s) => s !== status);

    return (
        <div className="w-full h-full px-2.5 py-2.5 border rounded-md overflow-y-auto">
            <HeaderBar count={selectedCount} onDelete={handleDelete} />
            <ImagePreview url={selectedMetadata?.url} title={selectedMetadata?.title} />

            <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col gap-y-3.5">
                <Field label="Title" error={errors.title}>
                    <input {...register("title")} className="border py-2.5 px-2.5 rounded w-full" />
                </Field>

                <Field label="Description" error={errors.description}>
                    <textarea {...register("description")} className="border py-2.5 px-2.5 rounded w-full" />
                </Field>

                <KeywordInput
                    keywords={keywords}
                    setKeywords={setKeywords}
                    setValue={setValue}
                />

                <Field label="Category" error={errors.category}>
                    <select {...register("category")} className="border py-2.5 px-2.5 rounded w-full capitalize">
                        <option value={selectedMetadata?.category}>{selectedMetadata?.category}</option>
                        {/* Add options here if needed */}
                    </select>
                </Field>

                <Field label="Status" error={errors.status}>
                    <select {...register("status")} className="border py-2.5 px-2.5 rounded w-full capitalize">
                        <option value={selectedMetadata?.status}>{selectedMetadata?.status}</option>
                        {getStatusOptions(selectedMetadata?.status).map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </Field>

                <ContributorInfo user={selectedMetadata?.user} />

                <button type="submit" className="bg-blue-500 text-white py-2.5 px-2.5 rounded-full">
                    Save
                </button>
            </form>
        </div>
    );
}
