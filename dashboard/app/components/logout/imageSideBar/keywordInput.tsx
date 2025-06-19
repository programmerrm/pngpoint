import React, { useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import type { KeywordType } from "./ImageSidebar";
import { Field } from "~/components/field/field";

interface Props {
    keywords: KeywordType[];
    setKeywords: (keywords: KeywordType[]) => void;
    setValue: UseFormSetValue<FieldValues>;
}

export function KeywordInput({ keywords, setKeywords, setValue }: Props) {
    const [showInput, setShowInput] = useState(false);
    const [newKeyword, setNewKeyword] = useState("");

    const addKeyword = () => {
        const trimmed = newKeyword.trim();
        if (!trimmed || keywords.find(k => k.name.toLowerCase() === trimmed.toLowerCase())) return;

        const newId = (Math.max(...keywords.map(k => k.id ?? 0)) || 0) + 1;
        const updated = [...keywords, { id: newId, name: trimmed }];
        setKeywords(updated);
        setValue("keywords", updated);
        setNewKeyword("");
        setShowInput(false);
    };

    const removeKeyword = (name: string) => {
        const updated = keywords.filter(k => k.name !== name);
        setKeywords(updated);
        setValue("keywords", updated);
    };

    return (
        <Field label="Keywords">
            <div className="flex flex-wrap gap-2 border py-2.5 px-2.5 rounded">
                {keywords.map((kw, idx) => (
                    <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full flex items-center gap-1">
                        {kw.name}
                        <button type="button" onClick={() => removeKeyword(kw.name)} className="text-red-500">×</button>
                    </span>
                ))}
            </div>
            {showInput && (
                <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    className="border py-2.5 px-2.5 rounded w-full"
                    autoFocus
                />
            )}
            <button
                type="button"
                onClick={() => setShowInput(true)}
                className="text-blue-600 text-sm mt-2"
            >
                + Add keyword
            </button>
        </Field>
    );
}
