import Editor from "@/components/Editor";

export default function studyroom({ params }: { params: { id: string }}){


    const YoutubeVideoLink = ""
    return(
        <div>

            This is your studyroom id - {params.id}.
            

            
            <Editor/>
        </div>
    )
}