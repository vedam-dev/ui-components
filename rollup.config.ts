import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
// import path from 'path';
// import fs from 'fs';
import type { RollupOptions } from 'rollup';
import babel from '@rollup/plugin-babel';

/**
 * Recursively finds all .tsx files in a directory and its subdirectories
 * @param directoryPath The directory to search in
 * @returns Array of absolute paths to .tsx files
 */
// function findTsxFiles(directoryPath: string): string[] {
//   const tsxFiles: string[] = [];

//   function scanDirectory(currentPath: string): void {
//     const items = fs.readdirSync(currentPath);

//     for (const item of items) {
//       const fullPath = path.join(currentPath, item);
//       const stat = fs.statSync(fullPath);

//       if (stat.isDirectory()) {
//         scanDirectory(fullPath); // Recurse into subdirectory
//       } else if (path.extname(fullPath) === '.tsx') {
//         tsxFiles.push(fullPath); // Add .tsx file to results
//       }
//     }
//   }

//   scanDirectory(directoryPath);
//   return tsxFiles;
// }

// const tsxFiles = findTsxFiles(path.resolve('./src/component'));

/**
 * Generates export statements for all .tsx files
 * @param directoryPath Root directory to scan
 * @param outputFile Path to the output index.ts file
 */
// function generateExports(directoryPath: string, outputFile: string): void {
//   const tsxFiles = findTsxFiles(directoryPath);
//   const exports: string[] = [];

//   tsxFiles.forEach(filePath => {
//     // Convert to relative path from the output file's directory
//     const relativePath = path.relative(
//       path.dirname(outputFile),
//       filePath.replace(/\.tsx$/, '') // Remove .tsx extension
//     );

//     // Get component name from filename (capitalized)
//     const componentName = path
//       .basename(filePath, '.tsx')
//       .split('-')
//       .map(part => part.charAt(0).toUpperCase() + part.slice(1))
//       .join('');

//     exports.push(`export { default as ${componentName} } from './${relativePath}';`);
//   });

//   // Write to index.ts
//   fs.writeFileSync(outputFile, exports.join('\n') + '\n');
// }

// // If you want to generate exports for both directories, call generateExports for each:
// const componentDir = path.resolve('./src/component');

// const outputFile = path.resolve('./src/index.ts');

// generateExports(componentDir, outputFile);

// Main bundle configuration

const createFormatConfig = (format: 'cjs' | 'esm'): RollupOptions => ({
  input: {
    components: './src/index.ts',
    theme: './src/theme/customer/index.ts'
  },
  output: {
    dir: `dist/${format}`,
    format,
    exports: 'named',
    sourcemap: true,
    preserveModules: true // This maintains the original file structure
  },
  plugins: [
    peerDepsExternal() as Plugin,
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: `dist/${format}/types`, // Output types alongside the format
      outDir: `dist/${format}`, // Match Rollup's output dir
      rootDir: 'src',
      exclude: ['./src/stories', '**/*.stories.tsx']
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
      presets: ['@babel/preset-react', '@babel/preset-typescript']
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    terser(),
    copy({
      targets: [{ src: 'src/**/*.scss', dest: 'dist' }]
    })
  ],
  external: [
    'react',
    'react-dom',
    '@mui/material',
    '@mui/material/styles',
    '@mui/system',
    '@mui/icons-material',
    '@mui/lab',
    '@emotion/react',
    '@emotion/styled',
    'next'
  ]
});

// TypeScript declaration bundling configuration
const dtsConfig: RollupOptions = {
  input: './src/index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'esm'
  },
  plugins: [
    dts({
      respectExternal: true,
      compilerOptions: {
        skipLibCheck: true,
        incremental: false
      }
    })
  ],
  external: [
    'react',
    'react-dom',
    '@mui/material',
    '@mui/material/styles',
    '@mui/system',
    '@mui/icons-material',
    '@mui/lab',
    '@emotion/react',
    '@emotion/styled',
    'next'
  ]
};

const configs: RollupOptions[] = [createFormatConfig('cjs'), createFormatConfig('esm'), dtsConfig];

export default configs;
