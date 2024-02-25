import { Button, useMantineColorScheme } from "@mantine/core";

import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";

function ThemeButton() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "light" : "dark");
  };

  return (
    <Button
      id='theme-button'
      onClick={toggleColorScheme}
      variant='default'
      aria-label='Toggle color scheme'
      leftSection={colorScheme === "dark" ? <FaMoon /> : <FaSun />}>
      {colorScheme === "dark" ? "Dark" : "Light"}
    </Button>
  );
}

export default ThemeButton;
