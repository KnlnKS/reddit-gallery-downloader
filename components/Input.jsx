import React, { useRef } from "react";
import { TextInput, ActionIcon } from "@mantine/core";
import { Link, ArrowRight } from "tabler-icons-react";

import post from "../functions/post";

function Input() {
    const inputRef = useRef();

  return (
    <TextInput
      icon={<Link size={18} />}
      radius="xl"
      size="md"
      ref={inputRef}
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={"reddit-orange"}
          variant={"filled"}
          onClick={() => post(inputRef.current.value)}
        >
          <ArrowRight size={18} />
        </ActionIcon>
      }
      placeholder="Reddit URL"
      rightSectionWidth={42}
    />
  );
}

export default Input;
