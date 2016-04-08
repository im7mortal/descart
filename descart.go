package main

import (
	"os"
	"encoding/json"
	"math"
	"fmt"
	"strconv"
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
	base float64  `json:"l"`
	pow  float64  `json:"l"`
	Data [][2]float64 `json:"data"`
}

func main()  {
	fmt.Printf("%s",strconv.FormatFloat(float64(0), 'f', 0, 64))
	arr := []string{"1.1","1.6","2","2.5","5"}
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




	for _, o := range arrT{
		for _, b := range o.Data{
			var S1, S2, S3, S4 float64
			for _, r := range b.Data{
				r[0] = math.Pow(float64(10), r[0])
				s1 := math.Log10(r[0])
				S1 += s1
				S2 += s1 * s1
				s3 := math.Log10(r[1])
				S3 += s3
				S4 += s1 * s3
			}
			n := float64(len(b.Data))
			a0 := (S3*S2 - S4*S1)/(n * S2 - S1 * S1)
			a1 := (n * S4 - S1*S3)/(n * S2 - S1 * S1)

			l := math.Pow(float64(10), a0)
			b.base = l
			b.pow = a1

			/*
			fmt.Printf("w=%s, l=%s, %s*x^%s\n",
				strconv.FormatFloat(float64(o.W), 'f', 3, 64),
				strconv.FormatFloat(float64(b.L), 'f', 3, 64),
				strconv.FormatFloat(l, 'f', 3, 64),
				strconv.FormatFloat(a1, 'f', 3, 64),
			)
			*/

		}
	}



}

func Appr(arr [][2]float64) (x, y float64){



	return
}