import { expect } from 'chai';
import {LocalStorageDatabase} from "../src";

let t_record: any = null;

type TestModel = {
    Id: number,
    Title: string
}

describe('Database tests', () => { // the tests container
    it('Wipe old Databases', () => {
        const testDBName: string = 'TestDatabase';
        let t_db = LocalStorageDatabase.Init<TestModel>(testDBName);
        t_db.Clear();
        expect(t_db._data).to.be.an("object");
        expect(t_db._data).to.have.property("DatabaseName").to.equal(testDBName);
        expect(t_db._data).to.have.property("Rows");
    });
    it('Creating a database', () => { // the single test
        const testDBName: string = 'TestDatabase';
        let t_db = LocalStorageDatabase.Init<TestModel>(testDBName);
        expect(t_db._data).to.be.an("object");
        expect(t_db._data).to.have.property("DatabaseName").to.equal(testDBName);
        expect(t_db._data).to.have.property("Rows");
    });
    it('Adding new records', () => {
        const testDBName: string = 'TestDatabase';
        let t_db = LocalStorageDatabase.Init<TestModel>(testDBName);
        expect(t_db._data).to.be.an("object");
        expect(t_db._data).to.have.property("DatabaseName").to.equal(testDBName);
        expect(t_db._data).to.have.property("Rows");

        let t_obj = {
            Id: 1,
            Title: 'Test'
        }
        t_db.Insert(t_obj);

        let t_rows = t_db.GetRows();
        expect(t_rows).to.be.an('array').to.have.length(1);
    });
    it('Reading records', () => {
        const testDBName: string = 'TestDatabase';
        let t_db = LocalStorageDatabase.Init<TestModel>(testDBName);
        expect(t_db._data).to.be.an("object");
        expect(t_db._data).to.have.property("DatabaseName").to.equal(testDBName);
        expect(t_db._data).to.have.property("Rows");
        let t_rows = t_db.GetRows();
        expect(t_rows).to.be.an('array');
    });
    it('Modifying a record', () => {
        const testDBName: string = 'TestDatabase';
        let t_db = LocalStorageDatabase.Init<TestModel>(testDBName);
        expect(t_db._data).to.be.an("object");
        expect(t_db._data).to.have.property("DatabaseName").to.equal(testDBName);
        expect(t_db._data).to.have.property("Rows");
        let t_rows = t_db.GetRows();
        expect(t_rows.length).to.equal(1);

        t_db.Update(0 , {
            Id: 1,
            Title: 'Test updated'
        })

        let t_rec = t_db.GetRowIndex(0);
        expect(t_rec.Title).to.equal('Test updated');
    });
    it('Deleting a record', () => {
        const testDBName: string = 'TestDatabase';
        let t_db = LocalStorageDatabase.Init<TestModel>(testDBName);
        expect(t_db._data).to.be.an("object");
        expect(t_db._data).to.have.property("DatabaseName").to.equal(testDBName);
        expect(t_db._data).to.have.property("Rows");

        let t_rows = t_db.GetRows();
        expect(t_rows).to.be.an('array').to.have.length(1);

        t_db.Delete(0);

        t_rows = t_db.GetRows();
        expect(t_rows).to.be.an('array').to.have.length(0);
    });
});