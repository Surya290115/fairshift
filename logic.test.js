const test = require("node:test"), assert = require("node:assert");
const L = require("./logic.js");
test("overtime counts hours above 8 per day", () => {
  const c = L.calc([9, 8, 10, 0, 0, 0, 0], 100, 1.5);
  assert.equal(c.tot, 27); assert.equal(c.ot, 3); assert.equal(c.reg, 24);
});
test("net pay applies overtime multiplier and deductions", () => {
  const c = L.calc([10, 0, 0, 0, 0, 0, 0], 100, 1.5);   // 8h*100 + 2h*150 = 1100
  assert.equal(c.b + c.o, 1100);
  assert.ok(Math.abs(c.net - 1100 * (1 - 0.12 - 0.0075)) < 1e-9);
});
test("no work means zero pay", () => assert.equal(L.calc([0, 0, 0, 0, 0, 0, 0], 100, 1.5).net, 0));
test("fatigue: normal week has no flags", () => assert.deepEqual(L.fatigue([8, 8, 8, 8, 8, 0, 0]), []));
test("fatigue: long day, 7 straight days and 60h+ are flagged", () =>
  assert.deepEqual(L.fatigue([12, 12, 12, 11, 12, 12, 12]), ["11h+ day", "7 days straight", ">60h/week"]));
test("risk rises with overtime, flags and open complaints", () => {
  const low = L.risk({ ot: 0, flags: 0, open: 0, avg: 5 });
  const high = L.risk({ ot: 10, flags: 2, open: 1, avg: 2 });
  assert.equal(low, 0); assert.ok(high > low);
});
test("risk is capped at 100", () => assert.equal(L.risk({ ot: 99, flags: 3, open: 5, avg: 1 }), 100));
