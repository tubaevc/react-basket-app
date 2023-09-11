import { useState } from "react";
import {
  Input,
  Button,
  Container,
  SimpleGrid,
  List,
  ThemeIcon,
  Group,
  Drawer,
  Indicator,
  Badge,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconBasket,
} from "@tabler/icons-react";
import Card from "./components/Card";
import "./App.css";

const storeItems = [
  {
    id: 100,
    name: "Fotoğraf Makinası",
    src: "camera",
    price: 20,
  },
  {
    id: 101,
    name: "Kulaklık",
    src: "headphone",
    price: 10,
  },
  {
    id: 102,
    name: "Oyun Konsolu",
    src: "joystick",
    price: 25,
  },
  {
    id: 103,
    name: "Retro Fotoğraf Makinası",
    src: "retro-cam",
    price: 25,
  },
  {
    id: 104,
    name: "Oyuncak Araba",
    src: "toy-car",
    price: 25,
  },
  {
    id: 105,
    name: "Kol Saati",
    src: "watch",
    price: 25,
  },
];
function App() {
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let [opened, setOpened] = useState(false);
  let addToBasket = ({ id, name }) => {
    let basketIndex = basketItems.findIndex((item) => item.id === id);
    if (basketIndex >= 0) {
      let _basketItems = [...basketItems];
      _basketItems[basketIndex].count += 1;
      setBasketItems(_basketItems);
    } else {
      setBasketItems([...basketItems, { id, name, count: 1 }]);
    }
  };
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );
  return (
    <Container>
      <Group align="end">
        <Input.Wrapper label="Arama">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Input.Wrapper>
        <Button onClick={() => setSearchValue("")}>Temizle</Button>
        <Indicator color="red" label={basketItems.length} size={22}>
          <Button onClick={() => setOpened(true)}>
            <IconBasket size={22}></IconBasket>
          </Button>
        </Indicator>
      </Group>
      <SimpleGrid cols={3} className="Store">
        {filteredItems.map(({ id, name, src }) => {
          return (
            <Card
              key={name}
              name={name}
              src={src}
              onAdd={() => addToBasket({ id, name })}
            />
          );
        })}
      </SimpleGrid>
      <Drawer opened={opened} onClose={() => setOpened(false)} title="Sepetim">
        <List
          className="List"
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
        >
          {basketItems.map(({ name, count }, index) => (
            <List.Item key={index}>
              <Group>
                {name}
                <Badge>{count}</Badge>
              </Group>
            </List.Item>
          ))}
        </List>
      </Drawer>
    </Container>
  );
}

export default App;
