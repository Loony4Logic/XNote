import Editor from "@/components/Editor";
import Player from "@/components/Player";
import Menu from "@/components/Menu";

export default function studyroom({ params }: { params: { id: string } }) {
  const YoutubeVideoLink = "";
  return (
    <div>
      This is your studyroom id - {params.id}
      <Player debug />
      <hr />
      <br />
      <Editor />
    </div>
  );
}
