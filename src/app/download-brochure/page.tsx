import {sanityClient} from '@/lib/sanity';
import {queries} from '@/lib/groq-queries';
import DownloadBrochureForm from './DownloadBrochureForm';

export default async function DownloadBrochurePage() {
    const brochureData = await sanityClient.fetch(queries.downloadBrochure);

    return <DownloadBrochureForm brochureData={brochureData} />;
}
