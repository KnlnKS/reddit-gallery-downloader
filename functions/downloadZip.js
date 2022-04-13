import { saveAs } from "file-saver";

function downloadZip(zip, filename) {
  zip.generateAsync({ type: "blob" }).then(function callback(blob) {
    saveAs(blob, "redditGalleryDownload.zip");
  });
}

export default downloadZip;
