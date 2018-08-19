import flatten from "flat";
import faker from "faker";
import set from "lodash.set";
import { chunkAndParallelize } from "chunk-and-parallelize";
export type StringNode = {
  depth: number;
  value: string;
};

export const generateKey = (
  keyName: string,
  depth: number,
  keyReducers = {} as any,
  keyMap: Map<string, StringNode[]>
) => {
  let customGenerateKey = (fakerjs: typeof faker) =>
    `G_K_${fakerjs.random.alphaNumeric(5)}`;
  if (keyName in keyReducers) {
    customGenerateKey = keyReducers[keyName];
  }

  const cacheKey = `${keyName}`;
  // console.log({ cacheKey });
  let keyValue;
  if (!keyMap.has(cacheKey)) {
    keyValue = customGenerateKey(faker);
  } else {
    const previouslyGeneratedKeys = keyMap.get(cacheKey) as StringNode[];
    const ancestorKeys = previouslyGeneratedKeys.filter(n => n.depth <= depth);
    keyValue = faker.random.arrayElement(ancestorKeys).value;
  }
  const previousValues = keyMap.get(cacheKey);
  if (previousValues) {
    keyMap.set(cacheKey, [...previousValues, { value: keyValue, depth }]);
  } else {
    keyMap.set(cacheKey, [{ value: keyValue, depth }]);
  }

  return keyValue;
};

const isVar = (s: string) => {
  return s.startsWith("{") && s.endsWith("}");
};

const generateValues = async (
  flatSchemaValues: any,
  keys: string[],
  depth: number,
  keyMap: Map<string, StringNode[]>
) => {
  // let values = [];
  let values = await chunkAndParallelize(flatSchemaValues.length, async i => {
    const valTypeOrReferenceOrMethod = flatSchemaValues[i];
    let generatedValue;
    if (typeof valTypeOrReferenceOrMethod === "function") {
      generatedValue = valTypeOrReferenceOrMethod(faker, keys[i]);
    } else if (isVar(valTypeOrReferenceOrMethod)) {
      generatedValue = generateKey(
        valTypeOrReferenceOrMethod,
        depth + 1,
        {},
        keyMap
      );
    } else {
      switch (valTypeOrReferenceOrMethod) {
        case "number": {
          generatedValue = faker.random.number();
          break;
        }
        case "string": {
          generatedValue = faker.random.words(2);
          break;
        }
        case "boolean": {
          generatedValue = faker.random.boolean();
          break;
        }
        case "timestamp": {
          generatedValue = faker.date.future(1, new Date(2018)).getTime();
          break;
        }
        default: {
          generatedValue = valTypeOrReferenceOrMethod;
        }
      }
    }
    return generatedValue;
  });
  return values;
};
const generateKeys = async (
  flatSchemaKeys: string[],
  keyReducers: any,
  keyMap: Map<string, StringNode[]>
) => {
  const leafCount = flatSchemaKeys.length;
  const keys = [];
  for (let i = 0; i < leafCount; i += 1) {
    const key = flatSchemaKeys[i];
    const parsedPath = key
      .split(".")
      .map((s, i) => ({ value: s, depth: i }))
      .map(val => ({ isVar: isVar(val.value), ...val }));
    const interpretedPath = [];
    for (let val of parsedPath) {
      const { isVar, value, depth } = val;
      if (isVar) {
        const path = await generateKey(value, depth, keyReducers, keyMap);
        interpretedPath.push(path);
      } else {
        interpretedPath.push(value);
      }
    }
    keys.push(interpretedPath.join("."));
  }
  return keys;
};
export const generateData = async (schema: any, keyReducers = {}) => {
  const keyMap = new Map() as Map<string, StringNode[]>;
  const flatSchema = flatten(schema);
  const flatSchemaKeys = Object.keys(flatSchema);
  const flatSchemaValues = Object.values(flatSchema);
  const depth = flatSchemaKeys.reduce(
    (acc, cur) => Math.max(acc, cur.split(".").length),
    0
  );

  const keys = await generateKeys(flatSchemaKeys, keyReducers, keyMap);

  const values = await generateValues(flatSchemaValues, keys, depth, keyMap);

  const tree = keys.reduce((acc, cur, i) => {
    set(acc, cur, values[i]);
    return acc;
  }, {});
  return { keys, values, tree };
};

export const generateJsonDefaultArgs = {
  schema: {} as any,
  keyReducers: {} as any,
  count: 1 as any
} as GenerateJsonArgs;

export type GenerateJsonArgs = {
  schema: any;
  keyReducers?: any;
  count?: number;
};

export const generateJson = async ({
  schema = {},
  keyReducers = {},
  count = 1
} = generateJsonDefaultArgs) => {
  let jsonKeys = [] as string[];
  let jsonValues = [] as any[];
  let jsonTree = {};
  for (let i = 0; i < count; i += 1) {
    const { keys, values, tree } = await generateData(schema, keyReducers);
    jsonKeys = [...keys, ...jsonKeys];
    jsonValues = [...values, ...jsonValues];
    jsonTree = {
      ...jsonTree,
      ...tree
    };
  }
  return { keys: jsonKeys, values: jsonValues, tree: jsonTree };
};
