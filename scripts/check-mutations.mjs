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

async function getMutations() {
  const data = await graphql(`
    {
      __schema {
        mutationType {
          fields {
            name
            description
          }
        }
      }
    }
  `);
  
  console.log('Available mutations:');
  data.__schema.mutationType.fields
    .filter(f => f.name.includes('enum') || f.name.includes('model') || f.name.includes('component') || f.name.includes('create') || f.name.includes('upsert'))
    .forEach(f => console.log(`  ${f.name}: ${f.description || ''}`));
}

getMutations().catch(console.error);