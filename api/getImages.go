package handler

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

type Image struct {
	URL        string `json:"url"`
	PreviewURL string `json:"preview_url"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	// Struct for the request body
	body := struct {
		URL string `json:"url"`
	}{}

	// Decode the request body
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Make the request
	client := http.Client{}
	req, err := http.NewRequest("GET", "https://old.reddit.com/r/"+strings.Split(body.URL, "/r/")[1], nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Add the user agent
	req.Header.Add("accept", "application/json")
	req.Header.Add("accept-language", "en-US,en;q=0.9")
	req.Header.Add("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; .NET CLR 1.0.3705;)")

	// Execute the request
	res, err := client.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if the request was successful
	defer res.Body.Close()
	if res.StatusCode != 200 {
		http.Error(w, strconv.Itoa(res.StatusCode), http.StatusBadRequest)
		return
	}

	// Load document into goquery
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var images []Image

	// Find the images
	doc.Find("img.preview").Each(func(i int, img *goquery.Selection) {
		// Get the image src
		src := img.AttrOr("src", "")

		// Parse the image src
		u, err := url.Parse(src)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Get the image query params
		q, _ := url.ParseQuery(u.RawQuery)

		// Prevent duplicate images
		if q["width"][0] == "108" {
			images = append(images, Image{
				URL:        "https://i.redd.it" + u.Path,
				PreviewURL: src,
			})
		}
	})

	// Encode the response
	if json.NewDecoder(r.Body).Decode(&images) != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	imagesJson, err := json.Marshal(images)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Write the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	w.Write(imagesJson)
}
