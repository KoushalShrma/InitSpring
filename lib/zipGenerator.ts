import { ProjectConfig, Dependency, GeneratedFile } from '../types';
import { generatePomXml } from './pomGenerator';
import { getMainApplicationContent, getApplicationPropertiesContent, MVNW_SCRIPT, MVNW_CMD_SCRIPT, MAVEN_WRAPPER_PROPS } from './staticFiles';

declare const JSZip: any;
declare const saveAs: any;

export const generateProjectZip = async (
    config: ProjectConfig,
    dependencies: Dependency[],
    generatedCode: GeneratedFile[]
): Promise<void> => {
    const zip = new JSZip();

    // 1. Generate pom.xml
    const pomXmlContent = generatePomXml(config, dependencies);
    zip.file('pom.xml', pomXmlContent);

    // 2. Add Maven Wrapper
    zip.file('mvnw', MVNW_SCRIPT, { unixPermissions: "755" });
    zip.file('mvnw.cmd', MVNW_CMD_SCRIPT);
    const mvnFolder = zip.folder('.mvn');
    const wrapperFolder = mvnFolder!.folder('wrapper');
    wrapperFolder!.file('maven-wrapper.properties', MAVEN_WRAPPER_PROPS);

    // 3. Add application.properties
    const resourcesFolder = zip.folder('src')!.folder('main')!.folder('resources');
    resourcesFolder!.file('application.properties', getApplicationPropertiesContent());

    // 4. Add main application class
    const packagePath = `src/main/java/${config.packageName.replace(/\./g, '/')}`;
    const mainAppFolder = zip.folder(packagePath);
    
    // Capitalize artifact name for class
    const mainClassName = config.name
        .split(/[-_ ]+/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
        
    mainAppFolder!.file(`${mainClassName}Application.java`, getMainApplicationContent(config, mainClassName));

    // 5. Add AI-generated files (Entities, Repositories)
    generatedCode.forEach(file => {
        zip.file(file.fileName, file.code);
    });

    // 6. Generate and download the zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, `${config.artifact}.zip`);
};