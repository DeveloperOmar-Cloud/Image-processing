describe("endpoint tests", () => {
  it("should return 200", async () => {
    const response = await fetch("http://localhost:3000/api");
    expect(response.status).toBe(200);
  });
});
