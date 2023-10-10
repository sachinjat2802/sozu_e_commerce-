import { Item } from '../db/config';

// Define a new event handler for getting items
export default eventHandler(async (event) => {
  if (event.method === 'GET') {
    try {
      // Retrieve all items from the database
      const items = await Item.findAll();

      // Send a response with the list of items
      return {
        statusCode: 200,
        body: items,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: 'Internal Server Error' },
      };
    }
  } else {
    // Send a response with a 405 Method Not Allowed status code
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
});
