import { Avatar, Button, Card, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import PokemonModal from "../../modal/pokemonModal";

const PokemonList = ({ list }: any) => {
  const { Title, Text } = Typography
  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = useState<boolean>();
  const [selectedPokemon , setSelectedPokemon] = useState(null);

  useEffect(() => {
      if (filtered.length === 0) {
         setFiltered(list)
      }
  }, [])

  const search = (text: any) => {
      const filtered = list.filter((it: any) => it.name.indexOf(text.target.value) !== -1);
      setFiltered(filtered)
  }

  const showModal = (pokemon: any) => {
      setSelectedPokemon(pokemon);
      setOpen(true);
  }

  const deletePokemon = (id: number) => {
      const newfiltered = filtered.filter((it: any) => it.id !== id);
      setFiltered(newfiltered)
  }

  return <>
      {open && <PokemonModal isOpen={open} setIsModalOpen={setOpen} pokemon={selectedPokemon}/>}
      <Flex vertical style={{ width: '100%' }}>
          <Title>Lista de Pokemones</Title>
          <Search onKeyUp={search} placeholder="Buscar pokemon" style={{ marginBottom: '24px' }} />

          {
              filtered && filtered.map((pokemon: any) => {

                return <Card key={pokemon.id} hoverable style={{ marginBottom: '24px' }}>
                    <Flex gap="middle" align="center" justify="space-between" style={{ width: '100%' }}>
                        <Flex onClick={() => showModal(pokemon)}>
                            <Avatar src={pokemon.sprites.front_default} size={60} />
                            <Flex vertical>
                                <Text strong>{pokemon.id}</Text>
                                <Text strong>{pokemon.name}</Text>
                                <Text>Peso: {pokemon.weight}</Text>
                            </Flex>
                        </Flex>
                        <Flex align="flex-end">
                            <Button onClick={() => deletePokemon(pokemon.id)}>eliminar</Button>
                        </Flex>
                    </Flex>
                </Card>
              })
          }
      </Flex>
  </>
}

export default PokemonList;
