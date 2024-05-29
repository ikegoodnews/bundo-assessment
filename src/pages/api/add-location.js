// pages/api/add-location.js

export default async function handler(req, res) {
   try {
      if (req.method === 'POST') {
         const response = await fetch('https://qtg9k1vhp3.execute-api.us-west-2.amazonaws.com/Stage/', {
            method: 'POST',
            body: req.body,
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
            },
         });

         if (!response.ok) {
            throw new Error('Failed to fetch locations');
         }

         const data = await response.json();
         console.log('Sent data:', data);
         res.status(200).json(data.data);
      } else {
         res.status(405).end(); // Method Not Allowed
      }
   } catch (error) {
      console.error('Error fetching locations', error);
      return [];
   }
}
