import { Form, useActionData, useNavigate, useNavigation, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();
  const submit = navigation.state === "submitting";
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
{data && data.errors && <ul>{Object.values(data.errors).map(err =>
   <li key={err}>{err}</li>
  )}
  </ul> }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required  defaultValue={event && event.title}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event && event.image} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event && event.date} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event && event.description} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={submit}>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function saveOrUpdateAction({request,params}) {
  const form = await request.formData();
  const event = {
      title:form.get('title'),
      image:form.get('image'),
      date: form.get('date'),
      description:form.get('description')
  };
let url = 'http://localhost:8080/events';
  if(request.method === "PATCH")
url = 'http://localhost:8080/events/'+params.id;

  const res = await fetch(url,{
      method: request.method,
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(event)
  });
  if(res.status === 422)
      return res;
  if(!res.ok)
      throw new Response(JSON.stringify({message:'Insert event failed.'}),{status:500});    
  return redirect('/events');

}
