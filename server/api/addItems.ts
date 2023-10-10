import { Item } from '../db/config';


// Define a new event handler for adding an item
export default defineEventHandler(async (event, res) => {
  if (event.method === 'POST') {
if (event.node) {
  // Access the request body
  const requestBody = event.node.req._readableState.buffer.head.data.toString();
  const requestBodyJSON = JSON.parse(requestBody);

  try {
 
    // Create a new item using the parsed request body
    const newItem = await Item.create(requestBodyJSON);

    // Send a response with the new item
    return {
      statusCode: 200,
      body: newItem,
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: { error: error },
    };
  }
} else {
  // Handle the case where the request body is missing or null
  return {
    statusCode: 400,
    body: 'Request body is missing or null',
  };
}
  }
});
