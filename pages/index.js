import nodeFetch from "node-fetch";
import cheerio from "cheerio";
import JSZip from "jszip";

import React, { useState } from "react";
import {
  Grid,
  Container,
  Image,
  createStyles,
  Divider,
  Box,
  Button,
  Switch,
  Center,
  Space,
} from "@mantine/core";
import { BrandReddit } from "tabler-icons-react";

import Hero from "../components/Hero";
import Input from "../components/Input";
import urlToPromise from "../functions/urlToPromise";
import downloadZip from "../functions/downloadZip";

export async function getServerSideProps({ query }) {
  if (!query?.galleryId) {
    return { props: { images: [] } };
  }

  const resp = await nodeFetch(
    `https://www.reddit.com/gallery/${query?.galleryId}`,
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
      },
      body: null,
      method: "GET",
    }
  );

  const page = await resp.text();
  const $ = cheerio.load(page);

  let data = $("#data")[0].children[0].data.replace("window.___r = ", "");
  data = JSON.parse(data);
  data = data?.posts?.models[Object.keys(data?.posts?.models)[0]]?.media;

  const images = [];
  for (const item of data?.gallery?.items) {
    let p = JSON.stringify(data?.mediaMetadata[item.mediaId].p);
    p = p.replace("\\u0026", "&");
    p = JSON.parse(p);
    images.push({
      id: item.id,
      url:
        "https://i.redd.it/" +
        item.mediaId +
        "." +
        data?.mediaMetadata[item.mediaId].m.split("/")[1],
      previews: p,
    });
  }

  return { props: { images } };
}

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

export default function Gallery({ images }) {
  const selectedImages = {};
  const initalState = {};
  images.forEach((image) => {
    initalState[image.id] = false;
  });
  const [ordered, setOrdered] = useState(false);
  const [numSelected, setNumSelected] = useState(0);
  const [selected, setSelected] = useState(initalState);
  const { classes } = useStyles();

  function reset() {
    setNumSelected(0);
    setSelected(initalState);
  }

  return (
    <>
      <Hero>
        <Input reset={reset} />
      </Hero>
      {images.length > 0 && (
        <>
          <Divider
            my="xs"
            labelPosition="center"
            label={
              <>
                <BrandReddit size={12} />
                <Box ml={5}>Gallery</Box>
              </>
            }
          />
          <br />
          <Center>
            <Button
              color="reddit-orange"
              disabled={numSelected === 0}
              onClick={async () => {
                var zip = new JSZip();

                for (const image of images)
                  if (selected[image.id])
                    zip.file(
                      (ordered ? image.id + "_" : "") +
                        image?.url.split("/").pop(),
                      urlToPromise(image?.url + "?download=true"),
                      {
                        binary: true,
                      }
                    );

                downloadZip(zip);
              }}
            >
              Download
            </Button>
            <Space w="xl" />
            <Button
              color="reddit-orange"
              variant="outline"
              onClick={() => {
                setNumSelected(numSelected < images.length ? images.length : 0);
                let copy;
                if (numSelected < images.length) {
                  copy = { ...initalState };
                  images.forEach((image) => {
                    copy[image.id] = true;
                  });
                }
                setSelected(numSelected < images.length ? copy : initalState);
              }}
            >
              {numSelected < images.length ? "Select All" : "Clear All"}
            </Button>
            <Space w="xl" />
            <Switch
              color="reddit-orange"
              label="Maintain Order"
              checked={ordered}
              onChange={(e) => setOrdered(e.currentTarget.checked)}
            />
          </Center>
          <br />
          <Container my="md">
            <Grid grow>
              {images.map((image, index) => {
                return (
                  <Grid.Col
                    lg={4}
                    key={image?.id}
                    className={classes.clickable}
                    onClick={() => {
                      selectedImages[image.id] = !selected[image.id];
                      setNumSelected(
                        numSelected + (selected[image.id] ? -1 : 1)
                      );
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
                  </Grid.Col>
                );
              })}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
