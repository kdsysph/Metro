import { readFileSync } from 'fs';

const envContent = readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/HYGRAPH_MANAGEMENT_TOKEN="([^"]+)"/);
const token = tokenMatch ? tokenMatch[1] : null;

if (!token) {
  console.error('No token found');
  process.exit(1);
}

const response = await fetch('https://management-eu-west-2.hygraph.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    query: `{
      viewer {
        project {
          id
          name
          models {
            apiId
            displayName
            fields {
              apiId
              displayName
            }
          }
          components {
            apiId
            displayName
          }
          enumerations {
            apiId
            displayName
            values {
              apiId
            }
          }
        }
      }
    }`
  }),
});

const data = await response.json();
if (data.errors) {
  console.error('Errors:', JSON.stringify(data.errors, null, 2));
} else {
  const project = data.data?.viewer?.project;
  console.log(`\nProject: ${project?.name} (${project?.id})`);
  console.log(`\nModels (${project?.models?.length}):`);
  project?.models?.forEach(m => {
    console.log(`  - ${m.apiId} (${m.displayName})`);
    m.fields?.forEach(f => console.log(`      • ${f.apiId}: ${f.displayName}`));
  });
  console.log(`\nComponents (${project?.components?.length}):`);
  project?.components?.forEach(c => console.log(`  - ${c.apiId}`));
  console.log(`\nEnums (${project?.enumerations?.length}):`);
  project?.enumerations?.forEach(e => console.log(`  - ${e.apiId}: ${e.values?.map(v => v.apiId).join(', ')}`));
}
