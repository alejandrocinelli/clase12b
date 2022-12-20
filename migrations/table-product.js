import knex from "knex";

const config = {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "mydb",
    },
    pool: { min: 0, max: 7 },
  };
  
  const database = knex(config);

  const createTable = async () => {
    try {
        await database.schema.dropTableIfExists("product");
        await database.schema.createTable("product", (productTable) => {
            productTable.increments("id").primary();
            productTable.string("title", 100).notNullable();
            productTable.integer("price", 100).notNullable();
            productTable.string("thumbnail", 100).notNullable();
        });   
        console.log("Table created");
        database.destroy();

    } catch (error) {
        console.log(error);
        database.destroy();
        
    }
}

createTable();