package main

import (
	"os"
	"encoding/json"
)

type jsonT struct  {
	Data data `json:"data"`
}

type data struct  {
	W float64 `json:"W"`
	Data []graph `json:"data"`
}

type graph struct {
	L int  `json:"l"`
	Data [][2]float64 `json:"data"`
}

func main()  {
	arr := []string{"1.1","1.6","2","2.5"}
	arrT := []data{}
	for _, W := range arr{

		data := jsonT{}
		file,_ := os.Open(W + ".json")
		defer file.Close()
		reader := json.NewDecoder(file)
		reader.Decode(&data)
		arrT = append(arrT, data.Data)
	}
	file,_ := os.OpenFile("here.json", os.O_RDWR, 0777)
	defer file.Close()
	reader := json.NewEncoder(file)
	reader.Encode(&arrT)
}