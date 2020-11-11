define({ "api": [
  {
    "type": "post",
    "url": "/confirm",
    "title": "Confirm user email address",
    "version": "0.1.0",
    "name": "confirmEmail",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token emailed to user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Email address confirmed.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/roots.routes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/forgot",
    "title": "Request password reset email with token",
    "version": "0.1.0",
    "name": "forgotPassword",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of user password to reset.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Confirm email has been sent.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/roots.routes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/reset",
    "title": "Reset user password",
    "version": "0.1.0",
    "name": "forgotPassword",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of user password to reset.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Confirm email has been sent.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/roots.routes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "User login to retrieve JWT",
    "version": "0.1.0",
    "name": "login",
    "group": "Authentication",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Primary key of the created thing.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token for authentication.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/roots.routes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register a new user",
    "version": "0.1.0",
    "name": "registerUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User first name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User last name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Plain text user password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User JSON array.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.id",
            "description": "<p>Primary key id for user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.firstName",
            "description": "<p>User first name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.lastName",
            "description": "<p>User last name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>User email address.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/roots.routes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/confirm-email-tokens",
    "title": "Create a new token for confirming an email address.",
    "name": "createOne",
    "group": "ConfirmEmailTokens",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>ConfirmEmailToken primary key id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "UserId",
            "description": "<p>Foreign key of user associated to token.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to use for confirming users email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiration",
            "description": "<p>The expiration date for the confirm email token.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/confirmEmailToken.routes.js",
    "groupTitle": "ConfirmEmailTokens"
  },
  {
    "type": "delete",
    "url": "/confirm-email-tokens",
    "title": "Delete all expired confirm email tokens.",
    "name": "destroyOne",
    "group": "ConfirmEmailTokens",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "count",
            "description": "<p>A count of the confirm email tokens destroyed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/confirmEmailToken.routes.js",
    "groupTitle": "ConfirmEmailTokens"
  },
  {
    "type": "delete",
    "url": "/confirm-email-tokens/:id",
    "title": "Destroy confirm email token for a given primary key id.",
    "name": "destroyOne",
    "group": "ConfirmEmailTokens",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>ConfirmEmailToken primary key ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "count",
            "description": "<p>A count of the confirm email tokens destroyed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/confirmEmailToken.routes.js",
    "groupTitle": "ConfirmEmailTokens"
  },
  {
    "type": "get",
    "url": "/confirm-email-tokens",
    "title": "Request all confirm email tokens.",
    "name": "readAll",
    "group": "ConfirmEmailTokens",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": true,
            "field": "limit",
            "description": "<p>Optional limit to query. Will default to 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": true,
            "field": "offset",
            "description": "<p>Optional pagination offset based on limit. Will default to 0</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "where",
            "description": "<p>Optional query filter.</p> <p>// TODO: This isn't right</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>ConfirmEmailToken primary key id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "UserId",
            "description": "<p>Foreign key of user associated to token.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to use for confirming users email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiration",
            "description": "<p>The expiration date for the confirm email token.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/confirmEmailToken.routes.js",
    "groupTitle": "ConfirmEmailTokens"
  },
  {
    "type": "get",
    "url": "/confirm-email-tokens/:id",
    "title": "Request a specific confirm email token with a primary key id.",
    "name": "readOne",
    "group": "ConfirmEmailTokens",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>ConfirmEmailToken primary key ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>ConfirmEmailToken primary key id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "UserId",
            "description": "<p>Foreign key of user associated to token.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to use for confirming users email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiration",
            "description": "<p>The expiration date for the confirm email token.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/confirmEmailToken.routes.js",
    "groupTitle": "ConfirmEmailTokens"
  },
  {
    "type": "put",
    "url": "/confirm-email-tokens/:id",
    "title": "Update confirm email token with a primary key id.",
    "name": "updateOne",
    "group": "ConfirmEmailTokens",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>ConfirmEmailToken primary key ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>ConfirmEmailToken primary key id.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "UserId",
            "description": "<p>Foreign key of user associated to token.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token to use for confirming users email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiration",
            "description": "<p>The expiration date for the confirm email token.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/confirmEmailToken.routes.js",
    "groupTitle": "ConfirmEmailTokens"
  },
  {
    "type": "get",
    "url": "/",
    "title": "API       Home endpoint",
    "version": "0.1.0",
    "name": "home",
    "group": "Home",
    "filename": "src/routes/roots.routes.js",
    "groupTitle": "Home"
  },
  {
    "type": "post",
    "url": "/reset-tokens/:id",
    "title": "Request create Thing.",
    "name": "createOne",
    "group": "ResetTokens",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>ResetTokens primary key ID.</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Reset token primary key id.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "UserId",
            "description": "<ul> <li>Foreign key of user associated to reset token.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<ul> <li>JSON Web Token for user password reset.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiration",
            "description": "<ul> <li>The date the reset token will expire.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isUsed",
            "description": "<ul> <li>Has the reset token already been used.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/resetTokens.routes.js",
    "groupTitle": "ResetTokens"
  },
  {
    "type": "delete",
    "url": "/reset-tokens",
    "title": "Request delete Thing.",
    "name": "destroyOne",
    "group": "ResetTokens",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "count",
            "description": "<ul> <li>A count of the reset tokens destroyed.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/resetTokens.routes.js",
    "groupTitle": "ResetTokens"
  },
  {
    "type": "delete",
    "url": "/reset-tokens/:id",
    "title": "Request delete Thing.",
    "name": "destroyOne",
    "group": "ResetTokens",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>ResetTokens primary key ID.</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "count",
            "description": "<ul> <li>A count of the reset tokens destroyed.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/resetTokens.routes.js",
    "groupTitle": "ResetTokens"
  },
  {
    "type": "get",
    "url": "/reset-tokens",
    "title": "Request read all things.",
    "name": "readAll",
    "group": "ResetTokens",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Reset token primary key id.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "UserId",
            "description": "<ul> <li>Foreign key of user associated to reset token.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<ul> <li>JSON Web Token for user password reset.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiration",
            "description": "<ul> <li>The date the reset token will expire.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isUsed",
            "description": "<ul> <li>Has the reset token already been used.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/resetTokens.routes.js",
    "groupTitle": "ResetTokens"
  },
  {
    "type": "get",
    "url": "/reset-tokens/:id",
    "title": "Request Thing information",
    "name": "readOne",
    "group": "ResetTokens",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>ResetTokens primary key ID.</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Reset token primary key id.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "UserId",
            "description": "<ul> <li>Foreign key of user associated to reset token.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<ul> <li>JSON Web Token for user password reset.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiration",
            "description": "<ul> <li>The date the reset token will expire.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isUsed",
            "description": "<ul> <li>Has the reset token already been used.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/resetTokens.routes.js",
    "groupTitle": "ResetTokens"
  },
  {
    "type": "put",
    "url": "/reset-tokens/:id",
    "title": "Request Thing update.",
    "name": "updateOne",
    "group": "ResetTokens",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>ResetTokens primary key ID.</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Reset token primary key id.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "UserId",
            "description": "<ul> <li>Foreign key of user associated to reset token.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<ul> <li>JSON Web Token for user password reset.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiration",
            "description": "<ul> <li>The date the reset token will expire.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isUsed",
            "description": "<ul> <li>Has the reset token already been used.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/resetTokens.routes.js",
    "groupTitle": "ResetTokens"
  },
  {
    "type": "post",
    "url": "/things/:id",
    "title": "Create Thing",
    "name": "createOne",
    "group": "Things",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Thing primary key ID.</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Primary key of the created thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<ul> <li>Name of the thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<ul> <li>Description of the thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "price",
            "description": "<ul> <li>Price of the thing.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/things.routes.js",
    "groupTitle": "Things"
  },
  {
    "type": "delete",
    "url": "/things/:id",
    "title": "Delete a Thing",
    "name": "destroyOne",
    "group": "Things",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Thing primary key ID.</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<ul> <li>Name of the thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<ul> <li>Description of the thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "price",
            "description": "<ul> <li>Price of the thing.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/things.routes.js",
    "groupTitle": "Things"
  },
  {
    "type": "get",
    "url": "/things/",
    "title": "Read all Things",
    "name": "readAll",
    "group": "Things",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Primary key of the created thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<ul> <li>Name of the thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<ul> <li>Description of the thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "price",
            "description": "<ul> <li>Price of the thing.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/things.routes.js",
    "groupTitle": "Things"
  },
  {
    "type": "get",
    "url": "/things/:id",
    "title": "Read a Thing",
    "name": "readOne",
    "group": "Things",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Thing primary key ID.</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<ul> <li>Name of the thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<ul> <li>Description of the thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "price",
            "description": "<ul> <li>Price of the thing.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/things.routes.js",
    "groupTitle": "Things"
  },
  {
    "type": "put",
    "url": "/things/:id",
    "title": "Update a Thing",
    "name": "updateOne",
    "group": "Things",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Thing primary key ID.</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<ul> <li>Name of the thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<ul> <li>Description of the thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Double",
            "optional": false,
            "field": "price",
            "description": "<ul> <li>Price of the thing.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/things.routes.js",
    "groupTitle": "Things"
  },
  {
    "type": "post",
    "url": "/users/:id",
    "title": "Request create User.",
    "name": "createOne",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>User primary key ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>User primary key</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<ul> <li>Name of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<ul> <li>Name of the Thing</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "salt",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastLogin",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "status",
            "description": "<ul> <li>The price of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "role",
            "description": "<ul> <li>The users role.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isEmailConfirmed",
            "description": "<ul> <li>Has the user confirmed there email address.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Request delete User.",
    "name": "destroyOne",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>User primary key ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>User primary key</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<ul> <li>Name of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<ul> <li>Name of the Thing</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "salt",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastLogin",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "status",
            "description": "<ul> <li>The price of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "role",
            "description": "<ul> <li>The users role.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isEmailConfirmed",
            "description": "<ul> <li>Has the user confirmed there email address.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "Request read all Users.",
    "name": "readAll",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>User primary key</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<ul> <li>Name of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<ul> <li>Name of the Thing</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "salt",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastLogin",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "status",
            "description": "<ul> <li>The price of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "role",
            "description": "<ul> <li>The users role.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isEmailConfirmed",
            "description": "<ul> <li>Has the user confirmed there email address.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Request User information.",
    "name": "readOne",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>User primary key ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>User primary key</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<ul> <li>Name of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<ul> <li>Name of the Thing</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "salt",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastLogin",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "status",
            "description": "<ul> <li>The price of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "role",
            "description": "<ul> <li>The users role.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isEmailConfirmed",
            "description": "<ul> <li>Has the user confirmed there email address.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Request User update.",
    "name": "updateOne",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<p>User primary key ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>User primary key</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<ul> <li>Name of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<ul> <li>Name of the Thing</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "salt",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastLogin",
            "description": "<ul> <li>Description of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "status",
            "description": "<ul> <li>The price of the Thing.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "role",
            "description": "<ul> <li>The users role.</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isEmailConfirmed",
            "description": "<ul> <li>Has the user confirmed there email address.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  }
] });
