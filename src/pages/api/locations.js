// pages/api/locations.js

export default async function handler(req, res) {
   try {
      const response = await fetch('https://qtg9k1vhp3.execute-api.us-west-2.amazonaws.com/Stage/');
      if (!response.ok) {
         throw new Error('Failed to fetch locations');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      res.status(200).json(data?.data);
   } catch (error) {
      console.error('Error fetching locations', error);
      return [];
   }
}
