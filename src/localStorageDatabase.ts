/**
 *  LocalStorageDatabase
 *  Creates a database like layer on the localstorage
 */
const storage = require('localStorage');

export type LocalDatabaseData<T> = {
    DatabaseName: string,
    Rows: Array<T>
}

export type LocalDatabaseChangeResult = {
    Index?: number
    Obj?: object,
    Value?: any,
    ValueBefore?: any,
    Rows?: Array<any>,
    RowCount?: number,
    RowCountBefore?: number,
    Result?: Array<any>,
    IsEmpty?: boolean,
    IsFailed?: boolean,
    WasSuccessful?: boolean
}

export class LocalStorageDatabase<T> {
    _data: LocalDatabaseData<T>;
    constructor(database: string) {
        this._data = {
            DatabaseName: database,
            Rows: new Array<T>()
        };
    }

    GetRowIndex(index: number) {
        return this._data.Rows[index];
    }

    GetRows() {
        return this._data.Rows;
    }

    Insert(item: T): LocalDatabaseChangeResult {
        let t_rowcount = this._data.Rows.length;
        this._data.Rows.push(item);
        this.SaveChanges();

        return {
            Obj: <object> item,
            Index: (this._data.Rows.length-1),
            RowCount: this._data.Rows.length,
            RowCountBefore: t_rowcount
        }
    }

    Update(index: number, item: T): LocalDatabaseChangeResult {
        let t_oldvalue = this._data.Rows[index];
        this._data.Rows[index] = item;
        this.SaveChanges();
        return {
            Value: <object> item,
            ValueBefore: t_oldvalue,
            Index: index,
            RowCount: this._data.Rows.length
        }
    }

    Delete(rowId: number): LocalDatabaseChangeResult {
        let t_oldcount = this._data.Rows.length;

        this._data.Rows = this._data.Rows.filter((val, index) => {
            return rowId !== index;
        })
        this.SaveChanges();
        return {
            RowCount: this._data.Rows.length,
            RowCountBefore:  t_oldcount
        }
    }

    Clear(): LocalDatabaseChangeResult {
        let t_oldcount = this._data.Rows.length;
        this._data.Rows = [];
        this.SaveChanges();
        return {
            RowCount: this._data.Rows.length,
            RowCountBefore:  t_oldcount
        }
    }

    DeleteItem(item: T) {
        this._data.Rows = this._data.Rows.filter((val, index) => {
            return val !== item;
        })
        this.SaveChanges();
    }

    static Init<T>(database: string) {
        return this.Load<T>(database);
    }

    LoadStorage(data: LocalDatabaseData<T>) {
        this._data = data;
    }

    protected static Load<T>(database: string): LocalStorageDatabase<T> {
       // we add the storage for cases we
       let t_raw:string | null = null;
        t_raw = LocalStorageDatabase.GetStorage().getItem(`LocalDB_${database}`);

       if (t_raw !== null) {
           let t_obj =  <LocalDatabaseData<T>> JSON.parse(t_raw);
           let t_instance = new LocalStorageDatabase<T>(t_obj.DatabaseName);

           if (t_obj !== null) {
               t_instance.LoadStorage(t_obj);
                return t_instance;
           } else {
               return LocalStorageDatabase.CreateNewDatabase(database);
           }
       } else {
            return LocalStorageDatabase.CreateNewDatabase(database);
       }

    }
    SaveChanges() {
        LocalStorageDatabase.GetStorage().setItem(`LocalDB_${this._data.DatabaseName}`, JSON.stringify(this._data));
    }

    static GetStorage() {
        if (typeof window !== 'undefined') {
            return localStorage;
        } else {
            return storage;
        }
    }

    static CreateNewDatabase<T>(database: string) {
        let t_db = new LocalStorageDatabase<T>(database);
        t_db.SaveChanges();
        return t_db;
    }
}