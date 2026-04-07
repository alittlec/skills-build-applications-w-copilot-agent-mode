import ApiDataTableCard from './ApiDataTableCard';

function Workouts() {
  return <ApiDataTableCard title="Workouts" resourcePath="workouts" primaryFields={['name', 'title']} />;
}

export default Workouts;