import ApiDataTableCard from './ApiDataTableCard';

function Teams() {
  return <ApiDataTableCard title="Teams" resourcePath="teams" primaryFields={['name', 'title']} />;
}

export default Teams;