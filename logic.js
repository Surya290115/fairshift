// Pure business rules for FairShift (no DOM) so they can be unit tested.
(function (root) {
  const BASE_HOURS = 8;
  /** Weekly pay breakdown. hours = 7 daily values, rate = Rs/hour, otMult = overtime multiplier. */
  function calc(hours, rate, otMult) {
    const tot = hours.reduce((s, v) => s + v, 0);
    const ot = hours.reduce((s, v) => s + Math.max(0, v - BASE_HOURS), 0);
    const reg = tot - ot, b = reg * rate, o = ot * rate * otMult, g = b + o;
    const pf = g * 0.12, esi = g * 0.0075;
    return { tot, ot, reg, r: rate, b, o, pf, esi, net: g - pf - esi };
  }
  /** Fatigue flags: 11h+ day, 7 working days in a row, more than 60h a week. */
  function fatigue(hours) {
    const f = [];
    if (hours.some(v => v >= 11)) f.push("11h+ day");
    let run = 0, max = 0;
    hours.forEach(v => { run = v > 0 ? run + 1 : 0; max = Math.max(max, run); });
    if (max >= 7) f.push("7 days straight");
    if (hours.reduce((s, v) => s + v, 0) > 60) f.push(">60h/week");
    return f;
  }
  /** Risk of leaving, 0-100. avg = average anonymous feedback rating (1-5). */
  function risk({ ot, flags, open, avg }) {
    return Math.max(0, Math.min(100, Math.round(ot * 4 + flags * 15 + open * 20 + (5 - avg) * 8)));
  }
  const api = { calc, fatigue, risk };
  if (typeof module !== "undefined") module.exports = api; else root.Logic = api;
})(this);
