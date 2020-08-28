const getCheapestShipment = require("./solution");

test("Order can be shipped using one warehouse", () => {
  expect(
    getCheapestShipment({ apple: 1 }, [
      { name: "owd", inventory: { apple: 1 } },
    ])
  ).toStrictEqual([{ owd: { apple: 1 } }]);
});

test("Order can be shipped using multiple warehouses", () => {
  expect(
    getCheapestShipment({ apple: 10 }, [
      { name: "owd", inventory: { apple: 5 } },
      { name: "dm", inventory: { apple: 5 } },
    ])
  ).toStrictEqual([{ owd: { apple: 5 } }, { dm: { apple: 5 } }]);
});

test("Order cannot be shipped because there is not enough inventory", () => {
  expect(
    getCheapestShipment({ apple: 1 }, [
      { name: "owd", inventory: { apple: 0 } },
    ])
  ).toStrictEqual([]);
});

test("Order cannot be shipped because there is not enough inventory", () => {
  expect(
    getCheapestShipment({ apple: 2 }, [
      { name: "owd", inventory: { apple: 1 } },
    ])
  ).toStrictEqual([]);
});

test("Order cannot be shipped because there is not enough inventory", () => {
  expect(
    getCheapestShipment({ apple: 2, banana: 1 }, [
      { name: "owd", inventory: { apple: 2 } },
    ])
  ).toStrictEqual([]);
});

test("Order cannot be shipped because there is not enough inventory", () => {
  expect(
    getCheapestShipment({ apple: 2, banana: 3 }, [
      { name: "owd", inventory: { apple: 2, banana: 2 } },
    ])
  ).toStrictEqual([]);
});

test("Order can be shipped using different warehouse", () => {
  expect(
    getCheapestShipment({ apple: 1, banana: 1 }, [
      { name: "owd", inventory: { apple: 1, orange: 1 } },
      { name: "dm", inventory: { banana: 1, orange: 1 } },
    ])
  ).toStrictEqual([{ owd: { apple: 1 } }, { dm: { banana: 1 } }]);
});

test("Order with of an item with 0 units", () => {
  expect(
    getCheapestShipment({ apple: 0 }, [
      { name: "owd", inventory: { apple: 1, orange: 1 } },
      { name: "dm", inventory: { banana: 1, orange: 1 } },
    ])
  ).toStrictEqual([]);
});

test("Order with of an item with 0 units", () => {
  expect(
    getCheapestShipment({ apple: 0, banana: 1, orange: 2 }, [
      { name: "owd", inventory: { apple: 1, orange: 1 } },
      { name: "dm", inventory: { banana: 1, orange: 1 } },
    ])
  ).toStrictEqual([{ dm: { banana: 1, orange: 1 } }, { owd: { orange: 1 } }]);
});

test("Order can be shipped with of multiple warehouses", () => {
  expect(
    getCheapestShipment({ apple: 5, banana: 5, orange: 5 }, [
      { name: "owd", inventory: { apple: 5, orange: 10 } },
      { name: "dm", inventory: { banana: 5, orange: 10 } },
    ])
  ).toStrictEqual([{ owd: { apple: 5, orange: 5 } }, { dm: { banana: 5 } }]);
});

test("Order can be shipped across a lot of different warehouses", () => {
  expect(
    getCheapestShipment({ apple: 10 }, [
      { name: "owd", inventory: { apple: 1, orange: 10 } },
      { name: "dm", inventory: { apple: 2, orange: 10 } },
      { name: "best", inventory: { apple: 5, orange: 10 } },
      { name: "okay", inventory: { apple: 3, orange: 10 } },
      { name: "bad", inventory: { apple: 2, orange: 10 } },
    ])
  ).toStrictEqual([
    { owd: { apple: 1 } },
    { dm: { apple: 2 } },
    { best: { apple: 5 } },
    { okay: { apple: 2 } },
  ]);
});

test("Order can be shipped across multiple warehouses", () => {
  expect(
    getCheapestShipment({ apple: 10, banana: 10, orange: 10 }, [
      { name: "owd", inventory: { orange: 10 } },
      { name: "dm", inventory: { apple: 10 } },
      { name: "best", inventory: { banana: 10 } },
    ])
  ).toStrictEqual([
    { dm: { apple: 10 } },
    { best: { banana: 10 } },
    { owd: { orange: 10 } },
  ]);
});

test("Order cannot be shipped because not enough inventory", () => {
  expect(
    getCheapestShipment({ apple: 15 }, [
      { name: "owd", inventory: { apple: 1, orange: 10 } },
      { name: "dm", inventory: { apple: 2, orange: 10 } },
      { name: "best", inventory: { apple: 5, orange: 10 } },
      { name: "okay", inventory: { apple: 3, orange: 10 } },
      { name: "bad", inventory: { apple: 2, orange: 10 } },
    ])
  ).toStrictEqual([]);
});

test("Order can be shipped from first warehouse rather than from multiple", () => {
  expect(
    getCheapestShipment({ orange: 7 }, [
      { name: "owd", inventory: { apple: 1, orange: 10 } },
      { name: "dm", inventory: { apple: 2, orange: 10 } },
    ])
  ).toStrictEqual([{ owd: { orange: 7 } }]);
});
