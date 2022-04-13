import React from "react";
import { createStyles, Header, Group, Burger } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { Link } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

function Navbar({ links }) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={() => toggleOpened()} size="sm" />
        </Group>

        <Group></Group>
      </div>
    </Header>
  );
}

export default Navbar;
