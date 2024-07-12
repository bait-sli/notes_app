This is the backend folder for the technical review project. It contains the code for the server and the database. The project is built using fastapi framework and sqlalchemy.

## Installation

To install the backend, you need to have python 3.10 installed on your system. For better performance, it is recommended to use a virtual environment to run the server.

To install the backend, follow these steps:

1. Create a virtual environment
2. Activate the virtual environment
3. Install the dependencies
4. Run the server

### Create a virtual environment

```bash
python3 -m venv .venv
```

### Activate the virtual environment

```bash
source .venv/bin/activate
```

### Install the dependencies

```bash
pip install -r requirements.txt
```

### Run the server

```bash
uvicorn main:app --reload
```

## Database

The database is a SQLite database. The database is created automatically when the server starts for the first time. The database file is located at `db_notes.db`.

The database contains two tables: `notes` and `note_histories`. The relationship between the two tables is one-to-many, where each note has many histories.

The `notes` table contains the following columns:

- `id`: The primary key of the table
- `title`: The title of the note
- `content`: The content of the note
- `label`: A label associated with the note
- `created_at`: The date and time when the note was created
- `updated_at`: The date and time when the note was last updated

The `note_histories` table contains the following columns:

- `id`: The primary key of the table
- `note_id`: The foreign key of the `notes` table
- `type`: The type of the note history ("created", "updated")
- `title`: The title of the current version of the note
- `content`: The content of the current version of the note
- `created_at`: The date and time when the note was created
- `updated_at`: The date and time when the note was last updated

## License

This project code is open source. You can edit the code and use it for your own projects.
