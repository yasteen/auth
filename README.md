# About

`auth` is a repository for adding authentication to a project.

# Requirements

Docker is required to install the various components required for authentication.

# Usage

## Kratos

Kratos can be run simply with one command

```bash
> docker compose -f ./kratos/start.yml up --build --force-recreate
```

To add any of the other components available in `./kratos`, simply append `-f [component].yml` into the command. As an example, Kratos uses [sqlite](https://github.com/sqlite/sqlite) as its database. To use postgres instead, run

```bash
> cd ./kratos
> docker compose -f ./start.yml -f ./pg.yml up --build --force-recreate
```

# Detailed Explanation

## Kratos

-   `start.yml` - Starts the main identity server, [Kratos](https://github.com/ory/kratos)
-   `pg.yml` - Uses a Postgres database
-   `mail.yml` - Adds email capabilities to Kratos
-   `fe.yml` - Starts a simple front end (mostly for demo or testing purposes)
