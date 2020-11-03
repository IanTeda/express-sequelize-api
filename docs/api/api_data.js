define({ "api": [
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
    "title": "Request create Thing.",
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
    "title": "Request delete Thing.",
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
    "title": "Request read all things.",
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
    "title": "Request Thing information",
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
    "title": "Request Thing update.",
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
