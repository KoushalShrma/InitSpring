export enum InputType {
    TEXT = 'text',
    SQL = 'sql',
    JSON = 'json',
    IMAGE = 'image',
}

export interface ProjectConfig {
    group: string;
    artifact: string;
    name: string;
    description: string;
    packageName: string;
    buildTool: 'Maven' | 'Gradle';
    javaVersion: '11' | '17' | '21' | '25';
    useLombok: boolean;
}

export interface Dependency {
    id: string;
    name: string;
    description: string;
    category: string;
}

export interface GeneratedFile {
    fileName: string;
    code: string;
}
