import { Avatar, Button, Descriptions, Divider, Flex, Modal, Typography } from "antd"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

interface Iprops {
    isOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<any>>;
    pokemon: any;
}

const PokemonModal = ({  pokemon, isOpen, setIsModalOpen }: Iprops) => {
  const { Text } = Typography
  const [moves, setMoves] = useState([]);
  const [count, setCount] = useState<number>(5);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
     setIsModalOpen(false);
  };

  const seeMore = () => {
      const newCount = count + 5;
      const newMoves = pokemon.moves.slice(0, newCount);
      setCount(newCount);
      setMoves(newMoves);
  }

  useEffect(() => {
      const filtered = pokemon.moves.slice(0, 5);
      setMoves(filtered)
  }, [])

  return <Modal
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Flex vertical gap="middle" style={{ padding: '24px' }}>
          <Flex align="center" gap="middle">
              <Avatar size={100} src={pokemon.sprites.front_default}/>
              <Flex vertical>
                  <Text strong>{pokemon.name}</Text>
                  <Text>Peso: { pokemon.weight }</Text>
                  <Text>Altura : {pokemon.height}</Text>
              </Flex>
          </Flex>

          <Divider />

          <Flex align="center" gap="middle">
              <Flex gap="middle">
                  <Avatar size={100} src={pokemon.sprites.back_default}/>
                  <Flex vertical gap="middle">
                      <Text strong>movimientos</Text>
                      <Descriptions bordered column={1}>
                          {moves.map(({ move }: { move: { name: string; url: string } }) => {
                              return <Descriptions.Item label="Nombre">{move.name}</Descriptions.Item>
                          })}
                      </Descriptions>
                      <Button onClick={seeMore}>Ver mas</Button>
                  </Flex>
              </Flex>
          </Flex>

      </Flex>
  </Modal>
}

export default PokemonModal;
