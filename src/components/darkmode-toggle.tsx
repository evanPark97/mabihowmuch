import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      leftIcon={colorMode !== "dark" ? <SunIcon /> : <MoonIcon />}
      colorScheme="dark"
      variant="outline"
      onClick={toggleColorMode}
      bg="transparent"
      _hover={{ bg: "transparent" }}
      _active={{ bg: "transparent" }}
      _focus={{ boxShadow: "none" }}
    >
      {colorMode !== "dark" ? 'Light' : 'Dark'}
    </Button>
  );
}

export default DarkModeToggle;
