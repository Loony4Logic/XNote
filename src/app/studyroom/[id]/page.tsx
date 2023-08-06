export default function studyroom({ params }: { params: { id: string }}){
    return(
        <div>
            This is your studyroom id - {params.id}.
        </div>
    )
}