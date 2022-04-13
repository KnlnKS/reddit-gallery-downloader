import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { TextInput, ActionIcon, Alert } from "@mantine/core";
import { Link, ArrowRight, AlertCircle } from "tabler-icons-react";

function Input({ reset }) {
  const { push } = useRouter();
  const [requestFailed, setRequestFailed] = useState(false);
  const inputRef = useRef();

  return (
    <>
      <div>
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
              onClick={async () => {
                let url;
                try {
                  url = new URL(inputRef.current.value);
                } catch (e) {
                  setRequestFailed(true);
                  return;
                }


                if (!url.hostname.includes("reddit.com")){
                  setRequestFailed(true);
                  return;
                }

                let galleryId;
                let splitPath = url.pathname.split("/");
                for (let i = 0; i < splitPath.length; i++) {
                  if (splitPath[i] === "comments") {
                    galleryId = splitPath[i + 1];
                    break;
                  }
                }

                if (galleryId) {
                  reset();
                  setRequestFailed(false);
                  push(`?galleryId=${galleryId}`);
                } else {
                  setRequestFailed(true);
                }
              }}
            >
              <ArrowRight size={18} />
            </ActionIcon>
          }
          placeholder="Reddit URL"
          rightSectionWidth={42}
        />
        {requestFailed && (
          <>
            <br />
            <Alert icon={<AlertCircle size={16} />} title="Error!" color="red">
              Something broke! Maybe try again? Hopefully it will work this
              time!
            </Alert>
          </>
        )}
      </div>
    </>
  );
}

export default Input;
