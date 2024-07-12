import AppLayout from "@/components/PageLayout";
import NoteDetail from "@/components/NoteDetails/NoteDetails";
import AppContextProvider from "@/contexts/AppContext";

const dummyNote = {
  title: "Sample Note",
  content: "This is a sample note content.",
  history: [
    {
      date: "2024-07-01",
      content: "This is the first version of the note.",
    },
    {
      date: "2024-07-05",
      content: "This is an updated version of the note.",
    },
  ],
};

export default function Details({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <AppContextProvider>
      <AppLayout>
        <NoteDetail id={id} />
      </AppLayout>
    </AppContextProvider>
  );
}
