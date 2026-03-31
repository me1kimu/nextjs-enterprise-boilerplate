describe("patched ip public/private address selection", () => {
  afterEach(() => {
    jest.resetModules()
    jest.dontMock("os")
  })

  it("returns public addresses for public and private addresses for private", () => {
    jest.doMock("os", () => ({
      networkInterfaces: () => ({
        eth0: [
          { address: "10.0.0.10", family: "IPv4" },
          { address: "8.8.8.8", family: "IPv4" },
        ],
      }),
    }))

    const ip = require("ip")

    expect(ip.address("public")).toBe("8.8.8.8")
    expect(ip.address("private")).toBe("10.0.0.10")
  })
})
