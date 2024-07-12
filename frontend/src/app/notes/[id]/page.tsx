import AppLayout from "@/components/PageLayout";
import NoteDetail from "@/components/NoteDetails/NoteDetails";
import AppContextProvider from "@/contexts/AppContext";

interface PageProps {
  params: { id: string };
}

export default function Details({ params: { id } }: PageProps) {
  return (
    <AppContextProvider>
      <AppLayout>
        <NoteDetail id={id} />
      </AppLayout>
    </AppContextProvider>
  );
}
