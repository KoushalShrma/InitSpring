
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GeneratedFile } from '../types';
import { Tooltip } from './Tooltip';
import { FileIcon, SparklesIcon, CopyIcon, CheckIcon } from './icons/Icons';
import { AnimatedKLogo } from './AnimatedKLogo';

interface CodePreviewProps {
    generatedCode: GeneratedFile[] | null;
    isLoading: boolean;
}

const formatAndIndentCode = (code: string): string => {
    // 1. AI provides line breaks; we just do minor cleanup and indenting.
    // The aggressive .replace(/([;{}])/g, '$1\n') was removed to respect AI formatting.
    let formatted = code
        .replace(/}\n\s*(else|catch|finally)/g, '} $1');

    // 2. Apply basic auto-indentation
    const lines = formatted.split('\n');
    let indentLevel = 0;
    const indentText = '    '; // 4 spaces
    let result: string[] = [];

    for (const line of lines) {
        const trimmed = line.trim();
        
        // Preserve blank lines from the AI's output
        if (trimmed === '') {
            result.push('');
            continue;
        }

        if (trimmed.startsWith('}')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }

        result.push(indentText.repeat(indentLevel) + trimmed);

        if (trimmed.endsWith('{')) {
            indentLevel++;
        }
    }
    
    // Add some final spacing for readability
    return result.join('\n')
        .replace(/(package .*;\n)/, '$1\n') // Space after package
        .replace(/(import .*;\n)(?!import)/, '$1\n'); // Space after last import
};


