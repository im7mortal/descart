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
	fmt.Printf("%s\n",strconv.FormatFloat(float64(0), 'f', 0, 64))
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

		str := "" + strconv.FormatFloat(o.W, 'f', 3, 64) + "   "
		for _, obj := range o.Data{

			a, b := Appr(obj.Data)
			obj.base = a
			obj.pow = b

/*			fmt.Printf("w=%s, l=%s, %s*x^%s\n",
				strconv.FormatFloat(float64(o.W), 'f', 3, 64),
				strconv.FormatFloat(float64(obj.L), 'f', 3, 64),
				strconv.FormatFloat(a, 'f', 3, 64),
				strconv.FormatFloat(b, 'f', 3, 64),
			)*/
			//str += strconv.FormatFloat(obj.pow, 'f', 3, 64) + "  "
			str += strconv.FormatFloat(obj.base, 'f', 3, 64) + "  "
		}


	println(str)
	}


	
}


/**
a is coefficient of x
b is power of x
 */

func Appr(arr [][2]float64) (a, b float64){
	var S1, S2, S3, S4 float64
	for _, r := range arr{
		r[0] = math.Pow(float64(10), r[0])
		s1 := math.Log10(r[0])
		S1 += s1
		S2 += s1 * s1
		s3 := math.Log10(r[1])
		S3 += s3
		S4 += s1 * s3
	}
	n := float64(len(arr))
	a = math.Pow(float64(10), (S3*S2 - S4*S1)/(n * S2 - S1 * S1))
	b = (n * S4 - S1*S3)/(n * S2 - S1 * S1)
	return
}