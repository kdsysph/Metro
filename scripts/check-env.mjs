import dotenv from 'dotenv';

dotenv.config();

const MANAGEMENT_API_TOKEN = process.env.HYGRAPH_MANAGEMENT_TOKEN;
const ENDPOINT = 'https://management-eu-west-2.hygraph.com/graphql';

async function graphql(query) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MANAGEMENT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });
  
  const result = await response.json();
  if (result.errors) {
    throw new Error(JSON.stringify(result.errors, null, 2));
  }
  return result.data;
}

async function checkModels() {
  try {
    const data = await graphql(`
      {
        models {
          apiId
          displayName
        }
      }
    `);
    console.log('Models in management API:', JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkModels().catch(console.error);