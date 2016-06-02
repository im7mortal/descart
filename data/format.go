package main

import (
	"encoding/json"
	"os"
	"io/ioutil"
)

type raw struct {
	Data data `json:"data"`
}

type data struct {
	W float64 `json:"W"`
	Data []graph `json:"data"`
}

type graph struct {
	L float64 `json:"l"`
	Data [][2]float64 `json:"data"`
}


func main() {
	array := []string{"1.1", "1.3", "1.6", "2", "2.5", "3", "4", "5"}
	//array := []string{"1.1"}
	arr := []data{}
	for _, name := range array {
		file, _ := os.OpenFile(name + ".json", os.O_RDWR, 0777)
		defer file.Close()
		decoder := json.NewDecoder(file)
		obj := new(raw)
		decoder.Decode(obj)
		arr = append(arr, obj.Data)
	}


	byteArray, _ := json.Marshal(arr)
	ioutil.WriteFile("data.json", byteArray, 0644)

}
