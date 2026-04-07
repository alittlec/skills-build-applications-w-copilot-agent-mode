import ApiDataTableCard from './ApiDataTableCard';

function Leaderboard() {
  return <ApiDataTableCard title="Leaderboard" resourcePath="leaderboard" primaryFields={['name', 'title']} />;
}

export default Leaderboard;