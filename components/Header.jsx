import Head from "next/head";
import React from "react";

const Header = () => (
  <Head>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
    />
    <title>Reddit Gallery Downloader</title>
    <meta name="title" content="Reddit Gallery Downloader" />
    <meta
      name="description"
      content="Website that downloads images from Reddit Image Galleries."
    />
    <meta
      name="keywords"
      content="Reddit Gallery Downloader,Reddit,Reddit Images,Image Downloader,Gallery Downloader"
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://reddit-gallery-downloader.vercel.app/" />
    <meta property="og:title" content="Reddit Gallery Downloader" />
    <meta
      property="og:description"
      content="Website that downloads images from Reddit Image Galleries."
    />
    <meta
      property="og:image"
      content="https://reddit-gallery-downloader.vercel.app/preview.jpeg"
    />
    <meta
      property="twitter:card"
      content="https://reddit-gallery-downloader.vercel.app/preview.jpeg"
    />
    <meta property="twitter:url" content="https://reddit-gallery-downloader.vercel.app/" />
    <meta property="twitter:title" content="Reddit Gallery Downloader" />
    <meta
      property="twitter:description"
      content="Website that downloads images from Reddit Image Galleries."
    />
    <meta
      property="twitter:image"
      content="https://reddit-gallery-downloader.vercel.app/preview.jpeg"
    />
    <link rel="shortcut icon" href="/favicon.png" />
  </Head>
);

export default Header;
