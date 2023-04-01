import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import terser from '@rollup/plugin-terser';

const config = {
  input: "src/lib/index.ts",
  output: [
    {
      file: "build/index.js",
      format: "cjs",
      sourcemap: true
    },
    {
      file: "build/index.es.js",
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
      mainFields: ['browser']
    }),
    commonjs(),
    terser(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss()
  ],
  external: ['react', 'react-dom']
};

export default config