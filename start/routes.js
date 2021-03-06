"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use("Route");

Route.group(() => {
  Route.post("login", "AuthController.login");
  Route.resource("users", "UserController")
    .except(["index", "create", "edit"])
    .middleware(
      new Map([[["users.show", "users.update", "users.destroy"], ["auth:jwt"]]])
    )
    .validator(
      new Map([
        [["users.store"], ["StoreUser"]],
        [["users.update"], ["UpdateUser"]]
      ])
    );
  Route.resource("stories", "StoryController")
    .apiOnly()
    .middleware("auth:jwt");
}).prefix("api/v1");
