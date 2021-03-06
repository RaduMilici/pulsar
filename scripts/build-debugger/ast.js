const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { Project } = require('ts-morph');
const getProgressBar = require('./progressBar');

const generateDTSfiles = () => {
  console.log('Generating .d.ts files:');

  const srcPath = path.resolve(__dirname, '../../src');
  const project = new Project({ 
    compilerOptions: { 
      outDir: 'scripts/build-debugger/dtsBuild', 
    },
  });
  
  project.addExistingSourceFiles(`${srcPath}/**/!(*.spec).ts`);
  const sourceFiles = project.getSourceFiles();
  const bar = getProgressBar(sourceFiles.length);
  
  sourceFiles.forEach(file => {
    if (file.isDeclarationFile()) {
      return;
    }  
    const importStatements = file.getImportDeclarations();
    const exportStatements = file.getExportDeclarations();  
    importStatements.forEach(statement => statement.remove());
    exportStatements.forEach(statement => statement.remove());
    file.removeDefaultExport();
    bar.tick();
  });
  
  project.emitSync({ emitOnlyDtsFiles: true });
};

const concatDTSfiles = () => {
  const dtsBuildPath = glob.sync(path.resolve(__dirname, 'dtsBuild/**/*.ts')); 
  const filePaths = [...dtsBuildPath];
  const allFileTexts = [];

  filePaths.forEach(filePath => {
    const fileText = fs.readFileSync(filePath, 'utf8');
    allFileTexts.push(fileText);
  });

  const text = `
  export default \`declare namespace Pulsar {
    ${allFileTexts.join('')}
  }\`;`;
  fs.writeFileSync(path.resolve(__dirname, 'bundle.ts'), text);
};

module.exports = {
  generateDTSfiles,
  concatDTSfiles,
};
