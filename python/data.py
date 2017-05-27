import json

import numpy as np


data_names = ["1.1", "1.3", "1.6", "2", "2.5", "3", "4", "5"]

NUMBER_OF_PARAMETERS = 4

class ARRAY:

    def __init__(self):
        self.data = []

    def update(self, row):
        for r in row:
            self.data.append(r)

    def finalize(self):
        length = int(len(self.data) / NUMBER_OF_PARAMETERS)
        arr = np.empty((length, NUMBER_OF_PARAMETERS))
        print(arr.shape)

        for index in range(length):
            arr[index] = np.array([
                self.data[index * NUMBER_OF_PARAMETERS + 0],
                self.data[index * NUMBER_OF_PARAMETERS + 1],
                self.data[index * NUMBER_OF_PARAMETERS + 2],
                self.data[index * NUMBER_OF_PARAMETERS + 3],
            ])
        return arr


def getAll():
    data = ARRAY()
    for name in data_names:
        parse_file(name, data)
    return data.finalize()

PATH = "../data/"
PREFIX = ".json"

def parse_file(name, arr):
    file = open(PATH + name + PREFIX)
    model = json.loads(file.read())
    file.close()
    data = model["data"]
    W = data["W"]
    for obj in data["data"]:
        l = obj["l"]

        length = len(obj["data"])
        for i in range(0,length, 20):
            arr.update([W, l, obj["data"][i][0], obj["data"][i][1]])
        last = length - 1
        arr.update([W, l, obj["data"][last][0], obj["data"][last][1]])
        break

res = getAll()

np.savetxt('data_sparse_200.csv', res, delimiter=',', fmt='%f')
