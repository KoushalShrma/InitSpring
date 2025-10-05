import React, { useState, useMemo } from 'react';
import { Dependency } from '../types';
import { AddIcon, CloseIcon } from './icons/Icons';

interface DependencySelectorProps {
    dependencies: Dependency[];
    selected: string[];
    onToggle: (id: string) => void;
}

const DependencyModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    allDependencies: Dependency[];
    selected: string[];
    onToggle: (id: string) => void;
}> = ({ isOpen, onClose, allDependencies, selected, onToggle }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAndGroupedDependencies = useMemo(() => {
        const filtered = allDependencies.filter(dep =>
            dep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dep.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered.reduce((acc, dep) => {
            if (!acc[dep.category]) {
                acc[dep.category] = [];
            }
            acc[dep.category].push(dep);
            return acc;
        }, {} as { [key: string]: Dependency[] });

    }, [searchTerm, allDependencies]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-dark-card border border-dark-border rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-dark-border">
                    <h3 className="text-lg font-semibold text-white">Add Dependencies</h3>
                    <input
                        type="text"
                        placeholder="Search for dependencies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full mt-2 p-2 bg-dark-bg border border-dark-border rounded-md text-sm focus:ring-1 focus:ring-brand-neon focus:border-brand-neon outline-none"
                    />
                </div>
                <div className="overflow-y-auto p-4">
                    {Object.entries(filteredAndGroupedDependencies).sort(([catA], [catB]) => catA.localeCompare(catB)).map(([category, deps]) => (
                        <div key={category} className="mb-6">
                            <h4 className="text-brand-neon font-semibold mb-2">{category}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {deps.map(dep => (
                                     <button
                                        key={dep.id}
                                        onClick={() => onToggle(dep.id)}
                                        className={`p-3 border rounded-md text-left transition-all duration-200 h-full ${
                                            selected.includes(dep.id)
                                                ? 'bg-brand-neon/10 border-brand-neon text-white ring-1 ring-brand-neon'
                                                : 'bg-dark-bg border-dark-border hover:border-gray-600'
                                        }`}
                                    >
                                        <div className="font-semibold text-sm">{dep.name}</div>
                                        <p className="text-xs text-dark-text-secondary mt-1">{dep.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                     {Object.keys(filteredAndGroupedDependencies).length === 0 && (
                        <p className="text-dark-text-secondary text-center">No dependencies found for "{searchTerm}".</p>
                    )}
                </div>
                 <div className="p-4 border-t border-dark-border text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-brand-neon text-dark-bg font-bold rounded-lg text-sm">Done</button>
                </div>
            </div>
        </div>
    );
};

export const DependencySelector: React.FC<DependencySelectorProps> = ({ dependencies, selected, onToggle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectedDependencies = useMemo(() => dependencies.filter(d => selected.includes(d.id)), [dependencies, selected]);

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Dependencies</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-sm font-medium rounded-md transition-colors"
                >
                    <AddIcon className="w-4 h-4" />
                    Add
                </button>
            </div>
            
            {selectedDependencies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {selectedDependencies.map(dep => (
                        <div key={dep.id} className="flex items-center gap-2 bg-dark-bg border border-dark-border rounded-full py-1 pl-3 pr-2 text-sm">
                            <span>{dep.name}</span>
                            <button onClick={() => onToggle(dep.id)} className="text-dark-text-secondary hover:text-white rounded-full p-0.5 hover:bg-gray-700">
                                <CloseIcon className="w-4 h-4"/>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-dark-text-secondary">No dependencies selected. Click 'Add' to get started.</p>
            )}

            <DependencyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                allDependencies={dependencies}
                selected={selected}
                onToggle={onToggle}
            />
        </div>
    );
};