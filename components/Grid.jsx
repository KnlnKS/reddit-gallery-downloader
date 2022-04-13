import React, { useState } from "react";
import {
  Grid as MantineGrid,
  Container,
  Image,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  clickable: {
    cursor: "pointer",
  },
  selectedImage: {
    backgroundImage:
      'url("https://raw.githubusercontent.com/tabler/tabler-icons/master/icons-png/check.png")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  opacityOn: {
    opacity: 0.5,
  },
}));

function Grid({ images, selectedImages }) {
  const initalState = {};
  images.forEach((image) => {
    initalState[image.id] = false;
  });
  const [selected, setSelected] = useState(initalState);
  const { classes } = useStyles();

  return (
    <Container my="md">
      <MantineGrid grow>
        {images.map((image, index) => {
          return (
            <MantineGrid.Col
              lg={4}
              key={image?.id}
              className={classes.clickable}
              onClick={() => {
                selectedImages[image.id] = !selected[image.id];
                setSelected({
                  ...selected,
                  [image.id]: !selected[image.id],
                });
              }}
            >
              <div className={classes.selectedImage}>
                <Image
                  src={image?.previews[4]?.u}
                  alt={`Image #${index}`}
                  radius="md"
                  className={
                    !selected[image?.id] ? undefined : classes.opacityOn
                  }
                />
              </div>
            </MantineGrid.Col>
          );
        })}
      </MantineGrid>
    </Container>
  );
}

export default Grid;
