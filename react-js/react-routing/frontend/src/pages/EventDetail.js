import { redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem"
function EventDetailPage() {
    //const param = useParams();
    const event = useRouteLoaderData('event-details');
    return <EventItem event={event} />;
}

export default EventDetailPage;

export async function eventItemLoader({request, params}){
    const res = await fetch("http://localhost:8080/events/"+params.id);
    if(res.ok)
    {
        const data = await res.json();
        return data.event;
    }
    else
    throw new Response(JSON.stringify({message:'Could not fetch event details for selected event.'}),{status:500});
}

export async function deleteAction({request, params}){
    const res = await fetch("http://localhost:8080/events/"+params.id,{
        method:request.method
    });
    if(res.ok)
    {
        return redirect('/events');
    }
    else
    throw new Response(JSON.stringify({message:'Could not delete.'}),{status:500});
}

