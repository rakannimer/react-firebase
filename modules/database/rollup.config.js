import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/index.esm.js",
      format: "esm"
    },
    {
      file: "dist/index.cjs.js",
      format: "cjs"
    }
  ],
  external: ["render-and-add-props", "react"],
  plugins: [
    typescript({
      typescript: require("typescript"),
      abortOnError: false
    })
  ]
};
