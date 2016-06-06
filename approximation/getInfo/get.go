package main

import (
	"encoding/json"
	"math"
	"fmt"
	"strconv"
	"io/ioutil"
	"sort"
)



type dataSet [][2]float64

type data struct  {
	W    float64 `json:"W"`
	Data []graph `json:"data"`
	lArr      [][2]float64
	secondIter power
}

/**
a*ln(x) + b
 */
type logarithm struct {
	a float64
	b  float64
}

type power struct {
	base float64
	pow  float64
}

type graph struct {
	L         float64 `json:"l"`
	Data      [][2]float64 `json:"data"`
	firstIter logarithm
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main()  {

	arr := make([]int,0)

	fmt.Println(strconv.FormatFloat(math.Log(100), 'f', 10, 64))
	bytesArr, err := ioutil.ReadFile("data/data.json")
	check(err)
	dataArr := []data{}
	err = json.Unmarshal(bytesArr, &dataArr)
	check(err)

	// выбираю данные для диаметра 900 мм
	for _, object := range dataArr{
		first := 0.
		for _, object_ := range object.Data{
			arr = append(arr, len(object_.Data))
			if object_.L != 1000 &&  object_.L != 800 {
				continue
			}
			for i, selection := range object_.Data{
				if selection[0] >= 1.05 {
					if object_.L == 800 {
						first = object_.Data[i-1][1]
					} else {
						a := (object_.Data[i-1][1] - first) * 0.6 + first
						fmt.Println(strconv.FormatFloat(object.W, 'f', 1, 64) + "  " + strconv.FormatFloat(a, 'f', 10, 64))
					}
					break
				}
			}
		}
	}

	sort.Ints(arr)
	println(arr[0])
	println(len(arr))
	println(arr[len(arr) - 1])

}