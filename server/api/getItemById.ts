import url from 'url';
import querystring from 'querystring';
import { Item } from '../db/config';

// Define a new event handler for getting items by ID
export default defineEventHandler(async (event) => {
    const urlString = event.node.req.url; // Assuming the item ID is in the event parameters
    const parsedUrl = url.parse(urlString);// Assuming the item ID is in the event parameters
// Extract query parameters
const queryParams = querystring.parse(parsedUrl.query?.toString());

// Get the 'id' parameter
const itemId = queryParams.id;
  if (event.method === 'GET') {
    try {
        // Retrieve the item ID from the query parameters
        
       
      

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
        // Send a response with the item
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
    // Send a response with a 405 Method Not Allowed status code for non-GET requests
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
});