const JavaSyntaxHighlighter: React.FC<{ code: string }> = React.memo(({ code }) => {
    const KEYWORDS = useMemo(() => new Set(['package', 'import', 'public', 'class', 'interface', 'private', 'protected', 'static', 'final', 'void', 'enum', 'extends', 'implements', 'return', 'new', 'super', 'this', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'throw', 'throws', 'try', 'catch', 'finally', 'true', 'false', 'null']), []);
    const TYPES = useMemo(() => new Set(['String', 'Long', 'Integer', 'List', 'Set', 'Map', 'Boolean', 'double', 'int', 'long', 'boolean', 'char', 'byte', 'short', 'float', 'Object', 'Date', 'LocalDate', 'LocalDateTime', 'UUID', 'HashSet', 'ArrayList', 'HashMap', 'GenerationType', 'FetchType', 'CascadeType', 'ResponseEntity', 'Optional']), []);

    const formattedCode = formatAndIndentCode(code);

    const highlightTokens = (line: string) => {
        const parts = [];
        let key = 0;

        // Preserve leading whitespace for indentation
        const leadingSpacesMatch = line.match(/^\s*/);
        if (leadingSpacesMatch) {
            const spaces = leadingSpacesMatch[0];
            if (spaces.length > 0) {
                parts.push(spaces);
            }
        }

        const trimmedLine = line.trim();

        while (line.length > 0) {
            // 1. Comments
            if (line.startsWith('//')) {
                parts.push(<span key={`token-${key++}`} className="text-gray-500">{line}</span>);
                break;
            }

            // 2. Strings
            if (line.startsWith('"')) {
                let end = 1;
                while (end < line.length && (line[end] !== '"' || line[end-1] === '\\')) {
                    end++;
                }
                end++;
                const value = line.substring(0, end);
                parts.push(<span key={`token-${key++}`} className="text-green-400">{value}</span>);
                line = line.substring(end);
                continue;
            }

            // 3. Annotations
            if (line.startsWith('@')) {
                 let end = 1;
                while (end < line.length && /[a-zA-Z0-9_]/.test(line[end])) {
                    end++;
                }
                const token = line.substring(0, end);
                parts.push(<Tooltip key={`token-${key++}`} annotation={token}><span className="text-yellow-400">{token}</span></Tooltip>);
                line = line.substring(end);
                continue;
            }

            // 4. Identifiers or words
            const wordMatch = line.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
            if (wordMatch) {
                const token = wordMatch[0];
                let className = '';
                if (KEYWORDS.has(token)) {
                    className = 'text-pink-400';
                } else if (TYPES.has(token)) {
                    className = 'text-cyan-400';
                } else if (/^[A-Z]/.test(token)) { // Class names
                    className = 'text-teal-300';
                }
                parts.push(<span key={`token-${key++}`} className={className}>{token}</span>);
                line = line.substring(token.length);
                continue;
            }

            // 5. Numbers
            const numberMatch = line.match(/^\d+/);
            if (numberMatch) {
                const token = numberMatch[0];
                parts.push(<span key={`token-${key++}`} className="text-purple-400">{token}</span>);
                line = line.substring(token.length);
                continue;
            }
            
            // 6. Punctuation, Operators & Whitespace
            const otherMatch = line.match(/^(\s+|[^\s\w@"]+)/);
            if(otherMatch) {
                const token = otherMatch[0];
                parts.push(token);
                line = line.substring(token.length);
                continue;
            }
            
            // Failsafe
            if (line.length > 0) {
                parts.push(line[0]);
                line = line.substring(1);
            }
        }

        return <>{parts}</>;
    };

    return (
        <div className="font-mono text-sm">
            {formattedCode.split('\n').map((line, i) => (
                <div key={i} className="flex">
                    <span className="w-12 flex-shrink-0 select-none pr-4 text-right text-dark-text-secondary">{i + 1}</span>
                    <pre className="flex-1 whitespace-pre-wrap break-words"><code>{line.length > 0 ? highlightTokens(line) : ' '}</code></pre>
                </div>
            ))}
        </div>
    );
});

export const CodePreview: React.FC<CodePreviewProps> = ({ generatedCode, isLoading }) => {
    const [selectedFile, setSelectedFile] = useState<GeneratedFile | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (generatedCode && generatedCode.length > 0) {
            // Default to showing a controller if one exists, otherwise a model.
            const defaultFile = generatedCode.find(f => f.fileName.includes('/controller/')) 
                              || generatedCode.find(f => f.fileName.includes('/model/')) 
                              || generatedCode[0];
            setSelectedFile(defaultFile);
        } else {
            setSelectedFile(null);
        }
    }, [generatedCode]);

    const handleCopy = useCallback(() => {
        if (!selectedFile) return;

        const codeToCopy = formatAndIndentCode(selectedFile.code);
        navigator.clipboard.writeText(codeToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }, [selectedFile]);

    const groupedFiles = useMemo(() => {
        if (!generatedCode) return {};
        return generatedCode.reduce((acc, file) => {
            let group = 'Configuration';
            if (file.fileName.includes('/controller/')) {
                group = 'Controllers';
            } else if (file.fileName.includes('/service/')) {
                group = 'Services';
            } else if (file.fileName.includes('/repository/')) {
                group = 'Repositories';
            } else if (file.fileName.includes('/model/')) {
                group = 'Entities';
            }
            
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(file);
            return acc;
        }, {} as Record<string, GeneratedFile[]>);
    }, [generatedCode]);

    const groupOrder = ['Controllers', 'Services', 'Repositories', 'Entities', 'Configuration'];
    const fileGroups = Object.keys(groupedFiles).sort((a,b) => groupOrder.indexOf(a) - groupOrder.indexOf(b));

    if (isLoading) {
        return (
            <div className="bg-dark-card border border-dark-border rounded-lg p-4 h-full flex flex-col items-center justify-center">
                <AnimatedKLogo size={100} />
                <p className="mt-8 text-lg font-medium">Building your project...</p>
                <p className="text-dark-text-secondary">Brick by brick 🧱</p>
            </div>
        );
    }
    
    if (!generatedCode) {
        return (
            <div className="bg-dark-card border border-dark-border rounded-lg p-4 h-full flex flex-col items-center justify-center text-center">
                 <div className="text-dark-text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                </div>
                <p className="mt-4 text-lg font-medium">Your code will appear here</p>
                <p className="text-dark-text-secondary">Fill out the details on the left and click "Generate Project" to start.</p>
            </div>
        );
    }

    const getShortName = (path: string) => path.substring(path.lastIndexOf('/') + 1);

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg flex flex-col lg:flex-row h-full">
            <div className="w-full lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-dark-border p-2 overflow-y-auto">
                {fileGroups.map((group) => (
                    <div key={group} className="mb-2">
                        <h3 className="text-xs font-semibold uppercase text-dark-text-secondary p-2 tracking-wider">{group}</h3>
                        <ul>
                            {groupedFiles[group].sort((a,b) => a.fileName.localeCompare(b.fileName)).map(file => (
                                <li key={file.fileName}>
                                    <button
                                        onClick={() => setSelectedFile(file)}
                                        className={`w-full text-left text-sm flex items-center gap-2 p-2 rounded-md transition-colors ${
                                            selectedFile?.fileName === file.fileName
                                                ? 'bg-brand-neon/10 text-brand-neon'
                                                : 'hover:bg-gray-800/50'
                                        }`}
                                    >
                                        <FileIcon className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{getShortName(file.fileName)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="w-full lg:flex-1 overflow-auto relative">
                {selectedFile ? (
                    <>
                        <div className="absolute top-2 right-2 z-10">
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-md bg-dark-bg border border-dark-border text-dark-text-secondary hover:text-white hover:bg-gray-700 transition-all"
                                aria-label="Copy code"
                            >
                                {isCopied ? (
                                    <div className="flex items-center gap-1.5 text-brand-neon">
                                        <CheckIcon className="w-4 h-4" />
                                        <span className="text-xs font-semibold">Copied!</span>
                                    </div>
                                ) : (
                                    <CopyIcon className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <div className="p-4">
                            <JavaSyntaxHighlighter code={selectedFile.code} />
                        </div>
                    </>
                ) : (
                    <div className="p-4 text-center text-dark-text-secondary">Select a file to view its content.</div>
                )}
            </div>
        </div>
    );
};
