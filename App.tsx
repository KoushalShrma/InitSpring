import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputTabs } from './components/InputTabs';
import { ProjectConfig } from './components/ProjectConfig';
import { DependencySelector } from './components/DependencySelector';
import { CodePreview } from './components/CodePreview';
import { AnimatedKLogo } from './components/AnimatedKLogo';
import { generateProjectCode } from './services/groqService';
import { generateProjectZip } from './lib/zipGenerator';
import { InputType, ProjectConfig as ProjectConfigType, Dependency, GeneratedFile } from './types';
import { DEPENDENCIES } from './constants';
import { DownloadIcon, SparklesIcon, WarningIcon, GitHubIcon, LinkedInIcon } from './components/icons/Icons';

const App: React.FC = () => {
    const [inputType, setInputType] = useState<InputType>(InputType.TEXT);
    const [inputValue, setInputValue] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [projectConfig, setProjectConfig] = useState<ProjectConfigType>({
        group: 'com.example',
        artifact: 'demo',
        name: 'demo',
        description: 'Demo project for Spring Boot',
        packageName: 'com.example.demo',
        buildTool: 'Maven',
        javaVersion: '17',
        useLombok: true,
    });
    const [selectedDependencies, setSelectedDependencies] = useState<string[]>(['web', 'data-jpa', 'lombok', 'h2', 'mysql', 'postgresql']);
    const [generatedCode, setGeneratedCode] = useState<GeneratedFile[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDependencyToggle = (id: string) => {
        setSelectedDependencies(prev =>
            prev.includes(id) ? prev.filter(depId => depId !== id) : [...prev, id]
        );
    };

    const handleGenerate = useCallback(async () => {
        if (!inputValue && !imageFile) {
            setError('Please provide an input schema or description.');
            return;
        }
        setError(null);
        setIsLoading(true);
        setGeneratedCode(null);

        try {
            const deps = DEPENDENCIES.filter(d => selectedDependencies.includes(d.id));
            const code = await generateProjectCode(inputType, inputValue, imageFile, projectConfig, deps);
            setGeneratedCode(code);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred during code generation.');
        } finally {
            setIsLoading(false);
        }
    }, [inputType, inputValue, imageFile, projectConfig, selectedDependencies]);
    
    const handleDownload = useCallback(async () => {
        if (!generatedCode) return;
        setIsDownloading(true);
        try {
            const fullDependencies = DEPENDENCIES.filter(d => selectedDependencies.includes(d.id));
            await generateProjectZip(projectConfig, fullDependencies, generatedCode);
        } catch(err) {
             console.error("Failed to generate zip", err);
             setError(err instanceof Error ? err.message : 'An unknown error occurred during project zipping.');
        } finally {
            setIsDownloading(false);
        }
    }, [generatedCode, projectConfig, selectedDependencies]);

    const isGenerateDisabled = isLoading || (!inputValue.trim() && !imageFile);

    return (
        <div className="min-h-screen bg-dark-bg text-dark-text font-sans">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Configuration */}
                    <div className="flex flex-col gap-6">
                        <InputTabs
                            inputType={inputType}
                            setInputType={setInputType}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            setImageFile={setImageFile}
                        />
                        <ProjectConfig
                            config={projectConfig}
                            setConfig={setProjectConfig}
                        />
                        <DependencySelector
                            dependencies={DEPENDENCIES}
                            selected={selectedDependencies}
                            onToggle={handleDependencyToggle}
                        />
                         <div className="mt-4">
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerateDisabled}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-neon text-dark-bg font-bold rounded-lg shadow-lg hover:shadow-brand-neon/40 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                {isLoading ? (
                                    <>
                                      <div className="-ml-1 mr-2">
                                        <AnimatedKLogo size={24} />
                                      </div>
                                      Generating...
                                    </>
                                ) : (
                                    <>
                                        <SparklesIcon className="w-6 h-6" />
                                        Generate Project
                                    </>
                                )}
                            </button>
                            {error && (
                                <div className="mt-4 p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg flex items-center gap-2">
                                    <WarningIcon className="w-5 h-5"/>
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Code Preview */}
                    <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
                       <CodePreview generatedCode={generatedCode} isLoading={isLoading} />
                       {generatedCode && (
                            <div className="mt-6">
                               <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                               >
                                   {isDownloading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Zipping Project...
                                        </>
                                   ) : (
                                        <>
                                            <DownloadIcon className="w-6 h-6" />
                                            Download Project (.zip)
                                        </>
                                   )}
                               </button>
                           </div>
                       )}
                    </div>
                </div>
            </main>
            
            {/* Footer */}
            <footer className="bg-dark-card border-t border-dark-border mt-12">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <h3 className="text-lg font-bold text-white">
                                    Built by <a 
                                        href="https://www.koushal.me" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-brand-neon hover:underline transition-all duration-200"
                                    >
                                        Koushal Sharma
                                    </a>
                                </h3>
                                <div className="flex items-center gap-2">
                                    <a 
                                        href="https://github.com/KoushalShrma" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-dark-text-secondary hover:text-brand-neon transition-colors duration-200"
                                        aria-label="GitHub Profile"
                                    >
                                        <GitHubIcon className="w-5 h-5" />
                                    </a>
                                    <a 
                                        href="https://www.linkedin.com/in/koushalshrma/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-dark-text-secondary hover:text-brand-neon transition-colors duration-200"
                                        aria-label="LinkedIn Profile"
                                    >
                                        <LinkedInIcon className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                            <p className="text-dark-text-secondary text-sm max-w-2xl">
                                Crafted with passion and precision. This powerful Spring Boot project generator was 
                                <span className="text-brand-neon font-semibold"> built brick by brick</span> to streamline your development workflow.
                                Leveraging cutting-edge AI technology to transform your ideas into production-ready code.
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-2">
                            <div className="flex items-center gap-2 text-dark-text-secondary text-sm">
                                <SparklesIcon className="w-5 h-5 text-brand-neon" />
                                <span>Powered by Groq AI</span>
                            </div>
                            <p className="text-xs text-dark-text-secondary">
                                © {new Date().getFullYear()} InitSpring. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
