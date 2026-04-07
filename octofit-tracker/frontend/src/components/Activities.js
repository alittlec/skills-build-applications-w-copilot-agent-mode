import ApiDataTableCard from './ApiDataTableCard';

function Activities() {
  return <ApiDataTableCard title="Activities" resourcePath="activities" primaryFields={['name', 'title']} />;
}

export default Activities;