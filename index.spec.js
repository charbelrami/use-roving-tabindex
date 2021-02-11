let elements;

beforeAll(async () => {
  await page.goto("http://localhost:3000");
  elements = await page.$$("div > [tabindex]");
});

describe("roving tabindex", () => {
  describe("consider 3 focusable elements contained in a composite", () => {
    describe("only one element", () => {
      it("should be included in the tab sequence, i.e., should have tabindex set to 0", async () => {
        expect(await elements[0].getAttribute("tabindex")).toBe("0");
      });
    });

    describe("all other elements", () => {
      it("should be excluded from the tab sequence, i.e., should have tabindex set to -1", async () => {
        expect(await elements[1].getAttribute("tabindex")).toBe("-1");
        expect(await elements[2].getAttribute("tabindex")).toBe("-1");
      });
    });

    describe("when focus is in the composite", () => {
      describe("the focused element", () => {
        beforeEach(async () => {
          await elements[2].focus();
        });

        it("should have tabindex set to 0", async () => {
          expect(await elements[2].getAttribute("tabindex")).toBe("0");
        });
      });

      describe("when using arrow keys to move focus within the composite", () => {
        beforeEach(async () => {
          await elements[0].focus();
          await elements[0].press("ArrowRight");
        });

        describe("the newly focused element", () => {
          it("should have tabindex set to 0", async () => {
            expect(await elements[1].getAttribute("tabindex")).toBe("0");
          });
        });

        describe("all other elements", () => {
          it("should have tabindex set to -1", async () => {
            expect(await elements[0].getAttribute("tabindex")).toBe("-1");
            expect(await elements[2].getAttribute("tabindex")).toBe("-1");
          });
        });
      });

      describe("if focus is on the first element", () => {
        beforeEach(async () => {
          await elements[0].focus();
        });

        describe("pressing ArrowRight", () => {
          beforeEach(async () => {
            await elements[0].press("ArrowRight");
          });

          it("should move focus to the next element", async () => {
            expect(await elements[0].getAttribute("tabindex")).toBe("-1");
            expect(await elements[1].getAttribute("tabindex")).toBe("0");
          });
        });

        describe("pressing ArrowLeft", () => {
          beforeEach(async () => {
            await elements[0].press("ArrowLeft");
          });

          it("should move focus to the last element", async () => {
            expect(await elements[0].getAttribute("tabindex")).toBe("-1");
            expect(await elements[2].getAttribute("tabindex")).toBe("0");
          });
        });
      });

      describe("if focus is on the last element", () => {
        beforeEach(async () => {
          await elements[2].focus();
        });

        describe("pressing ArrowRight", () => {
          beforeEach(async () => {
            await elements[2].press("ArrowRight");
          });

          it("should move focus to the first element", async () => {
            expect(await elements[2].getAttribute("tabindex")).toBe("-1");
            expect(await elements[0].getAttribute("tabindex")).toBe("0");
          });
        });

        describe("pressing ArrowLeft", () => {
          beforeEach(async () => {
            await elements[2].press("ArrowLeft");
          });

          it("should move focus to the previous element", async () => {
            expect(await elements[2].getAttribute("tabindex")).toBe("-1");
            expect(await elements[1].getAttribute("tabindex")).toBe("0");
          });
        });
      });
    });
  });
});
