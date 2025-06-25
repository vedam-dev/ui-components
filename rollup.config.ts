import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import type { RollupOptions } from 'rollup';
import babel from '@rollup/plugin-babel';

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
    preserveModules: true
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
      declaration: !process.env.TYPES_ONLY, // Only generate declarations during JS build
      declarationDir: `dist/${format}/types`,
      outDir: `dist/${format}`,
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

// Conditional config based on environment variables
const getConfigs = (): RollupOptions[] => {
  if (process.env.BUILD_ONLY) {
    return [createFormatConfig('cjs'), createFormatConfig('esm')];
  }
  if (process.env.TYPES_ONLY) {
    return [dtsConfig];
  }
  return [createFormatConfig('cjs'), createFormatConfig('esm'), dtsConfig];
};

const configs: RollupOptions[] = getConfigs();
export default configs;
