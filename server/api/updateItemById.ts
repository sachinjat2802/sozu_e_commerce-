import { Item } from '../db/config';
import url from 'url';
import querystring from 'querystring';

// Define a new event handler for updating an item by ID
export default defineEventHandler(async (event) => {
  if (event.method === 'PUT') {
    const urlString = event.node.req.url; // Assuming the item ID is in the event parameters
    const parsedUrl = url.parse(urlString);
    // Extract query parameters
    const queryParams = querystring.parse(parsedUrl.query?.toString());
  
    // Get the 'id' parameter
      const itemId = queryParams.id;
      const requestBody = event.node.req._readableState.buffer.head.data.toString();
      const requestBodyJSON = JSON.parse(requestBody);
      const updatedItemData = requestBodyJSON // Assuming the updated item data is in the request body

    try {
      // Ensure that the itemId is a valid positive integer (you can add more validation as needed)
      if (!itemId || isNaN(itemId) || itemId <= 0) {
        return {
          statusCode: 400,
          body: { error: 'Invalid ID' },
        };
      }

      // Retrieve the item from the database by ID
      const item = await Item.findByPk(itemId);

      if (item) {
        // Update the item with the new data
        await item.update(updatedItemData);

        // Send a response with the updated item
        return {
          statusCode: 200,
          body: item,
        };
      } else {
        // Send a response with a 404 Not Found status code if the item doesn't exist
        return {
          statusCode: 404,
          body: 'Item Not Found',
        };
      }
    } catch (error) {
      // Handle any database or server errors
      return {
        statusCode: 500,
        body: { error: 'Internal Server Error' },
      };
    }
  } else {
    // Send a response with a 405 Method Not Allowed status code for non-PUT requests
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
});
