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
	base exp
	W float64 `json:"W"`
	Data []graph `json:"data"`
}

type exp struct {
	base float64 `json:"base"`
	pow  float64 `json:"pow"`
}


type graph struct {
	L float64 `json:"l"`
	first exp `json:"first"`
	Data [][2]float64 `json:"data"`
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main()  {
	fmt.Println(strconv.FormatFloat(float64(0), 'f', 10, 64))
	bytesArr, err := ioutil.ReadFile("data/data.json")
	check(err)
	dataArr := []data{}
	err = json.Unmarshal(bytesArr, &dataArr)
	check(err)



	for _, object := range dataArr{
		for _, object_ := range object.Data{
			object_.first = Appr(object_.Data)
			println(strconv.FormatFloat(object_.first.base, 'f', 10, 64))
		}
	}





	return
}


/**
a is coefficient of x
b is power of x
 */

func Appr(arr [][2]float64) (e exp){
	var S1, S2, S3, S4 float64
	for _, r := range arr{
		x := r[0]
		y := r[1]
		if x < 0 || y < 0 {
			panic("знак минус")
		}

		s1 := math.Log10(x)
		S1 += s1
		S2 += s1 * s1
		s2 := math.Log10(y)
		S3 += s2
		S4 += s1 * s2
	}
	n := float64(len(arr))
	e.base = math.Pow(float64(10), (S3*S2 - S4*S1)/(n * S2 - S1 * S1))
	e.pow = (n * S4 - S1*S3)/(n * S2 - S1 * S1)
	return
}