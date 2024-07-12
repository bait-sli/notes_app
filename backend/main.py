from fastapi import FastAPI
from modules.notes.controller import NotesController
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["X-Requested-With", "Content-Type", "Authorization"],
)

notes_router = NotesController()
app.include_router(notes_router.router)
