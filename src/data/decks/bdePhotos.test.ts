import { describe, expect, it } from "vitest";
import { bdeStanislasDeck } from "./bdeStanislas";
import { bdePhotoSources } from "./bdePhotos";

describe("BDE Stanislas photo collection", () => {
  const slideImages = bdeStanislasDeck.slides.flatMap((slide) =>
    (slide.blocks ?? []).filter((block) => block.type === "image"),
  );

  it("uses every one of the 23 source photos exactly once", () => {
    const usedSources = slideImages.map((image) => image.src);

    expect(bdePhotoSources).toHaveLength(23);
    expect(usedSources).toHaveLength(23);
    expect(new Set(usedSources).size).toBe(23);
    expect(new Set(usedSources)).toEqual(new Set(bdePhotoSources));
  });

  it("places at most three collection photos on each slide", () => {
    for (const slide of bdeStanislasDeck.slides) {
      expect((slide.blocks ?? []).filter((block) => block.type === "image").length).toBeLessThanOrEqual(3);
    }
  });
});