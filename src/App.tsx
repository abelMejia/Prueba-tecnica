import { Empty, Flex, Skeleton, Typography } from 'antd';
import './App.css'
import useFetch from './hooks/useFetch';
import PokemonList from './components/PokemonList';

function App() {
  const { loading, data, error } = useFetch('/pokemon');

  if (loading) { return <Flex style={{ padding: '24px', minHeight: '100vh' }}>
    <Skeleton />
  </Flex> }

  if (!!error) { return <Flex align='center' justify='center' style={{ padding: '24px', minHeight: '100vh' }}>
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          styles={{ image: { height: 60 } }}
          description={
            <Typography.Text>
              Error al cargar los datos
            </Typography.Text>
          }
        >
        </Empty>
  </Flex> }

  return (
    <Flex style={{ padding: '24px', minHeight: '100vh' }}>
        <PokemonList list={data}/>
    </Flex>
  )
}

export default App

