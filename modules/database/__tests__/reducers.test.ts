import { reducers } from "../src/reducers";
describe("reducers", () => {
  test("exist", () => {
    expect(reducers).toBeTruthy();
  });
  test("work", () => {
    expect(reducers.setIsLoading(true)({ isLoading: false } as any)).toEqual({
      isLoading: true
    });
    expect(reducers.setPath("posts")({} as any)).toEqual({
      path: "posts"
    });
    expect(reducers.setValue("posts")({} as any)).toEqual({
      value: "posts"
    });
    expect(reducers.addKeyToList("a")({} as any)).toEqual({
      value: ["a"]
    });
    expect(reducers.addKeyToList("a")({ value: [] } as any)).toEqual({
      value: ["a"]
    });
    expect(reducers.addKeyToList("b")({ value: ["a"] } as any)).toEqual({
      value: ["a", "b"]
    });
    expect(reducers.prependKeyToList("c")({ value: ["a"] } as any)).toEqual({
      value: ["c", "a"]
    });

    expect(reducers.addToList("VAL", "KEY")({} as any).value).toEqual([
      {
        data: "VAL",
        key: "KEY"
      }
    ]);
    expect(
      reducers.prependToList("VAL", "KEY")({
        value: [{ data: "d", key: "k" }]
      } as any).value
    ).toEqual([
      {
        data: "VAL",
        key: "KEY"
      },
      { data: "d", key: "k" }
    ]);
  });
});
