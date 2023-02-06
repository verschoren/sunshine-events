const header_data = {
  'content-type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}

const auth = 1234567890 //Base64 encoded admin@domain.com/token:api_token
const subdomain = 'subdomain' //your Zendesk subdomain

export default {
  async fetch(request, env) {
    try {
      if (request.method == 'OPTIONS') {
        return handleOptionsRequest(request)
      } else {
        const { pathname } = new URL(request.url);
          //Get the incoming payload   
          var input = await request.json();        
          var user = await findUsers(input);
          if (user.email){
            var event = await createEvent(user,input);
            return new Response(JSON.stringify(user), {headers: header_data,status:201});
          } else {
            return new Response('No User Found', {headers: header_data,status:404});
          }
      }
    } catch(e) {
      return new Response(err.stack, {
        status: 500,
        headers: header_data
      });
    }
  }
}

async function findUsers(input){
  //Set API URL
  const url = 'https://'+subdomain+'.zendesk.com/api/v2/search.json?query=type:user email:'+input.email;

  const init = {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Authorization': 'Basic ' + auth,
    },
  };
  const response = await fetch(url, init);
  const results = await response.json();
  return results.results[0];
}

async function createEvent(user,input){
  //Set API URL
  const url = 'https://'+subdomain+'.zendesk.com/api/v2/users/'+user.id+'/events';
  const payload = {
    "event": {
      "source": "Website",
      "type": "Booking",
      "description": "✈️ New Booking",
      "properties": {
        "booking_id": input.booking_id,
        "date": input.date
      }
    },
    "profile": {
      "identifiers": [{
        "type": "email",
        "value": user.email
      }],
      "name": user.name,
      "source": "website",
      "type": "customer"
    }
  }

  const init = {
    body: JSON.stringify(payload),
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Authorization': 'Basic ' + auth,
    },
  };
  const response = await fetch(url, init);
  const results = await response.json();
  return results;
}

function handleOptionsRequest(request) {
  let headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ){
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
        "Access-Control-Max-Age": "86400",
        "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers"),
      }
    })
  }
  else {
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    })
  }
}
