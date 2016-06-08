package main

import (
	"encoding/json"
	"math"
	"fmt"
	"strconv"
	"io/ioutil"
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
	Norm      [][2]float64
	firstIter logarithm
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main()  {

	fmt.Println(strconv.FormatFloat(math.Log(100), 'f', 10, 64))
	bytesArr, err := ioutil.ReadFile("data/data.json")
	check(err)
	dataArr := []data{}
	err = json.Unmarshal(bytesArr, &dataArr)
	check(err)

	G := make(map[string]map[string]map[string]float64)

	for _, object := range dataArr{

		for _, object_ := range object.Data{
			object_.Norm = make([][2]float64, 0)
			object_.Norm = norm(object_.Data, 0.3, 2.5)
			name := strconv.FormatFloat(object_.L, 'f', 1, 64)
			g, ok :=  G[name]
			if !ok {
				G[name] = make(map[string]map[string]float64)
				g = G[name]
			}
			for _, object_1 := range object_.Norm{
				name := strconv.FormatFloat(object_1[0], 'f', 5, 64)

				g_, ok :=  g[name]
				if !ok {
					g[name] = make(map[string]float64)
					g_ = g[name]
				}
				g_[strconv.FormatFloat(object_1[1], 'f', 10, 64)] = object_1[1]
				//fmt.Printf("%v\n", g_)
			}
		}
	}

	//fmt.Printf("%v", G)
	byteArray, _ := json.Marshal(G)
	ioutil.WriteFile("dataW.json", byteArray, 0644)
}

func norm(in [][2]float64, first, last float64) ( out [][2]float64, ) {

	i_ := 369

	currentV := first
	n := (last - first) / float64(i_)
	for j := 0; j < i_; j++ {
		out = append(out, [2]float64{0., 0.})
		if j == 0 {
			out[j][0] = first
			out[j][1] = in[j][1]
			continue
		}
		if j == i_ - 1 {
			out[j][0] = last
			out[j][1] = in[len(in) - 1][1]
			continue
		}
		currentV += n
		out[j][0] = currentV
		tempArr := []float64{}
		for _, o2 := range in{
			if o2[0] > in[j - 1][0] && o2[0] < currentV + n {
				tempArr = append(tempArr, o2[1])
			}
		}
		if len(tempArr) == 0 {
			out[j][1] = in[j + 1][0]
		} else {
			out[j][1] = average(tempArr)
		}
	}
	return
}

func average(o []float64)  (t float64) {
	summ := 0.
	for _, i := range o{
		summ+=i
	}
	t = summ / float64(len(o))
	return
}
