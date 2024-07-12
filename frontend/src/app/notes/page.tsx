import NotesList from "@/components/NoteList/NotesList";
import AppLayout from "@/components/PageLayout";
import AppContextProvider from "@/contexts/AppContext";

export default function Home() {
  return (
    <AppContextProvider>
      <AppLayout>
        <NotesList />
      </AppLayout>
    </AppContextProvider>
  );
}
