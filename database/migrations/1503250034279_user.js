"use strict";

const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table
        .string("username", 15)
        .notNullable()
        .unique();
      table
        .string("email", 255)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
