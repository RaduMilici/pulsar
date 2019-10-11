const path = require('path');
const { Project } = require('ts-morph');

const srcPath = path.resolve(__dirname, '../../src');
const project = new Project({ 
  compilerOptions: { 
    outDir: 'scripts/build-debugger/build', 
  },
});

project.addExistingSourceFiles(`${srcPath}/**/*.ts`);
const sourceFiles = project.getSourceFiles();

sourceFiles.forEach(file => {
  if (file.isDeclarationFile()) {
    return;
  }

  const importStatements = file.getImportDeclarations();
  const exportStatements = file.getExportDeclarations();

  importStatements.forEach(statement => statement.remove());
  exportStatements.forEach(statement => statement.remove());
  file.removeDefaultExport();
});

project.emitSync({ emitOnlyDtsFiles: true });
