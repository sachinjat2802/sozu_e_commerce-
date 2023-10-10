
export default {
  build: {},
  serverMiddleware: [
  

    
    // Define your API routes
    {
      path: '/addItems',
      handler: '~/server/api/addItems.js',
    },
    {
      path: '/getItems',
      handler: '~/server/api/getItems.js',
    },
    {
      
      path: '/getItemById',
      handler: '~/server/api/getItemById.js',
    },
    
    {
      path: '/updateItemById',
      handler: '~/server/api/updateItemById.js',
    },
    {
      path: '/deleteItemById',
      handler: '~/server/api/deleteItemById.js',
    },
  ]
};
