
import React from 'react';
import { InputType } from '../types';
import { CodeIcon, ImageIcon, TextIcon, JsonIcon, UploadIcon } from './icons/Icons';

interface InputTabsProps {
    inputType: InputType;
    setInputType: (type: InputType) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
    setImageFile: (file: File | null) => void;
}

const TABS = [
    { id: InputType.TEXT, label: 'Description', icon: <TextIcon className="w-5 h-5"/> },
    { id: InputType.SQL, label: 'SQL', icon: <CodeIcon className="w-5 h-5"/> },
    { id: InputType.JSON, label: 'JSON', icon: <JsonIcon className="w-5 h-5"/> },
    { id: InputType.IMAGE, label: 'Diagram', icon: <ImageIcon className="w-5 h-5"/> },
];

const PLACEHOLDERS = {
    [InputType.TEXT]: 'e.g., A blog has many posts, and each post has many comments. Users can write posts and comments.',
    [InputType.SQL]: 'e.g., CREATE TABLE users (id BIGINT PRIMARY KEY, username VARCHAR(255)); CREATE TABLE posts ...',
    [InputType.JSON]: 'e.g., { "entities": [ { "name": "User", "fields": ["id", "name"] } ], "relations": [ ... ] }',
    [InputType.IMAGE]: '',
};

export const InputTabs: React.FC<InputTabsProps> = ({
    inputType,
    setInputType,
    inputValue,
    setInputValue,
    setImageFile
}) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = React.useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        setFileName(file?.name || null);
    };

    const handleTabClick = (type: InputType) => {
        setInputType(type);
        setInputValue('');
        setImageFile(null);
        setFileName(null);
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg">
            <div className="flex border-b border-dark-border">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm font-medium transition-colors ${
                            inputType === tab.id
                                ? 'bg-gray-800 text-brand-neon border-b-2 border-brand-neon'
                                : 'text-dark-text-secondary hover:bg-gray-800/50'
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-4">
                {inputType !== InputType.IMAGE ? (
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={PLACEHOLDERS[inputType]}
                        className="w-full h-48 p-3 bg-dark-bg border border-dark-border rounded-md font-mono text-sm focus:ring-2 focus:ring-brand-neon focus:border-brand-neon outline-none resize-none"
                    />
                ) : (
                    <div
                        className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-dark-border rounded-md cursor-pointer hover:border-brand-neon hover:bg-gray-800/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                        />
                        {fileName ? (
                            <div className="text-center">
                                <ImageIcon className="w-10 h-10 mx-auto text-brand-neon mb-2" />
                                <p className="font-medium text-dark-text">{fileName}</p>
                                <p className="text-sm text-dark-text-secondary">Click to change file</p>
                            </div>
                        ) : (
                            <div className="text-center text-dark-text-secondary">
                                <UploadIcon className="w-10 h-10 mx-auto mb-2" />
                                <p className="font-medium text-dark-text">Click to upload ER Diagram</p>
                                <p className="text-sm">PNG, JPG, or WEBP</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
