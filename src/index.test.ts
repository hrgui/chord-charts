import { allChords, tranposeChord, transpose, uniqueChords } from "./index";

const amazingGraceInput = `
D            G          D
Amazing Grace, how sweet the sound,
A7
That saved a wretch like me.
D                G       D
I once was lost, but now im found,
        A7     D
Was blind, but now I see.
`;

describe("allChords", () => {
  it("should be able to extract all the chords from a string unsorted", () => {
    expect(allChords(amazingGraceInput)).toMatchInlineSnapshot(`
      [
        "D",
        "G",
        "D",
        "A7",
        "D",
        "G",
        "D",
        "A7",
        "D",
      ]
    `);
  });

  it("should be able to extract all the chords from a string sorted", () => {
    expect(allChords(amazingGraceInput, { sort: true })).toMatchInlineSnapshot(`
      [
        "A7",
        "A7",
        "D",
        "D",
        "D",
        "D",
        "D",
        "G",
        "G",
      ]
    `);
  });
});

describe("uniqueChords", () => {
  it("should return all the unique chords", () => {
    expect(uniqueChords(amazingGraceInput)).toMatchInlineSnapshot(`
      [
        "D",
        "G",
        "A7",
      ]
    `);
  });
});

describe("transpose", () => {
  it("should be able to transpose a song down a key", () => {
    expect(transpose(amazingGraceInput, "D", "C")).toMatchInlineSnapshot(`
      "
      C            F          C
      Amazing Grace, how sweet the sound,
      G7
      That saved a wretch like me.
      C                F       C
      I once was lost, but now im found,
              G7     C
      Was blind, but now I see.
      "
    `);
  });

  it("should be able to transpose a song down a key with ghost notes, pipes, slash notes", () => {
    expect(
      transpose(
        `
  G/B | D | (G)
  `,
        "G",
        "C"
      )
    ).toMatchInlineSnapshot(`
      "
        C/E | G | (C)
        "
    `);
  });
});

describe("tranposeChord", () => {
  it("should be able to tranpose a slash chord", () => {
    expect(tranposeChord("D/F#", "D", "G")).toMatchInlineSnapshot(`"G/B"`);
  });

  it("should be able to tranpose Am (C) to Em (G)", () => {
    expect(tranposeChord("Am", "C", "G")).toMatchInlineSnapshot(`"Em"`);
  });

  it("should be able to tranpose Am (C) to Gm (Bb)", () => {
    expect(tranposeChord("Am", "C", "Bb")).toMatchInlineSnapshot(`"Gm"`);
  });

  it("all of Am tranpositions", () => {
    expect(tranposeChord("Am", "C", "D")).toMatchInlineSnapshot(`"Bm"`);
    expect(tranposeChord("Am", "C", "D#")).toMatchInlineSnapshot(`"Cm"`);
    expect(tranposeChord("Am", "C", "Eb")).toMatchInlineSnapshot(`"Cm"`);
    expect(tranposeChord("Am", "C", "E")).toMatchInlineSnapshot(`"C#m"`);
    expect(tranposeChord("Am", "C", "F")).toMatchInlineSnapshot(`"Dm"`);
    expect(tranposeChord("Am", "C", "G")).toMatchInlineSnapshot(`"Em"`);
    expect(tranposeChord("Am", "C", "G#")).toMatchInlineSnapshot(`"Fm"`);
    expect(tranposeChord("Am", "C", "Ab")).toMatchInlineSnapshot(`"Fm"`);
    expect(tranposeChord("Am", "C", "A")).toMatchInlineSnapshot(`"F#m"`);
    expect(tranposeChord("Am", "C", "A#")).toMatchInlineSnapshot(`"Gm"`);
    expect(tranposeChord("Am", "C", "Bb")).toMatchInlineSnapshot(`"Gm"`);
    expect(tranposeChord("Am", "C", "B")).toMatchInlineSnapshot(`"G#m"`);
    expect(tranposeChord("Am", "C", "C")).toMatchInlineSnapshot(`"Am"`);
    expect(tranposeChord("Am", "C", "C#")).toMatchInlineSnapshot(`"A#m"`);
    expect(tranposeChord("Am", "C", "Db")).toMatchInlineSnapshot(`"Bbm"`);
  });
});
