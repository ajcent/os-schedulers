import {
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";

// import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

function ThemeButton() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  };

  return (
    <Button
      id='theme-button'
      onClick={toggleColorScheme}
      variant='default'
      aria-label='Toggle color scheme'
      leftSection={
        colorScheme === "dark" ? <FaMoon size={12} /> : <IoSunny size={16} />
      }>
      {colorScheme === "dark" ? "Dark" : "Light"}
    </Button>
  );
}

export default ThemeButton;
