import ApiDataTableCard from './ApiDataTableCard';

function Users() {
  return <ApiDataTableCard title="Users" resourcePath="users" primaryFields={['name', 'username', 'title']} />;
}

export default Users;