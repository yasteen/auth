# Overview

[Kratos](https://github.com/ory/kratos) is an Identity and User Management system.

# Configuration

Make configurations in [`stack.env`](stack.env). If server-side rendering is selected,
UI return URLs can be further configured in [`config/kratos.yml`](config/kratos.yml)

# Usage

Kratos can be run simply with one command in the current directory.

```bash
./build.sh
```

## Customization

Use the following command to run Kratos without any other components.

```bash
> docker compose -f ./start.yml --env-file ./stack.env up --build --force-recreate
```

To add any of the other components available, simply append `-f [component].yml` into the command. As an example, Kratos uses [sqlite](https://github.com/sqlite/sqlite) as its database. To use postgres instead, run

```bash
> docker compose -f ./start.yml -f ./pg.yml --env-file ./stack.env up --build --force-recreate
```

## Available Components

-   [`start.yml`](start.yml) - Starts **Kratos** identity server - **REQUIRED**
-   [`pg.yml`](pg.yml) - Uses a Postgres database
-   [`mail.yml`](mail.yml) - Adds email capabilities to Kratos
-   [`fe.yml`](fe.yml) - Starts a simple front end (mostly for demo or testing purposes)

# Making Requests

In each HTTP request, `[VARIABLES]` of this form are to be substituted
depending on the context. The examples also use `https://example.com
as the base URL, and this should be substituted with the URL of your
hosted instance of Kratos.

## Login

### Step 1: Initialize Login Flow for Browsers

```
GET https://example.com:4433/self-service/login/browser
Accept: application/json
```

### Step 2: Make Sign-in Request

Make this request AFTER initializing a login flow.

```
POST https://example.com:4433/self-service/login?flow=[FLOW]
Context-Type: application/json
Accept: application/json
Cookie: [COOKIE]

{
    "csrf_token": [CSRF_TOKEN],
    "identifier": [EMAIL],
    "password": [PASSWORD],
    "method": "password"
}
```

-   `FLOW`: The current flow ID (ID), taken from `body.id` from the init
    login flow response.
-   `CSRF_TOKEN`: This token is taken from
    `body.ui.nodes[0].attributes.value`

## Registration

### Step 1: Initialize Registration Flow for Browsers

```
GET https://example.com:4433/self-service/registration/browser
Accept: application/json
```

### Step 2: Make Registration Request

```
POST https://example.com:4433/self-service/registration?flow=[FLOW]
Context-Type: application/json
Accept: application/json
Cookie: [COOKIE]

{
    "csrf_token": [CSRF_TOKEN],
    "identifier": [EMAIL],
    "password": [PASSWORD],
    "method": "password"
}
```
