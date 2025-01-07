import { Await, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList"
import { Suspense } from "react";

function EventsPage() {
//     const events = [{id:'1', title: 'event 1'},
//         {id:'2', title: 'event 2'}
//     ]
//     return <><h1>Events Page.</h1>
//     <ul>
//     {events.map((event)=>{
//  return <li key={event.id}>
//          <Link to={event.id}>{event.title}</Link>   
//  </li>
//     })}
//        </ul></>;
const data = useLoaderData();
const events = data.events;
return <Suspense fallback={<p>Loading....</p>}>
    <Await resolve={events}>{(data)=> <EventsList events={data} />}</Await>
</Suspense>

 
}
async function getEvents() {
    const res = await fetch("http://localhost:8080/events");
    if(res.ok)
    {
      const data = await res.json();
      return data.events;
    }
    else
    throw new Response(JSON.stringify({message:"Could not fetch events"}),{status:500});
}
export function eventsLoader(){    
     return {
        events: getEvents()
     }      
}
export default EventsPage;


