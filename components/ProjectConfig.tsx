import React from 'react';
import { ProjectConfig as ProjectConfigType } from '../types';

interface ProjectConfigProps {
    config: ProjectConfigType;
    setConfig: React.Dispatch<React.SetStateAction<ProjectConfigType>>;
}

const Label: React.FC<{ htmlFor?: string; children: React.ReactNode; }> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-dark-text-secondary mb-1">
        {children}
    </label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className="w-full p-2 bg-dark-bg border border-dark-border rounded-md text-sm focus:ring-1 focus:ring-brand-neon focus:border-brand-neon outline-none"
    />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
     <select {...props} className="w-full p-2 bg-dark-bg border border-dark-border rounded-md text-sm focus:ring-1 focus:ring-brand-neon focus:border-brand-neon outline-none" />
);

const Toggle: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ label, enabled, onChange }) => (
    <div>
        <Label>{label}</Label>
        <button
            type="button"
            onClick={() => onChange(!enabled)}
            className={`${
                enabled ? 'bg-brand-neon' : 'bg-gray-600'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-neon focus:ring-offset-2 focus:ring-offset-dark-card`}
            role="switch"
            aria-checked={enabled}
        >
            <span
                aria-hidden="true"
                className={`${
                    enabled ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
    </div>
);


export const ProjectConfig: React.FC<ProjectConfigProps> = ({ config, setConfig }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setConfig(prev => {
            const newConfig = { ...prev, [name]: value };
            if (name === 'group' || name === 'artifact') {
                newConfig.packageName = `${newConfig.group}.${newConfig.artifact}`.replace(/-/g, '');
            }
            if (name === 'name'){
                 newConfig.artifact = value.toLowerCase().replace(/\s+/g, '-');
            }
            return newConfig;
        });
    };

    const handleToggle = (name: keyof ProjectConfigType, value: boolean) => {
         setConfig(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-4">Project Metadata</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="buildTool">Build Tool</Label>
                    <Select id="buildTool" name="buildTool" value={config.buildTool} onChange={handleChange}>
                        <option>Maven</option>
                        <option>Gradle</option>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="javaVersion">Java Version</Label>
                    <Select id="javaVersion" name="javaVersion" value={config.javaVersion} onChange={handleChange}>
                        <option>25</option>
                        <option>21</option>
                        <option>17</option>
                        <option>11</option>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="group">Group</Label>
                    <Input id="group" name="group" type="text" value={config.group} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="artifact">Artifact</Label>
                    <Input id="artifact" name="artifact" type="text" value={config.artifact} onChange={handleChange} />
                </div>
                <div className="sm:col-span-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" type="text" value={config.name} onChange={handleChange} />
                </div>
                 <div className="sm:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" name="description" type="text" value={config.description} onChange={handleChange} />
                </div>
                <div className="sm:col-span-2">
                    <Label htmlFor="packageName">Package Name</Label>
                    <Input id="packageName" name="packageName" type="text" value={config.packageName} onChange={handleChange} />
                </div>
                 <div className="sm:col-span-2 mt-2">
                   <Toggle 
                        label="Use Lombok"
                        enabled={config.useLombok}
                        onChange={(enabled) => handleToggle('useLombok', enabled)}
                   />
                </div>
            </div>
        </div>
    );
};
