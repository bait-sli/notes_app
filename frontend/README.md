The Project is a Next.js based app that allows users to create, edit, and view notes. I released this project as a technical review for a full stack developer position at a startup. The project is open source and available for anyone who want to use it or just contribute too.

The project is built using Next.js, Tailwind CSS, and Typescript.

## Getting Started

Install dependencies:

```
npm install
```

First, run the server (See backend README), then create a `.env.local` or `.env` file in the frontend directory and add the server url (Expected to be `http://localhost:8000` if running locally):

```
NEXT_PUBLIC_API_URL="PROJECT_BACKEND_URL"
```

You can also export the environment variable in your terminal without creating a `.env.local` file:

```
export NEXT_PUBLIC_API_URL="PROJECT_BACKEND_URL"
```

Then, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

To build the project and start it in production mode, run the following commands:

```
npm run build
npm start
```

## Features

- Create, edit, and view notes
- Compare versions of notes
- Delete notes
- Dark mode support
- Responsive design

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.
