package main

import (
	"os"
	"encoding/json"
	"math"
	"fmt"
	"strconv"
	"github.com/sajari/regression"
)

type jsonT struct  {
	Data data `json:"data"`
}

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

func main()  {
	fmt.Println(strconv.FormatFloat(float64(0), 'f', 10, 64))
	println()
	//fmt.Printf("%s\n",strconv.FormatFloat(float64(0), 'f', 0, 64))
	/*
	println("        200",
	"     250",
	"     300",
	"     400",
	"    500",
	"    600",
	"    700",
	"    800",
	"    1000",
	"   1250",
	"   1500",
	"   1750",
	"   2000")
	*/
	arr := []string{"1.1","1.6","2","2.5","5"}
	arrT := make([]data, 1)
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


	second := make(map[int][][2]float64)

	r := new(regression.Regression)
	r.SetObserved("Murders per annum per 1,000,000 inhabitants")
	r.SetVar(0, "Inhabitants")
	r.SetVar(1, "Percent with incomes below $5000")
	r.SetVar(2, "Percent unemployed")
	// регрессионный анализ


	{
		for _, o := range arrT{
			for _, obj := range o.Data {
				for _, obj_ := range obj.Data{
					r.Train(
						regression.DataPoint(obj_[1], []float64{obj_[0], obj.L, o.W}),
					)
				}
			}
		}
	}




	r.Run()

	fmt.Printf("Regression formula:\n%v\n", r.Formula)
	fmt.Printf("Regression:\n%s\n", r)





	return
	// первичное аппроксимирование сырых данных => (b*x^a)
	{
		for j, o := range arrT{
			for i, obj := range o.Data {
				b, a := Appr(obj.Data)
				obj.first = *new(exp)
				obj.first.base = b
				obj.first.pow = a
				arrT[j].Data[i] = obj // dirty hack for me
			}
		}
	}
	// аппроксимируем значения коэффицента b from (b*x^a)
	{
		var dataFetch dataSet
		for i, o := range arrT{
			if i == 0 {
				continue
			}
			var dataFetch1 dataSet
			for _, obj := range o.Data{
				dataFetch1 = append(dataFetch1, [2]float64{float64(obj.L), obj.first.base})

			}
			b, a := Appr(dataFetch1)

			println(strconv.FormatFloat(b, 'f', 10, 64))
			println(strconv.FormatFloat(a, 'f', 10, 64))
			println(strconv.FormatFloat(o.W, 'f', 10, 64))
			dataFetch = append(dataFetch, [2]float64{o.W, b})
		}
		a, b := Appr(dataFetch)
		println(strconv.FormatFloat(b, 'f', 10, 64))
		println(strconv.FormatFloat(a, 'f', 10, 64))

	}
	sec := make(map[int]exp)



	for i, p := range second{
		a, b := Appr(p)
		sec[i] = exp{a, b}
	}
	//fmt.Printf("%v\n", sec)

/*	for _, p := range sec{
		println(strconv.FormatFloat(p.base, 'f', 3, 64) + "      " + strconv.FormatFloat(p.pow, 'f', 3, 64))
	}*/
	for i, p := range second{
		a, b := Appr(p)
		sec[i] = exp{a, b}
	}





}


/**
a is coefficient of x
b is power of x
 */

func Appr(arr [][2]float64) (a, b float64){
	var S1, S2, S3, S4 float64
	for _, r := range arr{
		// бл*** какого хера здесь была экспотенциальная регрессия
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
	a = math.Pow(float64(10), (S3*S2 - S4*S1)/(n * S2 - S1 * S1))
	b = (n * S4 - S1*S3)/(n * S2 - S1 * S1)
	return
}