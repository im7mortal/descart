import numpy as np


data_names = ["1.1", "1.3", "1.6", "2", "2.5", "3", "4", "5"]


def getAll():
    data = np.empty((1, 4), dtype=np.float64)
    for name in data_names:
        np.concatenate(data, parse_file(name))
    return data


PREFIX = ".json"

def parse_file(name):
    file = open(name + PREFIX)
    model = json.loads(file)
    points_count = len(model["data"]["data"]["data"])
    array = np.empty((points_count, 4), dtype=np.float64)
    
    data = model["data"]
    W = data["W"]
    data = data["data"]
    for obj in data:
        l = obj["l"]
        data = data["data"]
        for point in data:
            
