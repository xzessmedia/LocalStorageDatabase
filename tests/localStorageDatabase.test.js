"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
describe('Database tests', () => {
    it('Can we create a database', () => {
        let t_db;
        /* detect retina */
        (0, chai_1.expect)(options.detectRetina).to.be.false; // Do I need to explain anything? It's like writing in English!
        /* fps limit */
        (0, chai_1.expect)(options.fpsLimit).to.equal(30); // As I said 3 lines above
        (0, chai_1.expect)(options.interactivity.modes.emitters).to.be.empty; // emitters property is an array and for this test must be empty, this syntax works with strings too
        (0, chai_1.expect)(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#fff"); // this is a little more complex, but still really clear
    });
});
