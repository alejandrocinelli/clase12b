import knex from "knex";

class Contenedor {
  constructor(databaseConfig, tableName) {
    this.database = knex(databaseConfig);
    this.table = tableName;
    }

async save (document) {
    try {
        const response = await this.database(this.table).insert(document);
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

async getAll () {
    try {
        const response = await this.database(this.table).select("*");
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

async getById (id) {
    try {
        const response = await this.database
        .from(this.table)
        .select("*")
        .where({ id });
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

async deleteById (id) {
    try {
        const response = await this.database(this.table).del().where({ id });

        return response;
    }
    catch (err) {
        console.log(err);
    }
}

async deleteAll() {
    try {
      await this.database(this.table).del();
    } catch (err) {
      throw new Error(`Error al escribir: ${err}`);
    }
  }

}

export default Contenedor;
