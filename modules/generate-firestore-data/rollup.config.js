import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.esm.js",
        format: "esm"
      },
      {
        file: "dist/index.js",
        format: "cjs"
      }
    ],
    external: ["chunk-and-parallelize"],
    plugins: [
      typescript({
        typescript: require("typescript"),
        abortOnError: false,
        tsconfigOverride: {
          compilerOptions: {
            module: "esnext"
          }
        }
      })
    ]
  },
  {
    input: "src/cli.ts",
    output: [
      {
        banner: "#!/usr/bin/env node",
        file: "dist/cli.esm.js",
        format: "esm"
      },
      {
        banner: "#!/usr/bin/env node",
        file: "dist/cli.cjs.js",
        format: "cjs"
      }
    ],
    external: ["lru-cache", "document", "store2"],
    plugins: [
      typescript({
        typescript: require("typescript"),
        abortOnError: false,
        tsconfigOverride: {
          compilerOptions: {
            module: "esnext"
          }
        }
      })
    ]
  }
];
